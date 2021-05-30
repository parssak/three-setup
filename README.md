# three-setup

An Object-oriented setup for creating projects using three.js. This boilerplate aims to clean up the code structure of three.js projects, and give a similar feel as to how Unity projects are structured.

# setup.js
`setup.js` contains three classes, `CameraController`, `Scene` & `Entity`. 

## CameraController
This class handles all logic/setup for the Camera and Controls. To modify the Camera in your scene, you can edit `AddCamera()`, and to modify the Controls in your scene, you can edit `AddControls()`. 

## Scene
This class is represents the entire scene/world. It handles setting up the renderer, resizing, and exposes a public function for adding a mesh to the scene. 

## Entity
This abstract class is to be used as the superclass to all objects in your scene. 

### Usage

First run `npm i` to download the required dependencies. 

To run in development:
```
 $ npm run dev
```

To make a production build:
```
 $ npm run dev
```
The production build will be in /dist.

`Start()`: This is called at initialization, and should include any additional logic needed when adding that entity to the scene. __Do not include logic in `Start()` for adding/creating the Entity mesh to the Scene, that is handled by the entitu class.__ For creating the mesh
