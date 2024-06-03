import {PBUtils} from "../../utils/index.m.js";

/** @extends {pbUtils.PBUtils} */
export default class Sub2000 extends PBUtils {
  /** @type {indexSub2000.Constructor} */
  constructor() {
    super();

    /** @type {indexSub2000.Sub2000['_form']} */
    this._form = sub2000;

    this.eventInit();
  }

  /** @type {indexSub2000.Sub2000['eventInit']} */
  eventInit() {
    this._eventInit();
  }
}