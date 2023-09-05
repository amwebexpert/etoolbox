/* eslint-disable react/no-unknown-property */
import React, { Suspense } from 'react';

import { Typography } from '@mui/material';
import { OrbitControls, PerspectiveCamera, useFBX, useProgress } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { Color, DirectionalLight } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import { useStyles } from './styled';

const ModelFbx = () => {
  //const fbx = useFBX('demo-tunel.fbx');
  const fbx = useFBX('demo-stones-wall.fbx');

  return <primitive object={fbx} scale={0.05} />;
};

const Model = () => {
  const baseURL =
    'https://raw.githubusercontent.com/learnthreejs/three-js-boilerplate/master/public/examples/3d-obj-loader/assets';
  const materials = useLoader(MTLLoader, `${baseURL}/r2-d2.mtl`);
  const obj = useLoader(OBJLoader, `${baseURL}/r2-d2.obj`, loader => {
    materials.preload();
    loader.setMaterials(materials);
  });
  obj.position.y -= 60;

  return <primitive object={obj} />;
};

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Typography align="center" variant="body2">
      {progress} % loaded
    </Typography>
  );
};

const Trees = () => {
  const classes = useStyles();

  const keyLight = new DirectionalLight(new Color('hsl(30, 100%, 75%)'), 1.0);
  keyLight.position.set(-100, 0, 100);

  const fillLight = new DirectionalLight(new Color('hsl(240, 100%, 75%)'), 0.75);
  fillLight.position.set(100, 0, 100);

  const backLight = new DirectionalLight('white', 1);
  backLight.position.set(100, 100, 100).normalize();

  return (
    <Suspense fallback={<Loader />}>
      <Canvas
        className={classes.viewer}
        style={{ height: '600px' }}
        onCreated={({ scene }) => {
          scene.add(keyLight);
          scene.add(fillLight);
          scene.add(backLight);
        }}>
        <ambientLight intensity={1} />
        <PerspectiveCamera makeDefault position={[0, 0, 200]} />
        <Model />
        <OrbitControls enableDamping={true} dampingFactor={0.25} enableZoom={true} />
      </Canvas>
    </Suspense>
  );
};

export default Trees;
