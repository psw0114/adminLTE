import Utils from './utils.m.js';
import Validation from './validation.m.js';

/** @extends {utils.Utils} */
export default class PBUtils extends Utils {
  /** @type {pbUtils.PBUtils['_form']} */
  _form;

  /** @type {pbUtils.PBUtils['_validation']} */
  _validation;

  /** @type {pbUtils.PBUtils['_submitMsg']} */
  _submitMsg = {
    reg: '등록하시겠습니까?',
    mod: '수정하시겠습니까?',
    del: '삭제하시겠습니까?'
  };

  /** @type {pbUtils.Constructor} */
  constructor(config) {
    super();
    console.log("pbUtils config :", config);
    this._validation = new Validation(config);
    /** @type {pbUtils.PBUtils['_get']} */
    this._get = this._get.bind(this);
    /** @type {pbUtils.PBUtils['_post']} */
    this._post = this._post.bind(this);
    /** @type {pbUtils.PBUtils['_subSelect']} */
    this._subSelect = this._subSelect.bind(this);
    /** @type {pbUtils.PBUtils['_checkAll']} */
    this._checkAll = this._checkAll.bind(this);
    /** @type {pbUtils.PBUtils['_bubbleStop']} */
    this._bubbleStop = this._bubbleStop.bind(this);
    /** @type {pbUtils.PBUtils['_daumPostcode']} */
    this._daumPostcode = this._daumPostcode.bind(this);

    this.pushmenuActive();
  }

  /** @type {pbUtils.PBUtils['eventInit']} */
  eventInit() {}

  /** @type {pbUtils.PBUtils['_eventInit']} */
  _eventInit() {
    document.querySelectorAll('[data-action="get"]').forEach((el, i, arr) => {
      let event = 'click';

      switch (el.tagName) {
        case 'SELECT':
          event = 'change';
          break;
      }

      el.addEventListener(event, this._get);
    });

    document.querySelectorAll('[data-action="post"]').forEach((el, i, arr) => {
      el.addEventListener('click', this._post);
    });

    document.querySelectorAll('[data-action="subSelect"]').forEach((el, i, arr) => {
      el.addEventListener('change', this._subSelect);
    });

    document.querySelectorAll('[data-action="checkAll"]').forEach((el, i, arr) => {
      el.addEventListener('click', this._checkAll, {capture: true});
    });

    document.querySelectorAll('[data-action="bubbleStop"]').forEach((el, i, arr) => {
      el.addEventListener('click', this._bubbleStop);
      el.addEventListener('input', this._bubbleStop);
      el.addEventListener('change', this._bubbleStop);
    });

    document.querySelectorAll('[data-action="daumPostcode"]').forEach((el, i, arr) => {
      el.addEventListener('click', this._daumPostcode);
    });
  }

  
  /**
   * get 요청 보내기 전 사용   
   * Get 요청 보내기 전에 수행해야할 유효성 및 로직 검사
   * true 반환되면 get요청 진행
   */
  /** @type {pbUtils.PBUtils['_beforeGet']} */
  _beforeGet(ev) {};

  /** @type {pbUtils.PBUtils['_get']} */
  _get(ev) {
    const node = ev.currentTarget;

    if (this._beforeGet(ev) ?? true) {
      if (!this.empty(this._form)) {
        this._form.action = node.dataset.url;

        this._form.submit();
      } else {
        location.href = node.dataset.url;
      }
    }
  }

  /** @type {pbUtils.PBUtils['_beforePost']} */
  _beforePost(ev) {};

  /** @type {pbUtils.PBUtils['_post']} */
  _post(ev) {
    const node = ev.currentTarget;
    console.log(this._form);
    if (this._beforePost(ev) ?? true) {      
      if (this.empty(node.dataset.state) || confirm(this._submitMsg[node.dataset.state])) {
        if (!this.empty(this._validation.result.el)) {         
          this._validate(this._validation.result.el, true);
        }

        this._validation.init();

        if (this.empty(node.dataset.state) || ['reg', 'mod'].includes(node.dataset.state)) {
          this._validation.run(this._form);
        }

        if (this._validation.result.flag) {
          console.log(this._validation.result.flag);
          this._form.action = `${node.dataset.url}${location.search}`;

          this._form.submit();
        } else {
          this._validationError();
        }
      }
    }
  }

  /** @type {pbUtils.PBUtils['_subSelect']} */
  _subSelect(ev) {
    /** @type {HTMLSelectElement} */
    const node = ev.currentTarget,
    /** @type {HTMLSelectElement} */
    sub_node = document.querySelector(`select[data-id="${node.dataset.target}"]`);

    if (!this.empty(sub_node)) {
      sub_node.querySelectorAll('option').forEach((el, i, arr) => {
        if (!this.empty(el.value)) {
          el.style.setProperty('display', (node.value == el.dataset[node.dataset.id]) ? 'block' : 'none');
        }
      });

      sub_node.value = '';

      sub_node.dispatchEvent(new Event('change'));
    }
  }

  /** @type {pbUtils.PBUtils['_checkAll']} */
  _checkAll(ev) {
    /** @type {HTMLInputElement} */
    const node = ev.currentTarget;

    this.checkAll(node, node.dataset.target);
  }

  /** @type {pbUtils.PBUtils['_bubbleStop']} */
  _bubbleStop(ev) {
    ev.stopPropagation();
  }

  /** @type {pbUtils.PBUtils['_daumPostcode']} */
  _daumPostcode(ev) {
    const node = ev.currentTarget,
    target = document.querySelector(`[data-name="${node.dataset.target}"]`);

    //주소검색
    //본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
    new daum.Postcode({
      oncomplete: ((data) => {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        const roadAddr = data.roadAddress; // 도로명 주소 변수
        let extraRoadAddr = ''; // 참고 항목 변수

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraRoadAddr !== '') {
          extraRoadAddr = ' (' + extraRoadAddr + ')';
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        // let addr__ = data.zonecode;
        let addr__ = (!this.empty(roadAddr)) ? roadAddr : data.jibunAddress;

        // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
        if (!this.empty(addr__)) {
          addr__ += extraRoadAddr;
        }

        target.value = addr__;
      }).bind(this)
    }).open();
  }

  /** @type {pbUtils.PBUtils['_validationError']} */
  _validationError() {
    const result = this._validation.result;

    alert(result.alertMsg);
    this._validate(result.el, false, result.alertMsg);
    result.el.focus();
  }

  /** @type {pbUtils.PBUtils['_validate']} */
  _validate(node, flag, msg = null) {
    if(flag){
      const div = node.parentNode.querySelector(`.invalid-feedback`);

      if(!this.empty(div)){
        node.parentNode.removeChild(div);
      }

      node.classList.remove('is-invalid');
      node.parentNode.classList.add('d-flex')
    }else{
      let div = node.parentNode.querySelector(`.invalid-feedback`);

      if(this.empty(div)){
        div = document.createElement("div");
        div.innerHTML = `<span>${msg}</span>`

        div.classList.add('invalid-feedback');
        node.parentNode.append(div);
      }

      node.classList.add('is-invalid');
      node.parentNode.classList.remove('d-flex')
    }
  }

  pushmenuActive() {
      document.querySelector(`[data-widget="pushmenu"]`)?.addEventListener('click', (e) => {
        this.setCookie('sidebar', ((this.getCookie('sidebar') ?? 'N') == 'Y') ? 'N' : 'Y');
      });
    }
}