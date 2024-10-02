import React from 'react';

const Pedestal = () => {

  return (
    <>

      <mesh castShadow receiveShadow position={[0, 5, 0]}>
        <cylinderGeometry args={[0.4, 1, 3, 6]} />
        <meshStandardMaterial color={'silver'} metalness={0.61} roughness={0.13} />
      </mesh>

      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[0.4, 1, 3, 6]} />
        <meshStandardMaterial wireframe emissive={'gold'} emissiveIntensity={2} color={'white'} />
      </mesh>
    </>
  );
};

export default Pedestal;
