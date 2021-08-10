import Scene from './Scene'
import EventController from './EventController'
import getParams from '../utils/getParams';
import { v4 as uuidv4 } from 'uuid';

/**
 * -  THREE-SETUP -
 * 
 * An Object-Oriented setup for three.js
 * 
 * By Parssa Kyanzadeh
 * www.parssak.com
 */

// All Entities use the same scene singleton
export const scene = new Scene();
new EventController(scene);


/**
 * Abstract Class Entity.
 *
 * @class Entity
 */
export default class Entity {
  constructor(params) {
    const entityParams = getParams(params);
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");
    const { ENTITY_OPTIONS, ...rest } = entityParams;
    this._id = uuidv4();
    this._scene = scene;
    this.inGroup = ENTITY_OPTIONS.inGroup || false;
    Object.entries(rest).forEach(([key, value]) => {
      this[key] = value;
    });
    this.Awake();
    this.Start()
  }

  // Use this to define the mesh of the Entity
  BuildMesh() {
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");
  }

  Awake() {
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");
    this.BuildMesh()
    this._scene.Add(this)
    console.log('added mesh to scene');
  }

  // Called once on initialization
  Start() {
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");
  }

  // Called every frame
  Update(time) {
    if (this.constructor == Entity)
      throw new Error("Abstract classes can't be instantiated.");
  }
}