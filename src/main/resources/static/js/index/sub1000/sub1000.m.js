import {PBUtils} from "../../utils/index.m.js";

/** @extends {pbUtils.PBUtils} */
export default class Sub1000 extends PBUtils {
  /** @type {indexSub1000.Constructor} */
  constructor() {
    console.log("constructor",sub1000);
    super();

    /** @type {indexSub1000.Sub1000['_form']} */
    this._form = sub1000;
    console.log(sub1000);

    this.eventInit();
  }

  /** @type {indexSub1000.Sub1000['eventInit']} */
  eventInit() {
    this._eventInit();
  }
}