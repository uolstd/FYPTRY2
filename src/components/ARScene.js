// ARScene.js
import 'aframe';
import 'aframe-ar';
import React from 'react';

const ARScene = () => {
  return (
    <a-scene embedded arjs='trackingMethod: best;'>
      <a-marker preset='hiro'>
        <a-box position='0 0.5 0' material='color: red;'></a-box>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARScene;
