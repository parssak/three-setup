import Scene from './Scene'
import { v4 as uuidv4 } from 'uuid';

/**
 * -  THREE-SETUP -
 * 
 * An Object-Oriented setup for three.js
 * 
 * By Parssa Kyanzadeh
 * www.parssak.com
 */

export const scene = new Scene();

/**
 * Abstract Class Entity.
 *
 * @class Entity
 */
export default class Entity {
  constructor(inGroup = false) {
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");

    this.id = uuidv4();
    this.scene = scene;
    this.inGroup = inGroup;

    this.Start()
  }

  // Use this to define the mesh of the Entity
  BuildMesh() {
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");
  }

  // Called once on initialization
  Start() {
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");
    
    this.BuildMesh()
    this.scene.Add(this)
  }

  // Called every frame
  Update(time) {
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");
  }
}