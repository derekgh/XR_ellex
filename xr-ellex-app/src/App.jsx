import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Environment, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import Scene from './Scene';
import Joystick from './Joystick';
import ActionButtons from './ActionButtons';

const App = () => {
  const [touchInput, setTouchInput] = useState({
    move: [0, 0, 0],
    running: false,
    jump: false,
  });

  const handleJump = () => {
    setTouchInput((prev) => ({ ...prev, jump: true }));
    // Reset jump after a short delay
    setTimeout(() => {
      setTouchInput((prev) => ({ ...prev, jump: false }));
    }, 100); // Adjust the delay as needed
  };

  const handleRunStart = () => {
    setTouchInput((prev) => ({ ...prev, running: true }));
  };

  const handleRunEnd = () => {
    setTouchInput((prev) => ({ ...prev, running: false }));
  };

  const handleMove = (data) => {
    const { x, y } = data;
    // Adjust sensitivity and invert axes if needed
    const moveX = x;
    const moveZ = -y; // Invert y-axis if forward is -Z
    setTouchInput((prev) => ({ ...prev, move: [moveX, 0, moveZ] }));
  };

  const handleEnd = () => {
    setTouchInput((prev) => ({ ...prev, move: [0, 0, 0] }));
  };

  const [collectedItems, setCollectedItems] = useState([]);
  const [lastCollectedItem, setLastCollectedItem] = useState(null);
  const [xpFill, setXpFill] = useState(0);

  useEffect(() => {
    const uniqueItemsCount = collectedItems.length; // Should be between 0 and 6
    const fillPercentage = (uniqueItemsCount / 6) * 100;
    setXpFill(fillPercentage);
  }, [collectedItems]);

  return (
    <div className="frame" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div className="xp-aura-zone">
        {/* Aura Circle */}
        <div className="aura-circle"></div>

        {/* XP Meter */}
        <div className="xp-meter">
          <div className="xp-fill" style={{ height: `${xpFill}%` }}></div>
        </div>
        <p className="xp-label">XP</p>
      </div>

      <div className="logo-text-zone">
        <img src="/XR_RADIO_logo.svg" alt="zone 6" className="logo-image" />
        <p className="text-hud">Collect all pieces of Araquati’s body to assemble and unlock!</p>
      </div>

      <div className="zone-star-zone">
        <img src="/zone6.svg" alt="zone 6" className="logo-image" />
      </div>

      <div className="name-divet-area">
        <img src="/araquati.svg" alt="Araquati Logo" className="logo-image" />
      </div>

      {/* Message Display */}
      {lastCollectedItem && (
        <div className="collection-message">
          <p>
            Collected <strong>{lastCollectedItem.bodyPart}</strong>! ({lastCollectedItem.count}/6)
          </p>
        </div>
      )}

      {/* Move Joystick and ActionButtons components here, outside the Canvas */}
      <Joystick onMove={handleMove} onEnd={handleEnd} />
      <ActionButtons
        onJump={handleJump}
        onRunStart={handleRunStart}
        onRunEnd={handleRunEnd}
      />

      <Canvas style={{ width: '100%', height: '100%' }} shadows>
        <Suspense fallback={null}>
          <Physics colliders={false}>
            <Scene
              collectedItems={collectedItems}
              setCollectedItems={setCollectedItems}
              setLastCollectedItem={setLastCollectedItem}
              touchInput={touchInput}
            />
          </Physics>
          <Stars radius={20} depth={30} count={5000} factor={1} saturation={1} fade speed={2} />
          <Environment preset="night" background />

          {/* Add post-processing effects */}
          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={0.6} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
