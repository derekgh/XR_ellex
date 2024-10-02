import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import XrLogo from './Logo';  

const detectCollision = (characterPosition, obj2) => {
  if (!obj2 || !obj2.position) return false; // Add this guard
  const distance = characterPosition.distanceTo(obj2.position);
  const collisionDistance = 3.0;
  return distance < collisionDistance;
};


const Character = ({ input, collectItem, soundObjects }) => {
  const { camera } = useThree();
  const characterGLTF = useGLTF('./src/assets/models/Araquati.glb');
  const { scene: characterScene } = characterGLTF;

  const [collectedCount, setCollectedCount] = useState(0);
const totalObjects = 6; // Hardcoded for testing
  const opacity = collectedCount === totalObjects ? 1 : collectedCount / totalObjects;

  const material = useRef(new THREE.MeshStandardMaterial({
    color: new THREE.Color('silver'),
    metalness: 0.98,
    roughness: 0.12,
    flatShading: true,
    transparent: true,
    opacity: 0, // Start with 0 opacity
  }));

  useEffect(() => {
    characterScene.traverse((child) => {
      if (child.isMesh) {
        child.material = material.current;
      }
    });
  }, [characterScene]);

  useEffect(() => {
    material.current.opacity = opacity;
    console.log(`Opacity updated: ${opacity}`); // Log the updated opacity
  }, [collectedCount, totalObjects]);
  
  const idleAnimation = useGLTF('./src/assets/models/Idle.glb').animations[0];
  const walkAnimation = useGLTF('./src/assets/models/Walking.glb').animations[0];
  const runAnimation = useGLTF('./src/assets/models/Running.glb').animations[0];
  const jumpAnimation = useGLTF('./src/assets/models/Jump.glb').animations[0];
  const fallingAnimation = useGLTF('/src/assets/models/Falling.glb').animations[0];

  const mixer = useRef(new THREE.AnimationMixer(characterScene));
  const actions = useRef({});
  const currentAction = useRef(null);
  const api = useRef(null);
  const characterRef = useRef();

  const walkSpeed = 3;
  const runSpeed = 6;
  const jumpImpulse = 3000;
  const offset = new THREE.Vector3();
  const gaze = new THREE.Quaternion();
  const yaw = new THREE.Quaternion();
  const pitch = new THREE.Quaternion();
  const cameraOffset = new THREE.Vector3(0, 0, 3);
  const yAxis = new THREE.Vector3(0, 1, 0);
  const xAxis = new THREE.Vector3(1, 0, 0);
  const [isJumping, setIsJumping] = useState(false);
  const [lastYaw, setLastYaw] = useState(new THREE.Quaternion());

  let phi = 0;
  let theta = 0;
  const [isGrounded, setIsGrounded] = useState(true);

  useEffect(() => {
    if (idleAnimation) actions.current.idle = mixer.current.clipAction(idleAnimation);
    if (walkAnimation) actions.current.walking = mixer.current.clipAction(walkAnimation);
    if (runAnimation) actions.current.running = mixer.current.clipAction(runAnimation);
    if (jumpAnimation) actions.current.jumping = mixer.current.clipAction(jumpAnimation);
    if (fallingAnimation) actions.current.falling = mixer.current.clipAction(fallingAnimation);

    actions.current.idle.play();
    currentAction.current = actions.current.idle;
  }, [idleAnimation, walkAnimation, runAnimation, jumpAnimation, fallingAnimation]);

  const switchAnimation = (newActionName) => {
    const newAction = actions.current[newActionName];
    if (newAction && currentAction.current !== newAction) {
      currentAction.current.fadeOut(0.06);
      newAction.reset().fadeIn(0.06).play();
      currentAction.current = newAction;
    }
  };

  const updateOrientation = () => {
    if (isJumping) return;

    const [moveX, , moveZ] = input().move;
    if (moveX !== 0 || moveZ !== 0) {
      const angle = Math.atan2(-moveX, -moveZ);
      yaw.setFromAxisAngle(yAxis, angle);
      setLastYaw(yaw.clone());
    }
  };
  
  useFrame((state, delta) => {
    mixer.current.update(delta);

    if (!api.current || !characterRef.current) return;
    const { move, look, running, jump } = input();
    const position = api.current.translation();

    soundObjects.forEach(({ objectRef, handleCollect, bodyPart }) => {
      // Ensure objectRef.current and bodyPart are valid
      if (
        objectRef.current &&
        objectRef.current.position &&
        bodyPart &&
        detectCollision(
          new THREE.Vector3(position.x, position.y, position.z),
          objectRef.current
        )
      ) {
        if (!objectRef.current.userData.collected) {
          console.log("collision detected with", bodyPart);
          collectItem(bodyPart);
          handleCollect();
          setCollectedCount((prevCount) => prevCount + 1);
          objectRef.current.userData.collected = true; // Mark as collected
        }
      }
    });
    

    if (!isJumping) {
      updateOrientation(look); // Update orientation if not jumping
    } else {
      yaw.copy(lastYaw); // Maintain last yaw orientation during jump
    }

    const isMoving = move[0] !== 0 || move[2] !== 0;
    const currentSpeed = isMoving && running ? runSpeed : walkSpeed;

    if (isMoving || isJumping) {
      offset.set(move[0], 0, move[2]).normalize().multiplyScalar(currentSpeed).applyQuaternion(yaw);
      api.current.setLinvel(offset, true);
      if (!isJumping) {
        switchAnimation(running ? 'running' : 'walking');
      } else {
        if (!actions.current.jumping.isRunning()) {
          switchAnimation('falling');
          setIsJumping(false);
        }
      }
    } else {
      switchAnimation('idle');
      api.current.setLinvel(new THREE.Vector3(0, 0, 0), true);
    }
    if (jump && isGrounded && !isJumping) {
      api.current.applyImpulse(new THREE.Vector3(0, jumpImpulse, 0), true);
      switchAnimation('jumping');
      setIsGrounded(false);
      setIsJumping(true);
    } else if (!jump && !isGrounded && Math.abs(api.current.linvel().y) < 0.001) {
      setIsGrounded(true);
      switchAnimation('idle');
      setIsJumping(false);
    }
    

    const velocity = api.current.linvel();

    if (!isGrounded && velocity.y < -0.1) {
      switchAnimation('falling');
    }

    if (!isGrounded && Math.abs(velocity.y) < 0.001) {
      setIsGrounded(true);
      switchAnimation('idle');
    } else if (!isGrounded) {
      switchAnimation('falling');
    }
    api.current.setAdditionalSolverIterations(2);

    api.current.setRotation(new THREE.Quaternion(), true);
    characterRef.current.quaternion.copy(yaw).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI));

    camera.position.lerp(
      new THREE.Vector3(position.x, position.y, position.z).add(cameraOffset.clone().applyQuaternion(yaw)),
      0.25
    );
    camera.quaternion.copy(yaw).multiply(pitch);
  });

  return (
    <RigidBody
      ref={api}
      colliders={'ball'}
      lockRotations={[true, true, true]} // Lock all rotations if not needed
      position={[0, 10, 10]}
      friction={1.0} // Adjust friction to a more reasonable value
      restitution={1} // Ensure bounciness is zero if unintended bounces occur
      linearDamping={0.1} // Reduce damping for better stop control
      gravityScale={20} // Adjust gravity scale if needed
    > 
      <primitive
        userData={{ tag: "player" }}
        castShadow
        ref={characterRef}
        object={characterScene}
        scale={0.0025}
        position={[0, -3, 0]}
      >
      </primitive>
    </RigidBody>
  );
};

export default Character;
