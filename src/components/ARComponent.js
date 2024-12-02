import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'; // Import necessary libraries
import { ARjs } from 'ar.js'; // Adjust based on your chosen library

const ARComponent = () => {//AR Component: where Magic happens
  const arScene = useRef();
//AR Scene Magic Box to Hold the magical things
  useEffect(() => {//It says: Hey when the show starts Do this Cool stuff
    // Set up AR scene
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();// to See magical things
    const renderer = new THREE.WebGLRenderer({ antialias: true });//Drawing tool to Show magic on the screen

    arScene.current.appendChild(renderer.domElement);//putting tool inside magic box

    // AR.js initialization
    const arToolkitSource = new ARjs.Source({});//Source of magic

    // Create your 3D models and add them to the scene

    // Handle window resize
    const handleResize = () => {
      arToolkitSource.onResize();
      arToolkitSource.copySizeTo(renderer.domElement);
      if (arToolkitContext.arController !== null) {
        arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
      }
    };

    // AR.js context
    const arToolkitContext = new ARjs.Context({
      cameraParametersUrl: 'data/camera_para.dat',
      detectionMode: 'mono',
    });

    arToolkitContext.init(() => {
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    // Handle updates
    const update = () => {
      if (arToolkitSource.ready !== false) {
        arToolkitContext.update(arToolkitSource.domElement);
      }
    };

    // Render loop
    const render = () => {
      requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
    };

    // Event listeners
    window.addEventListener('resize', handleResize);

    // Start rendering
    arToolkitSource.init(() => {
      arScene.current.appendChild(arToolkitSource.domElement);
      handleResize();
      render();
    });

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      arScene.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={arScene} />;
};

export default ARComponent;