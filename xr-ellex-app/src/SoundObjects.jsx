import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { PositionalAudio, Sparkles } from "@react-three/drei";
import * as THREE from "three";

import bowldingSound from "/bowlding.mp3";
import rampTexture from "/src/assets/tex/rampV.jpg";

const SoundObjects = React.forwardRef(
  (
    {
      position,
      collectedPosition,
      url,
      scale = [1, 1, 1],
      listenerPosition,
      onCollect,
      register,
      bodyPart,
      geometryType = "sphere",
      color, // Accept color prop
    },
    ref
  ) => {
    const soundRef = useRef();
    const objectRef = ref || useRef();
    const innerMeshRef = useRef();
    const torusRef = useRef();
    const cylinderRef = useRef();
    const groupRef = useRef();
    const bowlSoundRef = useRef();
    const audioLoaderRef = useRef(new THREE.AudioLoader());
    const [collected, setCollected] = useState(false);
    const [fadeOpacity, setFadeOpacity] = useState(1);
    const isRegistered = useRef(false);
    const timeRef = useRef(0);

    // Material refs
    const innerMaterialRef = useRef();
    const cylinderMaterialRef = useRef();
    const torusMaterialRef = useRef();

    const handleCollect = () => {
      setCollected(true);
      if (onCollect) onCollect(bodyPart);
      if (bowlSoundRef.current && !bowlSoundRef.current.isPlaying) {
        bowlSoundRef.current.play();
      }
      if (soundRef.current) {
        soundRef.current.setRefDistance(30);
      }
      if (torusRef.current) {
        torusRef.current.visible = false;
        torusRef.current.geometry.dispose();
        torusRef.current.material.dispose();
      }
      if (cylinderRef.current) {
        cylinderRef.current.visible = false;
        cylinderRef.current.geometry.dispose();
        cylinderRef.current.material.dispose();
      }
      setTimeout(() => {
        if (objectRef.current) {
          objectRef.current.visible = false;
          objectRef.current.geometry.dispose();
          objectRef.current.material.dispose();
        }
      }, 1000);
    };

    useEffect(() => {
      if (register && !isRegistered.current) {
        register({ objectRef, handleCollect, bodyPart });
        isRegistered.current = true;
      }
    }, [register, bodyPart]); // Include bodyPart in the dependency array


    useEffect(() => {
      const listener = new THREE.AudioListener();
      bowlSoundRef.current = new THREE.Audio(listener);
      audioLoaderRef.current.load(bowldingSound, (buffer) => {
        bowlSoundRef.current.setBuffer(buffer);
        bowlSoundRef.current.setLoop(false);
        bowlSoundRef.current.setVolume(1.0);
        bowlSoundRef.current.setPlaybackRate(2);
      });
    }, []);

    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime();

      // Update rotations
      if (innerMeshRef.current) {
        innerMeshRef.current.rotation.x = (Math.PI * elapsedTime) / 4;
        innerMeshRef.current.rotation.y = (Math.PI * elapsedTime) / 2;
      }

      // Handle collection animations
      if (collected) {
        const lerpFactor = 0.02;
        objectRef.current.position.lerp(
          new THREE.Vector3(
            collectedPosition.X,
            collectedPosition.Y,
            collectedPosition.Z
          ),
          lerpFactor
        );
        if (fadeOpacity > 0) {
          setFadeOpacity((prev) => Math.max(prev - 0.01, 0));
        }
      }

      // Update emissive intensity
      timeRef.current = elapsedTime;
      const emissiveIntensity =
        ((Math.sin(timeRef.current * 2) + 1) / 2) * (15 - 0) + 0;

      // Update materials
      if (innerMaterialRef.current) {
        innerMaterialRef.current.emissiveIntensity = emissiveIntensity;
        innerMaterialRef.current.opacity = fadeOpacity;
      }
      if (cylinderMaterialRef.current) {
        cylinderMaterialRef.current.emissiveIntensity = emissiveIntensity;
        cylinderMaterialRef.current.opacity = fadeOpacity;
      }
      if (torusMaterialRef.current) {
        torusMaterialRef.current.emissiveIntensity = emissiveIntensity;
        torusMaterialRef.current.opacity = fadeOpacity;
      }

      // Scale oscillation
      const groupScaleOscillation = Math.sin(elapsedTime * 2) * 0.3 + 1;
      if (groupRef.current) {
        groupRef.current.scale.set(
          groupScaleOscillation,
          1,
          groupScaleOscillation
        );
      }
    });

    useEffect(() => {
      const handleUserGesture = () => {
        if (soundRef.current && !soundRef.current.isPlaying) {
          soundRef.current.play();
        }
      };
      window.addEventListener("click", handleUserGesture);
      return () => {
        window.removeEventListener("click", handleUserGesture);
      };
    }, []);

    useEffect(() => {
      if (soundRef.current && listenerPosition) {
        soundRef.current.position.set(
          listenerPosition.x,
          listenerPosition.y,
          listenerPosition.z
        );
      }
    }, [listenerPosition]);

    return (
      <>
        <mesh ref={objectRef} position={position} scale={scale}>
          <PositionalAudio ref={soundRef} url={url} distance={3} loop />
          <group ref={groupRef} position={[0, 0, 0]}>
            <mesh
              ref={torusRef}
              position={[0, -2.5, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <torusGeometry args={[2, 0.1, 3, 60]} />
              <meshStandardMaterial
                ref={torusMaterialRef}
                color={color || "blue"}
                emissive={color || "lightblue"}
                emissiveIntensity={2}
              />
            </mesh>
            <mesh
              ref={cylinderRef}
              position={[0, -2, 0]}
              rotation={[Math.PI, 0, 0]}
            >
              <cylinderGeometry args={[2, 2, 1, 60, 1, true]} />
              <meshStandardMaterial
                ref={cylinderMaterialRef}
                color={"white"}
                emissive={color || "lightblue"}
                emissiveIntensity={1}
                emissiveMap={new THREE.TextureLoader().load(rampTexture)}
                metalness={1}
                roughness={0.3}
                transparent={true}
                opacity={fadeOpacity}
                depthWrite={false}
                alphaMap={new THREE.TextureLoader().load(rampTexture)}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
          <mesh ref={innerMeshRef}>
            {geometryType === "sphere" && <sphereGeometry args={[1, 1, 4]} />}
            {geometryType === "box" && <boxGeometry args={[1, 1, 1]} />}
            {geometryType === "cylinder" && (
              <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
            )}
            {geometryType === "cone" && <coneGeometry args={[0.5, 1, 32]} />}
            {geometryType === "torus" && (
              <torusGeometry args={[0.5, 0.2, 16, 100]} />
            )}
            <meshStandardMaterial
              ref={innerMaterialRef}
              color={"white"}
              emissive={color || "lightblue"}
              emissiveIntensity={1}
              emissiveMap={new THREE.TextureLoader().load(rampTexture)}
              metalness={1}
              roughness={0.3}
              transparent={true}
              opacity={fadeOpacity}
              depthWrite={false}
              alphaMap={new THREE.TextureLoader().load(rampTexture)}
              side={THREE.DoubleSide}
            />
          </mesh>
        </mesh>
        {!collected && (
          <Sparkles
            count={100}
            speed={1}
            opacity={0.6}
            color="white"
            size={3}
            scale={[6, 6, 6]}
            position={position}
            noise={6}
          />
        )}
      </>
    );
  }
);

export default SoundObjects;