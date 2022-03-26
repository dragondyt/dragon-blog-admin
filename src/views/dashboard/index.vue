<template>
  <canvas class="w-full h-full block text-[0]" id="renderCanvas" touch-action="none"></canvas>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {Engine, FreeCamera, HemisphericLight, Mesh, Scene, Vector3} from "@babylonjs/core";
import {GridMaterial} from "@babylonjs/materials/grid";

onMounted(() => {
// Get the canvas element from the DOM.
  const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

// Associate a Babylon Engine to it.
  const engine = new Engine(canvas);// Create our first scene.
  var scene = new Scene(engine);
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
// This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

// This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

// Create a grid material
  var material = new GridMaterial("grid", scene);

// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
  var sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

// Move the sphere upward 1/2 its height
  sphere.position.y = 2;

// Affect a material
  sphere.material = material;

// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
  var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

// Affect a material
  ground.material = material;
  // Render every frame
  engine.runRenderLoop(() => {
    scene.render();
  });

})
</script>

<style scoped>

</style>