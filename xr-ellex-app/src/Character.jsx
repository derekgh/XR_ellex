import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { quat, vec3, euler } from "@react-three/rapier";

import * as THREE from 'three';


const detectCollision = (characterPosition, obj2) => {
  //const characterPosition = api.current.translation(); // Get the physics body's position
  const distance = characterPosition.distanceTo(new THREE.Vector3(...obj2.position));
  const collisionDistance = 5.0; // Adjust this value based on the size of the objects
  return distance < collisionDistance;
};


const Character = ({ input, collectItem, soundObjects}) => {
  const { camera } = useThree();
  const characterGLTF = useGLTF('/src/assets/models/Araquati.glb');
  const { scene: characterScene } = characterGLTF;

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color('silver'),
    metalness: 0.8,
    roughness: 0.2,
    flatShading: true,
  });

  characterScene.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });

  const idleAnimation = useGLTF('/src/assets/models/Idle.glb').animations[0];
  const walkAnimation = useGLTF('/src/assets/models/Walking.glb').animations[0];
  const runAnimation = useGLTF('/src/assets/models/Running.glb').animations[0];
  const jumpAnimation = useGLTF('/src/assets/models/Jump.glb').animations[0];
  const fallingAnimation = useGLTF('/src/assets/models/Falling.glb').animations[0];

  const mixer = useRef(new THREE.AnimationMixer(characterScene));
  const actions = useRef({});
  const currentAction = useRef(null);
  const api = useRef(null);
  const characterRef = useRef();

  const walkSpeed =  3;
  const runSpeed = 6;
  const jumpImpulse = 10000;
  const offset = new THREE.Vector3();
  const gaze = new THREE.Quaternion();
  const yaw = new THREE.Quaternion();
  const pitch = new THREE.Quaternion();
  const cameraOffset = new THREE.Vector3(0, 0, 5);
  const yAxis = new THREE.Vector3(0, 1, 0);
  const xAxis = new THREE.Vector3(1, 0, 0);
  const [isJumping, setIsJumping] = useState(false); 

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
      currentAction.current.fadeOut(0.15);
      newAction.reset().fadeIn(0.15).play();
      currentAction.current = newAction;
    }
  };

  const updateOrientation = ([x, y]) => {
    const cameraSpeed = 3;
    phi = THREE.MathUtils.lerp(phi, x * cameraSpeed, 0.1);
    theta = THREE.MathUtils.lerp(theta, -y * cameraSpeed, 0.1);
    theta = THREE.MathUtils.clamp(theta, -Math.PI / 3, Math.PI / 3);

    yaw.setFromAxisAngle(yAxis, -phi);
    pitch.setFromAxisAngle(xAxis, theta);
    gaze.copy(yaw);
  };

  useFrame((state, delta) => {
    //const primitivePosition = api.current.translation(); // Get the physics body's position
    //characterRef.current.position.copy(primitivePosition); // Sync character's visual position
    mixer.current.update(delta);


    if (!api.current || !characterRef.current) return;
    const { move, look, running, jump } = input();
    const position = api.current.translation();
    // Implement collision detection
    soundObjects.forEach(({objectRef, handleCollect }) => {
    if (objectRef.current && detectCollision(vec3(position), objectRef.current)) {
        console.log("collision detected ")
        collectItem(objectRef.current.bodyPart);
        // Optionally, remove or hide the collected soundObject
        //soundObject.visible = false;
        handleCollect();
      }
    });

    if (!isJumping) {
      updateOrientation(look);
    }

    const isMoving = move[0] !== 0 || move[2] !== 0;
    const currentSpeed = isMoving && running ? runSpeed : walkSpeed;

    if (isMoving || isJumping) {
      offset.set(move[0], 0, move[2]).normalize().multiplyScalar(currentSpeed).applyQuaternion(yaw);
      api.current.setLinvel(offset, true);
      if (!isJumping) {
        switchAnimation(running ? 'running' : 'walking');
      }
      else {
        if(!actions.current.jumping.isRunning()){
          switchAnimation('falling');
          setIsJumping(false);
        }
      }
    }
    else {
      switchAnimation('idle');
      api.current.setLinvel(new THREE.Vector3(0, 0, 0), true);
    }



    if (jump && isGrounded && !isJumping) {
      api.current.applyImpulse(new THREE.Vector3(0, jumpImpulse, 0), true);
      switchAnimation('jumping');
      setIsGrounded(false);
      setIsJumping(true);
    }
  
    const velocity = api.current.linvel();

    if (!isGrounded && velocity.y < -0.1) {
      switchAnimation('falling');
    }
  
    if (!isGrounded && Math.abs(velocity.y) < 0.1) {
      setIsGrounded(true);
      switchAnimation('idle');
    }

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
  position={[0, 4, 0]}
  friction={500.0} // Adjust friction to a more reasonable value
  restitution={0.5} // Ensure bounciness is zero if unintended bounces occur
  linearDamping={0.1} // Reduce damping for better stop control
  gravityScale={100} // Adjust gravity scale if needed
>


  <primitive
    userData={{ tag: "player" }}
    castShadow
    ref={characterRef}
    object={characterScene}
    scale={0.0025}
    position={[0, -3, 0]}
  />
</RigidBody>

  );
};

export default Character;
