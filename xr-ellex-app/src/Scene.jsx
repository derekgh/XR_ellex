// Scene.jsx
import React, { useState, useRef } from 'react';
import { Ball } from './Ball';
import { Walls } from './Walls';
import Character from './Character';
import { BodyParts } from './BodyParts';
import { useMouseCapture } from './useMouseCapture';
import { useKeyboard } from './useKeyboard';
import SoundObjects from './SoundObjects'; // Import the SoundObjects component

function getInput(keyboard, mouse) {
  let [x, y, z] = [0, 0, 0];
  
  if (keyboard["s"]) z += 1.0;
  if (keyboard["w"]) z -= 1.0;
  if (keyboard["d"]) x += 1.0;
  if (keyboard["a"]) x -= 1.0;
  if (keyboard[" "]) y += 1.0;

  return {
    move: [x, y, z],
    look: [mouse.x / window.innerWidth, mouse.y / window.innerHeight],
    running: keyboard["Shift"],
    jump: keyboard[" "],
  };
}

const Scene = () => {
  const keyboard = useKeyboard();
  const mouse = useMouseCapture();
  const [collectedItems, setCollectedItems] = useState([]);
  const [soundObjects, setSoundObjects] = useState([]);

  // Function to handle collection
  const collectItem = (item) => {
    setCollectedItems([...collectedItems, item]);
  };
  const registerSoundObject = (soundObject) => {
    // Simply add the new object to the array
    setSoundObjects((prev) => [...prev, soundObject]);
  };

  /*soundObjectsBodyPartMap = {
    head: { startX: 5, startY: 0, start
    },
    torso: nodes.torso_remesh,
    leftArm: nodes.arm_remesh,
    rightArm: nodes.arm_remesh,
    legs: nodes.leg_remesh,

  }*/

  const soundObjectsData = [
    { position: [10, 0, 0], collectedPosition: { X: 10, Y: 1, Z: 0}, url: "/src/assets/audio/808_1.ogg", bodyPart: "head" },
    { position: [15, 0, 0], collectedPosition: { X: 15, Y: 1, Z: 0}, url: "/src/assets/audio/forceSample.ogg", bodyPart: "torso" },
    { position: [20, 0, 0], collectedPosition: { X: 20, Y: 1, Z: 0}, url: "/src/assets/audio/voice1.ogg", bodyPart: "leftArm" },
    { position: [25, 0, 0], collectedPosition: { X: 25, Y: 1, Z: 0}, url: "/src/assets/audio/squarepulse.ogg", bodyPart: "rightArm" },
    { position: [30, 0, 0], collectedPosition: { X: 30, Y: 1, Z: 0}, url: "/src/assets/audio/drumloop.ogg", bodyPart: "legs" },
  ]

//          ref={(el) => (soundObjectsRefs.current[index] = el)}
  return (
    <group>
      <Ball position={[7, 18, 0]} />
      <Ball position={[6, 15, 0]} />
      <BodyParts position={[0, 8, -10]} />
      <Walls />
      <Character input={() => getInput(keyboard, mouse)} collectItem={collectItem} soundObjects={soundObjects} />
      
      {soundObjectsData.map((data, index) => (
        <SoundObjects 
          key={index} 
          onCollect= {collectItem}
          register={registerSoundObject}
          {...data} 
        />
      ))}
     
    </group>
  );
};

export default Scene;
