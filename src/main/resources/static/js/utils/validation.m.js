import Utils from './utils.m.js';

/** @extends {utils.Utils} */
export default class Validation extends Utils {
  /** @type {validation.Constructor} */
  constructor(config) {
    super();

    this.init(config);
  }

  /** @type {validation.Validation['init']} */
  init(config = null) {
    console.log("validation.init config" + config);
    this.resultInit(config?.result);
  }

  /** @type {validation.Validation['resultInit']} */
  resultInit(result = null) {
    /** @type {validation.resultDefault} */
    const _default = {
      flag: true,
      alertMsg: null,
      el: null
    };

    /** @type {validation.Validation['result']} */
    this.result = (!this.empty(result) && this.isObject(result))
      ? {
        ..._default,
        ...result
      }
      : _default;
  }



  /** @type {validation.Validation['run']} */
  run(form) {
    this.init();

    for (const el of form.elements) {
      if (this.result.flag) {
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName)) {
          if (!el.disabled) {
            // this.required(el);
            // this.setEl(el);
          }
        }
      } else {
        break;
      }
    }

  }
}