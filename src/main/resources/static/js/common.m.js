import {Utils} from './utils/index.m.js';
import * as index from './index/index.m.js';
import * as basic from './basic/index.m.js';


class Common extends Utils {
  constructor() {    
    console.log("Common sub1000",sub1000);
    super();

    const js_config = JSON.parse(document.querySelector('script#config')?.innerText ?? '{}'),
    route = {
      ...index,
      ...basic
    };
    if (!this.empty(js_config)) {
      new route[js_config.path](js_config.config);
    }  
    // new route[IndexSub1000](null)


  }
}

new Common();