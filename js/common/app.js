;
! function() {
  'use strict';

  function Calculator(options) {
    if (Calculator.instance) {
      return Calculator.instance;
    } else if (!(this instanceof Calculator)) {
      return (Calculator.instance = new Calculator(options));
    }
    this.init(options);
  }

  Calculator.__OPERATORS__ = '(&|)';
  Calculator.__ERROR_MSG__ = '错误';

  //1、初始化
  Calculator.prototype.init = function(options) {
    this.el = typeof options.el === 'string' ? document.querySelector(options.el) : this.el;
    this.buttons = typeof options.buttons === 'string' ? document.querySelector(options.buttons, this.el) : this
    .buttons;
    this.output = typeof options.output === 'string' ? document.querySelector(options.output, this.el) : this.output;
    this.result = this.output.innerHTML;
    this.currentNumber = '';
    this.lastKey = '';
    this.currentOperator = '';
    this.calculated = false;
    this.maxlength = 100;
    this.bindEvent();
  };

  //2、绑定点击事件
  Calculator.prototype.bindEvent = function() {
    const buttons = this.buttons,
        self = this;
    var resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize';
    buttons.addEventListener('click', function(ev) {
      let target = ev.target;
      if (target.nodeName === 'INPUT' && target.type === 'button') {
        self.access(target.value);
      }
    }, false);
    window.addEventListener(resizeEvt, function(e) {
      self.updateFontSize();
    }, false);
  };

  //3、点击事件后获得value
  Calculator.prototype.access = function(key) {
    this.key = key;
    this.currentNumber = this.getCurrentNumber();
    if (this.isOther(this.key)) {
      this.handleOther();
    }
    else if (this.isOperator(this.key)) {
      this.handleOperator();
    } else {
      this.handleString();
    }

    this.lastKey = this.key;
    this.updateView();
  };

  Calculator.prototype.isOperator = function(key) {
    return !!key && Calculator.__OPERATORS__.indexOf(key) > -1;
  };

  Calculator.prototype.isOther = function(x) {
    if(x == '←' || x == '清空'){
      return true;
    }else{
      return false;
    }
  };

  //4、获得值，是否加入
  Calculator.prototype.handleString = function() {
    this.append(this.key);
  };

  Calculator.prototype.handleOperator = function() {
    this.currentOperator = this.key;
    this.append(this.key);
  };

  Calculator.prototype.handleOther = function() {
    const fn = {
      '←': 'backSpace',
      '清空': 'allClear'
    }[this.key];
    if (fn) {
      this[fn]();
    }
  };


  Calculator.prototype.getCurrentNumber = function() {
    let index = this.currentOperator ? this.result.lastIndexOf(this.currentOperator) : -1;
    // 避免识别到负号
    if (this.currentOperator === '-' && this.result.charAt(index - 1) === '-') {
      index--;
    }
    return this.result.slice(index + 1);
  };



  //退一步
  Calculator.prototype.backSpace = function() {
    if (this.result === Calculator.__ERROR_MSG__) {
      return this.allClear();
    }
    this.result = this.result.slice(0, -1) || '';
    let char = this.result.slice(-1);
    if (this.isOperator(char) && this.isOperator(this.lastKey)) {
      this.currentOperator = char;
      this.key = char;
    }
    this.lastKey = this.key;
    if (this.result === '') {
      this.currentOperator = '';
    }
  };

  Calculator.prototype.allClear = function() {
    this.currentNumber = '';
    this.lastKey = '';
    this.currentOperator = '';
    this.result = '';
  };

  // 6、将获得的值加入列表中
  Calculator.prototype.append = function(s) {
    this.result = (this.result === '0' || this.calculated) && !this.isOperator(s) && s !== '.' ? s : this.result + s;
    while (this.result.length > this.maxlength) {
      this.backSpace();
    }
    if (this.calculated) {
      this.calculated = false;
    }
  };
 //7、将获得的值显示出来
  Calculator.prototype.updateView = function() {
    this.output.value = this.result;
  };

  Calculator.prototype.updateFontSize = function() {
    let parentWidth = this.output.parentNode.clientWidth - parseFloat(getComputedStyle(this.output.parentNode).padding),
        width = this.output.offsetWidth,
        fontSize = parseFloat(getComputedStyle(this.output.parentNode).fontSize),
        rate = 1;
    if (parentWidth < width) {
      rate = parentWidth / (width + fontSize);
    }

    this.output.style.transform = 'scale(' + rate + ')';
  };

  window.Calculator = Calculator;
}();