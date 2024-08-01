import { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const Player = ({
  walk = 0.5,  // Slower speed
  jump = 2,   // Reduced jump height
  input = () => ({ move: [0, 0, 0], look: [0, 0] }),
}) => {
  const api = useRef(null);
  const mesh = useRef();
  const { scene, camera } = useThree();

  let phi = 0;
  let theta = 0;

  const speed = new THREE.Vector3(walk / 2, jump, walk);
  const offset = new THREE.Vector3(0, 0, 0);
  const gaze = new THREE.Quaternion();
  const yaw = new THREE.Quaternion();
  const pitch = new THREE.Quaternion();
  const cameraOffset = new THREE.Vector3(0, 3, 5); // Adjusted camera offset
  const down = new THREE.Vector3(0, -1, 0);
  const yAxis = new THREE.Vector3(0, 1, 0);
  const xAxis = new THREE.Vector3(1, 0, 0);
  const raycaster = new THREE.Raycaster(new THREE.Vector3(0, 0, 0), down, 0, 2);

  const updateOrientation = ([x, y]) => {
    const cameraSpeed = 3;
    const step = 0.3;
    phi = THREE.MathUtils.lerp(phi, -x * cameraSpeed, step);
    theta = THREE.MathUtils.lerp(theta, -y * cameraSpeed, step);
    theta = THREE.MathUtils.clamp(theta, -Math.PI / 3, Math.PI / 3);

    yaw.setFromAxisAngle(yAxis, phi);
    pitch.setFromAxisAngle(xAxis, theta);
    gaze.multiplyQuaternions(yaw, pitch).normalize();
  };

  useFrame(() => {
    if (!api.current || !mesh.current) return;
    const position = api.current.translation();
    const { move, look, running } = input();

    updateOrientation(look);

    const walkable = scene.children.filter(
      (o) => o.children[0]?.uuid !== mesh?.current?.uuid
    );

    raycaster.set(position, down);

    offset
      .fromArray(move)
      .normalize()
      .multiply(running ? speed.clone().multiplyScalar(1.5) : speed)
      .applyQuaternion(yaw);

    api.current.applyImpulse(offset, true);

    const newPosition = new THREE.Vector3(position.x, position.y, position.z);
    camera.position.lerp(
      newPosition.add(cameraOffset.clone().applyQuaternion(yaw)),
      0.25
    );

    camera.quaternion.copy(gaze);
  });

  return (
    <RigidBody
      ref={api}
      lockRotations
      position={[0, 2, 0]}
      friction={2.0} // Increased friction to prevent sliding
      restitution={.001} // Reduced bounciness
    >
      <mesh ref={mesh} userData={{ tag: "player" }} castShadow>
        <meshPhysicalMaterial metalness={0.5} roughness={0} />
        <capsuleGeometry args={[0.5, 1, 16, 16]} />
      </mesh>
    </RigidBody>
  );
};
