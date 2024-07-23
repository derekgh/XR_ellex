import React from 'react';
import { Ball } from './Ball';
import { Walls } from './Walls';
import { Player } from './Player';
import { useMouseCapture } from './useMouseCapture';
import { useKeyboard } from './useKeyboard';

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
  };
}

const Scene = () => {
  const keyboard = useKeyboard();
  const mouse = useMouseCapture();

  return (
    <group>
      <Ball position={[7, 8, 0]} />
      <Ball position={[6, 15, 0]} />
      <Walls />
      <Player walk={1} jump={1} input={() => getInput(keyboard, mouse)} />
    </group>
  );
};

export default Scene;
