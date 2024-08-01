// Scene.jsx
import React from 'react';
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

  return (
    <group>
      <Ball position={[7, 18, 0]} />
      <Ball position={[6, 15, 0]} />
      <BodyParts position={[0, 8, -10]} />
      <Walls />
      <Character input={() => getInput(keyboard, mouse)} />
      
      <SoundObjects position={[5, 0, 0]} url="/src/assets/audio/808_1.ogg" bodyPart="head" />
      <SoundObjects position={[10, 0, 0]} url="/src/assets/audio/forceSample.ogg" bodyPart="torso" />
      <SoundObjects position={[15, 0, 0]} url="/src/assets/audio/voice1.ogg" bodyPart="leftArm" />
      <SoundObjects position={[20, 0, 0]} url="/src/assets/audio/squarepulse.ogg" bodyPart="rightArm" />
      <SoundObjects position={[25, 0, 0]} url="/src/assets/audio/drumloop.ogg" bodyPart="legs" />
      <SoundObjects position={[30, 0, 0]} url="/src/assets/audio/drumloop.ogg" bodyPart="legs" />
    </group>
  );
};

export default Scene;
