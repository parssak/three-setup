# three-setup

An Object-oriented setup for creating projects using three.js. This boilerplate aims to clean up the code structure of three.js projects, and give a similar feel as to how Unity projects are structured.

This setup requires using Parcel, if you don't have Parcel, go to https://parceljs.org/getting_started.html for installation. 

## setup.js
This file is intended to not be modified or added to, (unless you have specific requirements/want to add on to the abstract `Entity` class). `setup.js` contains two classes, `Scene` & `Entity`. 

# Scene
This class is represents the entire scene/world. It handles setting up the renderer, resizing, and exposes a public function for adding a mesh to the scene. 

# Entity
This abstract class is to be used as the superclass to all objects in your scene. Entities are automatically added to the scene. 

### Usage
`Start()`: This is called at initialization, and should include any additional logic needed when adding that entity to the scene. __Do not include logic in `Start()` for adding the Entity mesh to the Scene, that is handled by the entity class.__ 

`BuildMesh()`: Contains all logic for creation of the entities' mesh. Make sure to initialize the mesh using this.mesh. 

`Update()`: This is called once per frame, and is used for updating the Entity. One caveat to note is to call `super.Update()` at the __end__ of the function rather than the start, so that changes made inside `Update()` are reflected at the end of the current frame, not the start of the next frame.

# Usage
Create child classes of Entity in `app.js` or other files. Each Entity's mesh should be created in their respective `BuildMesh()` function, with the mesh set to `this.mesh`. Updating Entities is handled in `Update()`, and call `super.Update()` at the end of the function, so that changes made inside `Update()` are reflected at the end of the current frame, not the start of the next frame. 