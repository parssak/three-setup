# three-setup

An Object-oriented setup for creating projects using three.js. This boilerplate aims to clean up the code structure of three.js projects, and give a similar feel as to how Unity projects are structured.

# src/setup

## CameraController
This class handles all logic/setup for the Camera and Controls. To modify the Camera in your scene, you can edit `AddCamera()`, and to modify the Controls in your scene, you can edit `AddControls()`. 

## Scene
This class is represents the entire scene/world. It handles setting up the renderer, resizing, and exposes a public function for adding a mesh to the scene. 

### SetupScene()
Include any initialization of the Scene in here, such as lighting, meshes, fog, etc..

## Entity
This abstract class is to be used as the superclass to all objects in your scene. 
`_id`: A unique identifier initialized when the Entity is created.
`_scene`: A reference to the Scene singleton, useful for accessing other Entities in the scene by doing `this.scene.entities`
`name?:` A non-unique value that can be given to an Entity.
`inGroup?:` A boolean value for determine if an Entity is in a THREE.Group. Prevents double-rendering of both the Entity and it's parent group.

### Start()
Include any initialization logic. Note: The Entity is added to the Scene automatically, so do not include any logic for that in Start.

### Update()
Include any logic for updating the Entity.

### BuildMesh()
Include any setup for the Entity's mesh
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
