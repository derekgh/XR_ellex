import React, { useEffect } from 'react';
import Zone from './Zone';

const Zones = ({ cameraPositionIndex, setCurrentZoneName }) => {
  const zonesConfig = [
    { position: [0, -101, 0], rotation: [0, 0, 0], color: 'white', name: 'LUCID INTERVAL' },
    { position: [-10, 1, -17], rotation: [0, 30 * Math.PI / 180, 0], color: 'red', name: 'GALLERY' },
    { position: [10, 1, -17], rotation: [0, 330 * Math.PI / 180, 0], color: 'yellow', name: 'THEATER' },
    { position: [20, 1, 0], rotation: [0, 270 * Math.PI / 180, 0], color: 'lightgreen', name: 'CLUB' },
    { position: [10, 1, 17], rotation: [0, 210 * Math.PI / 180, 0], color: 'cyan', name: 'LIBRARY' },
    { position: [-10, 1, 17], rotation: [0, 150 * Math.PI / 180, 0], color: 'blue', name: 'INFO' },
    { position: [-20, 1, 0], rotation: [0, 90 * Math.PI / 180, 0], color: 'deeppink', name: '?' },
  ];

  useEffect(() => {
    setCurrentZoneName(zonesConfig[cameraPositionIndex]?.name || '?');
  }, [cameraPositionIndex, setCurrentZoneName, zonesConfig]);

  const handleZoneClick = (clickedZoneIndex) => {
    if (clickedZoneIndex === cameraPositionIndex) {
      console.log("The active zone was clicked!");
    }
  };

  return (
    <>
      {zonesConfig.map((zone, index) => (
        <Zone
          key={index}
          position={zone.position}
          rotation={zone.rotation}
          color={zone.color}
          name={zone.name}
          index={index}
          onZoneClick={handleZoneClick}
        />
      ))}
    </>
  );
};

export default Zones;
