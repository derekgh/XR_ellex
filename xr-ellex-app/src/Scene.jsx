import React, { useRef, useState, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { Walls } from './Walls';
import Character from './Character';
import BodyParts from './BodyParts';
import { useKeyboard } from './useKeyboard';
import SoundObjects from './SoundObjects';
import Cave from './Cave';
import Sound from './Sound';

const Scene = ({
  collectedItems,
  setCollectedItems,
  setLastCollectedItem,
  touchInput,
}) => {
  const keyboard = useKeyboard();

  const combineInputs = (keyboard) => {
    let [x, y, z] = [0, 0, 0];

    // Keyboard inputs (WASD and Arrow Keys)
    if (keyboard['w'] || keyboard['ArrowUp']) z -= 1.0;
    if (keyboard['s'] || keyboard['ArrowDown']) z += 1.0;
    if (keyboard['a'] || keyboard['ArrowLeft']) x -= 1.0;
    if (keyboard['d'] || keyboard['ArrowRight']) x += 1.0;

    // Check for running (Shift key)
    const running = keyboard['Shift'];

    // Check for jumping (Space key)
    const jump = keyboard[' '];

    return { move: [x, y, z], running, jump };
  };

  const getInput = () => {
    const { move: touchMove, running: touchRunning, jump: touchJump } = touchInput;
    const keyboardInput = combineInputs(keyboard);

    return {
      move: [
        touchMove[0] + keyboardInput.move[0],
        0,
        touchMove[2] + keyboardInput.move[2],
      ],
      running: touchRunning || keyboardInput.running,
      jump: touchJump || keyboardInput.jump,
    };
  };

  

  const [soundObjects, setSoundObjects] = useState([]);
  const [opacityMap, setOpacityMap] = useState({
    head: { opacity: 0.2, emissiveIntensity: 0 },
    torso: { opacity: 0.2, emissiveIntensity: 0 },
    leftArm: { opacity: 0.2, emissiveIntensity: 0 },
    rightArm: { opacity: 0.2, emissiveIntensity: 0 },
    leftLeg: { opacity: 0.2, emissiveIntensity: 0 },
    rightLeg: { opacity: 0.2, emissiveIntensity: 0 },
  });

  const collectItem = (bodyPart) => {
    if (!bodyPart) {
      console.warn("collectItem called with undefined bodyPart");
      return;
    }
  
    setCollectedItems((prevCollectedItems) => {
      if (!prevCollectedItems.includes(bodyPart)) {
        const updatedItems = [...prevCollectedItems, bodyPart];
        const newCount = updatedItems.length;
        setLastCollectedItem({ bodyPart, count: newCount });
        return updatedItems;
      }
      return prevCollectedItems;
    });
  
    // ... existing code ...
  };
  

  
// 


  useEffect(() => {
    if (collectedItems.length > 0) {
      const lastCollected = collectedItems[collectedItems.length - 1];
      setLastCollectedItem({
        bodyPart: lastCollected,
        count: collectedItems.length,
      });

      // Clear the message after 3 seconds
      const timer = setTimeout(() => {
        setLastCollectedItem(null);
      }, 3000);

      // Clean up the timer
      return () => clearTimeout(timer);
    }
  }, [collectedItems, setLastCollectedItem]);

  

  const registerSoundObject = (soundObject) => {
    setSoundObjects((prev) => [...prev, soundObject]);
  };

const soundObjectsData = [
  {
    position: [-40, 2, 0],
    collectedPosition: { X: 0, Y: 8, Z: 0 },
    url: "./src/assets/audio/808_1.ogg",
    bodyPart: "head",
    scale: [1, 1, 1],
    geometryType: "sphere",
    color: "#FA00FF", // Added color
  },
  {
    position: [-20, 2, -35],
    collectedPosition: { X: 0, Y: 6, Z: 0 },
    url: "./src/assets/audio/forceSample.ogg",
    bodyPart: "torso",
    scale: [1, 1, 1],
    geometryType: "box",
    color: "#FF7B00", // Added color
  },
  {
    position: [20, 2, -35],
    collectedPosition: { X: 1, Y: 7, Z: 0 },
    url: "./src/assets/audio/voice1.ogg",
    bodyPart: "leftArm",
    scale: [1, 1, 1],
    geometryType: "cylinder",
    color: "#000000", // Added color
  },
  {
    position: [40, 2, 0],
    collectedPosition: { X: -1, Y: 7, Z: 0 },
    url: "./src/assets/audio/squarepulse.ogg",
    bodyPart: "rightArm",
    scale: [1, 1, 1],
    geometryType: "cone",
    color: "#42FFB0", // Added color
  },
  {
    position: [20, 2, 35],
    collectedPosition: { X: -0.6, Y: 4, Z: 0 },
    url: "./src/assets/audio/pianoMain.ogg",
    bodyPart: "leftLeg",
    scale: [1, 1, 1],
    geometryType: "torus",
    color: "#CE0000", // Added color
  },
  {
    position: [-20, 2, 35],
    collectedPosition: { X: 0.6, Y: 4, Z: 0 },
    url: "./src/assets/audio/drumloop.ogg",
    bodyPart: "rightLeg",
    scale: [1, 1, 1],
    geometryType: "sphere",
    color: "#0500FF", // Added color
  },
];

// const getInput = () => {
//   const { move, running } = combineInputs(keyboard);
//   return {
//     move,
//     look: [mouse.x / window.innerWidth, mouse.y / window.innerHeight],
//     running,
//   };
// };

const ambientRef = useRef();

return (
  <group>
    <mesh position={[0, 5, 0]}>
      <Sound url="/ambient.mp3" meshRef={ambientRef} />
    </mesh>
    <BodyParts position={[0, 18, 0]} opacityMap={opacityMap} />
    <Walls />
    <Cave />
    <Character
      input={getInput}
      collectItem={collectItem}
      soundObjects={soundObjects}
    />
    {soundObjectsData.map((data, index) => (
      <SoundObjects
        key={index}
        onCollect={collectItem}
        register={registerSoundObject}
        {...data}
      />
    ))}
    <Text
      position={[0, 10, -20]}
      fontSize={1}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      Collect all song fragments to reassemble Araquati's
    </Text>
  </group>
);
};

export default Scene;