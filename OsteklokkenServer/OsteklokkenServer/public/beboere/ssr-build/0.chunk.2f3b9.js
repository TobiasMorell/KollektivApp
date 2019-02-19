exports.ids = [0];
exports.modules = {

/***/ "5sRW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var util_namespaceObject = {};
__webpack_require__.d(util_namespaceObject, "createFocusTrapInstance", function() { return createFocusTrapInstance; });

// EXTERNAL MODULE: ../node_modules/@material/base/index.js
var base = __webpack_require__("dSNL");

// EXTERNAL MODULE: ../node_modules/@material/ripple/index.js + 3 modules
var ripple = __webpack_require__("vkNc");

// CONCATENATED MODULE: ../node_modules/@material/dialog/constants.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var cssClasses = {
  ROOT: 'mdc-dialog',
  OPEN: 'mdc-dialog--open',
  ANIMATING: 'mdc-dialog--animating',
  BACKDROP: 'mdc-dialog__backdrop',
  SCROLL_LOCK: 'mdc-dialog-scroll-lock',
  ACCEPT_BTN: 'mdc-dialog__footer__button--accept',
  CANCEL_BTN: 'mdc-dialog__footer__button--cancel'
};

var strings = {
  OPEN_DIALOG_SELECTOR: '.mdc-dialog--open',
  DIALOG_SURFACE_SELECTOR: '.mdc-dialog__surface',
  ACCEPT_SELECTOR: '.mdc-dialog__footer__button--accept',
  ACCEPT_EVENT: 'MDCDialog:accept',
  CANCEL_EVENT: 'MDCDialog:cancel'
};

var numbers = {
  DIALOG_ANIMATION_TIME_MS: 120
};


// CONCATENATED MODULE: ../node_modules/@material/dialog/foundation.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */




var foundation_MDCDialogFoundation = function (_MDCFoundation) {
  _inherits(MDCDialogFoundation, _MDCFoundation);

  _createClass(MDCDialogFoundation, null, [{
    key: 'cssClasses',
    get: function get() {
      return cssClasses;
    }
  }, {
    key: 'strings',
    get: function get() {
      return strings;
    }
  }, {
    key: 'numbers',
    get: function get() {
      return numbers;
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        addBodyClass: function addBodyClass() /* className: string */{},
        removeBodyClass: function removeBodyClass() /* className: string */{},
        eventTargetHasClass: function eventTargetHasClass() {
          return (/* target: EventTarget, className: string */ /* boolean */false
          );
        },
        registerInteractionHandler: function registerInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evt: string, handler: EventListener */{},
        registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
        deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler() /* evt: string, handler: EventListener */{},
        registerDocumentKeydownHandler: function registerDocumentKeydownHandler() /* handler: EventListener */{},
        deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler() /* handler: EventListener */{},
        notifyAccept: function notifyAccept() {},
        notifyCancel: function notifyCancel() {},
        trapFocusOnSurface: function trapFocusOnSurface() {},
        untrapFocusOnSurface: function untrapFocusOnSurface() {},
        isDialog: function isDialog() {
          return (/* el: Element */ /* boolean */false
          );
        }
      };
    }
  }]);

  function MDCDialogFoundation(adapter) {
    _classCallCheck(this, MDCDialogFoundation);

    var _this = _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCDialogFoundation.defaultAdapter, adapter)));

    _this.isOpen_ = false;
    _this.componentClickHandler_ = function (evt) {
      if (_this.adapter_.eventTargetHasClass(evt.target, cssClasses.BACKDROP)) {
        _this.cancel(true);
      }
    };
    _this.dialogClickHandler_ = function (evt) {
      return _this.handleDialogClick_(evt);
    };
    _this.documentKeydownHandler_ = function (evt) {
      if (evt.key && evt.key === 'Escape' || evt.keyCode === 27) {
        _this.cancel(true);
      }
    };

    _this.timerId_ = 0;
    _this.animationTimerEnd_ = function (evt) {
      return _this.handleAnimationTimerEnd_(evt);
    };
    return _this;
  }

  MDCDialogFoundation.prototype.destroy = function destroy() {
    // Ensure that dialog is cleaned up when destroyed
    if (this.isOpen_) {
      this.close();
    }
    // Final cleanup of animating class in case the timer has not completed.
    this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
    clearTimeout(this.timerId_);
  };

  MDCDialogFoundation.prototype.open = function open() {
    this.isOpen_ = true;
    this.disableScroll_();
    this.adapter_.registerDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.registerSurfaceInteractionHandler('click', this.dialogClickHandler_);
    this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
    clearTimeout(this.timerId_);
    this.timerId_ = setTimeout(this.animationTimerEnd_, MDCDialogFoundation.numbers.DIALOG_ANIMATION_TIME_MS);
    this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
    this.adapter_.addClass(MDCDialogFoundation.cssClasses.OPEN);
  };

  MDCDialogFoundation.prototype.close = function close() {
    this.isOpen_ = false;
    this.enableScroll_();
    this.adapter_.deregisterSurfaceInteractionHandler('click', this.dialogClickHandler_);
    this.adapter_.deregisterDocumentKeydownHandler(this.documentKeydownHandler_);
    this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
    this.adapter_.untrapFocusOnSurface();
    clearTimeout(this.timerId_);
    this.timerId_ = setTimeout(this.animationTimerEnd_, MDCDialogFoundation.numbers.DIALOG_ANIMATION_TIME_MS);
    this.adapter_.addClass(MDCDialogFoundation.cssClasses.ANIMATING);
    this.adapter_.removeClass(MDCDialogFoundation.cssClasses.OPEN);
  };

  MDCDialogFoundation.prototype.isOpen = function isOpen() {
    return this.isOpen_;
  };

  MDCDialogFoundation.prototype.accept = function accept(shouldNotify) {
    if (shouldNotify) {
      this.adapter_.notifyAccept();
    }

    this.close();
  };

  MDCDialogFoundation.prototype.cancel = function cancel(shouldNotify) {
    if (shouldNotify) {
      this.adapter_.notifyCancel();
    }

    this.close();
  };

  MDCDialogFoundation.prototype.handleDialogClick_ = function handleDialogClick_(evt) {
    var target = evt.target;

    if (this.adapter_.eventTargetHasClass(target, cssClasses.ACCEPT_BTN)) {
      this.accept(true);
    } else if (this.adapter_.eventTargetHasClass(target, cssClasses.CANCEL_BTN)) {
      this.cancel(true);
    }
  };

  MDCDialogFoundation.prototype.handleAnimationTimerEnd_ = function handleAnimationTimerEnd_() {
    this.adapter_.removeClass(MDCDialogFoundation.cssClasses.ANIMATING);
    if (this.isOpen_) {
      this.adapter_.trapFocusOnSurface();
    }
  };

  MDCDialogFoundation.prototype.disableScroll_ = function disableScroll_() {
    this.adapter_.addBodyClass(cssClasses.SCROLL_LOCK);
  };

  MDCDialogFoundation.prototype.enableScroll_ = function enableScroll_() {
    this.adapter_.removeBodyClass(cssClasses.SCROLL_LOCK);
  };

  return MDCDialogFoundation;
}(base["b" /* MDCFoundation */]);


// EXTERNAL MODULE: ../node_modules/focus-trap/index.js
var focus_trap = __webpack_require__("ySUw");
var focus_trap_default = /*#__PURE__*/__webpack_require__.n(focus_trap);

// CONCATENATED MODULE: ../node_modules/@material/dialog/util.js
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



function createFocusTrapInstance(surfaceEl, acceptButtonEl) {
  var focusTrapFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : focus_trap_default.a;

  return focusTrapFactory(surfaceEl, {
    initialFocus: acceptButtonEl,
    clickOutsideDeactivates: true
  });
}
// CONCATENATED MODULE: ../node_modules/@material/dialog/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCDialog", function() { return dialog_MDCDialog; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MDCDialogFoundation", function() { return foundation_MDCDialogFoundation; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "util", function() { return util_namespaceObject; });
var dialog__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function dialog__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dialog__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function dialog__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */










var dialog_MDCDialog = function (_MDCComponent) {
  dialog__inherits(MDCDialog, _MDCComponent);

  function MDCDialog() {
    dialog__classCallCheck(this, MDCDialog);

    return dialog__possibleConstructorReturn(this, _MDCComponent.apply(this, arguments));
  }

  MDCDialog.attachTo = function attachTo(root) {
    return new MDCDialog(root);
  };

  MDCDialog.prototype.initialize = function initialize() {
    this.focusTrap_ = createFocusTrapInstance(this.dialogSurface_, this.acceptButton_);
    this.footerBtnRipples_ = [];

    var footerBtns = this.root_.querySelectorAll('.mdc-dialog__footer__button');
    for (var i = 0, footerBtn; footerBtn = footerBtns[i]; i++) {
      this.footerBtnRipples_.push(new ripple["MDCRipple"](footerBtn));
    }
  };

  MDCDialog.prototype.destroy = function destroy() {
    this.footerBtnRipples_.forEach(function (ripple) {
      return ripple.destroy();
    });
    _MDCComponent.prototype.destroy.call(this);
  };

  MDCDialog.prototype.show = function show() {
    this.foundation_.open();
  };

  MDCDialog.prototype.close = function close() {
    this.foundation_.close();
  };

  MDCDialog.prototype.getDefaultFoundation = function getDefaultFoundation() {
    var _this2 = this;

    return new foundation_MDCDialogFoundation({
      addClass: function addClass(className) {
        return _this2.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return _this2.root_.classList.remove(className);
      },
      addBodyClass: function addBodyClass(className) {
        return document.body.classList.add(className);
      },
      removeBodyClass: function removeBodyClass(className) {
        return document.body.classList.remove(className);
      },
      eventTargetHasClass: function eventTargetHasClass(target, className) {
        return target.classList.contains(className);
      },
      registerInteractionHandler: function registerInteractionHandler(evt, handler) {
        return _this2.root_.addEventListener(evt, handler);
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evt, handler) {
        return _this2.root_.removeEventListener(evt, handler);
      },
      registerSurfaceInteractionHandler: function registerSurfaceInteractionHandler(evt, handler) {
        return _this2.dialogSurface_.addEventListener(evt, handler);
      },
      deregisterSurfaceInteractionHandler: function deregisterSurfaceInteractionHandler(evt, handler) {
        return _this2.dialogSurface_.removeEventListener(evt, handler);
      },
      registerDocumentKeydownHandler: function registerDocumentKeydownHandler(handler) {
        return document.addEventListener('keydown', handler);
      },
      deregisterDocumentKeydownHandler: function deregisterDocumentKeydownHandler(handler) {
        return document.removeEventListener('keydown', handler);
      },
      notifyAccept: function notifyAccept() {
        return _this2.emit(foundation_MDCDialogFoundation.strings.ACCEPT_EVENT);
      },
      notifyCancel: function notifyCancel() {
        return _this2.emit(foundation_MDCDialogFoundation.strings.CANCEL_EVENT);
      },
      trapFocusOnSurface: function trapFocusOnSurface() {
        return _this2.focusTrap_.activate();
      },
      untrapFocusOnSurface: function untrapFocusOnSurface() {
        return _this2.focusTrap_.deactivate();
      },
      isDialog: function isDialog(el) {
        return el === _this2.dialogSurface_;
      }
    });
  };

  dialog__createClass(MDCDialog, [{
    key: 'open',
    get: function get() {
      return this.foundation_.isOpen();
    }
  }, {
    key: 'acceptButton_',
    get: function get() {
      return this.root_.querySelector(foundation_MDCDialogFoundation.strings.ACCEPT_SELECTOR);
    }
  }, {
    key: 'dialogSurface_',
    get: function get() {
      return this.root_.querySelector(foundation_MDCDialogFoundation.strings.DIALOG_SURFACE_SELECTOR);
    }
  }]);

  return MDCDialog;
}(base["a" /* MDCComponent */]);

/***/ }),

/***/ "JtzT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _interopRequireDefault = __webpack_require__("SpGf");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Dialog = exports.DialogFooterButton = exports.DialogFooter = exports.DialogBody = exports.DialogHeader = void 0;

var _get2 = _interopRequireDefault(__webpack_require__("J5U+"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("0fcM"));

var _createClass2 = _interopRequireDefault(__webpack_require__("P8NW"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("0421"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("UJE0"));

var _inherits2 = _interopRequireDefault(__webpack_require__("d4H2"));

var _typeof2 = _interopRequireDefault(__webpack_require__("b9XL"));

var _dialog = __webpack_require__("5sRW");

var _bindDecorator = __webpack_require__("gKs0");

var _preact = __webpack_require__("KM04");

var _MaterialComponent5 = _interopRequireDefault(__webpack_require__("uc5p"));

var _Button2 = __webpack_require__("7/cg");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DialogHeader =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(DialogHeader, _MaterialComponent);

  function DialogHeader() {
    var _this;

    (0, _classCallCheck2.default)(this, DialogHeader);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DialogHeader).apply(this, arguments));
    _this.componentName = 'dialog__header';
    _this.mdcProps = [];
    return _this;
  }

  (0, _createClass2.default)(DialogHeader, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("header", _extends({}, props), (0, _preact.h)("h2", {
        className: "mdc-dialog__header__title"
      }, props.children));
    }
  }]);
  return DialogHeader;
}(_MaterialComponent5.default);

exports.DialogHeader = DialogHeader;

__decorate([_bindDecorator.bind], DialogHeader.prototype, "materialDom", null);

var DialogBody =
/*#__PURE__*/
function (_MaterialComponent2) {
  (0, _inherits2.default)(DialogBody, _MaterialComponent2);

  function DialogBody() {
    var _this2;

    (0, _classCallCheck2.default)(this, DialogBody);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DialogBody).apply(this, arguments));
    _this2.componentName = 'dialog__body';
    _this2.mdcProps = ['scrollable'];
    return _this2;
  }

  (0, _createClass2.default)(DialogBody, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("section", _extends({}, props), props.children);
    }
  }]);
  return DialogBody;
}(_MaterialComponent5.default);

exports.DialogBody = DialogBody;

__decorate([_bindDecorator.bind], DialogBody.prototype, "materialDom", null);

var DialogFooter =
/*#__PURE__*/
function (_MaterialComponent3) {
  (0, _inherits2.default)(DialogFooter, _MaterialComponent3);

  function DialogFooter() {
    var _this3;

    (0, _classCallCheck2.default)(this, DialogFooter);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DialogFooter).apply(this, arguments));
    _this3.componentName = 'dialog__footer';
    _this3.mdcProps = [];
    return _this3;
  }

  (0, _createClass2.default)(DialogFooter, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("footer", _extends({}, props), props.children);
    }
  }]);
  return DialogFooter;
}(_MaterialComponent5.default);

exports.DialogFooter = DialogFooter;

__decorate([_bindDecorator.bind], DialogFooter.prototype, "materialDom", null);

var DialogFooterButton =
/*#__PURE__*/
function (_Button) {
  (0, _inherits2.default)(DialogFooterButton, _Button);

  function DialogFooterButton() {
    var _this4;

    (0, _classCallCheck2.default)(this, DialogFooterButton);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DialogFooterButton).apply(this, arguments));
    _this4.componentName = 'dialog__footer__button';
    _this4.mdcProps = ['cancel', 'accept'];
    return _this4;
  }

  (0, _createClass2.default)(DialogFooterButton, [{
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("button", _extends({}, props, {
        className: "mdc-button",
        ref: this.setControlRef
      }), props.children);
    }
  }]);
  return DialogFooterButton;
}(_Button2.Button);

exports.DialogFooterButton = DialogFooterButton;

__decorate([_bindDecorator.bind], DialogFooterButton.prototype, "materialDom", null);

var Dialog =
/*#__PURE__*/
function (_MaterialComponent4) {
  (0, _inherits2.default)(Dialog, _MaterialComponent4);

  function Dialog() {
    var _this5;

    (0, _classCallCheck2.default)(this, Dialog);
    _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Dialog).apply(this, arguments));
    _this5.componentName = 'dialog';
    _this5.mdcProps = [];
    return _this5;
  }

  (0, _createClass2.default)(Dialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Dialog.prototype), "componentDidMount", this).call(this);

      if (this.control) {
        this.MDComponent = new _dialog.MDCDialog(this.control);
        this.MDComponent.listen('MDCDialog:accept', this.onAccept);
        this.MDComponent.listen('MDCDialog:cancel', this.onCancel);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Dialog.prototype), "componentWillUnmount", this).call(this);

      if (this.MDComponent) {
        this.MDComponent.unlisten('MDCDialog:accept', this.onAccept);
        this.MDComponent.unlisten('MDCDialog:cancel', this.onCancel);
        this.MDComponent.destroy();
      }
    }
  }, {
    key: "onAccept",
    value: function onAccept(e) {
      if (this.props.onAccept) {
        this.props.onAccept(e);
      }
    }
  }, {
    key: "onCancel",
    value: function onCancel(e) {
      if (this.props.onCancel) {
        this.props.onCancel(e);
      }
    }
  }, {
    key: "materialDom",
    value: function materialDom(props) {
      return (0, _preact.h)("aside", _extends({
        role: 'alertdialog',
        ref: this.setControlRef
      }, props), (0, _preact.h)("div", {
        className: "mdc-dialog__surface"
      }, props.children), (0, _preact.h)("div", {
        className: "mdc-dialog__backdrop"
      }));
    }
  }]);
  return Dialog;
}(_MaterialComponent5.default);

exports.Dialog = Dialog;

__decorate([_bindDecorator.bind], Dialog.prototype, "onAccept", null);

__decorate([_bindDecorator.bind], Dialog.prototype, "onCancel", null);

var default_1 =
/*#__PURE__*/
function (_Dialog) {
  (0, _inherits2.default)(default_1, _Dialog);

  function default_1() {
    (0, _classCallCheck2.default)(this, default_1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
  }

  return default_1;
}(Dialog);

exports.default = default_1;
default_1.Header = DialogHeader;
default_1.Body = DialogBody;
default_1.Footer = DialogFooter;
default_1.FooterButton = DialogFooterButton;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "PKvf":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"pb-0":"pb-0__7lCpY","mb-0":"mb-0__3ftCB","fabLowerRight":"fabLowerRight__2Lrgx","listEndCenter":"listEndCenter__1T9Vo","shoppingListItem":"shoppingListItem__bXqob","delete":"delete__3iO_e","left-then-right":"left-then-right__lwO1R","revertMargin":"revertMargin__EseBX","primaryOnHover":"primaryOnHover__tsAa8","mdc-theme--dark":"mdc-theme--dark__12LgJ","wideInputField":"wideInputField__3roIW","addCategoryIcon":"addCategoryIcon__2Qb_w","centerChildren":"centerChildren__1Gw5V","onlyDesktop":"onlyDesktop__3KGIT","onlyMobile":"onlyMobile__3BLu4","left":"left__Uitll","scrollable":"scrollable__1nHNC","title":"title__puSJW","description":"description__1xIuV","alignIconCenter":"alignIconCenter__XgaJt"};

/***/ }),

/***/ "SjLK":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "TO+D":
/***/ (function(module, exports) {

module.exports = function (el, options) {
  options = options || {};

  var elementDocument = el.ownerDocument || el;
  var basicTabbables = [];
  var orderedTabbables = [];

  // A node is "available" if
  // - it's computed style
  var isUnavailable = createIsUnavailable(elementDocument);

  var candidateSelectors = ['input', 'select', 'a[href]', 'textarea', 'button', '[tabindex]'];

  var candidates = el.querySelectorAll(candidateSelectors.join(','));

  if (options.includeContainer) {
    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

    if (candidateSelectors.some(function (candidateSelector) {
      return matches.call(el, candidateSelector);
    })) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  var candidate, candidateIndexAttr, candidateIndex;
  for (var i = 0, l = candidates.length; i < l; i++) {
    candidate = candidates[i];
    candidateIndexAttr = parseInt(candidate.getAttribute('tabindex'), 10);
    candidateIndex = isNaN(candidateIndexAttr) ? candidate.tabIndex : candidateIndexAttr;

    if (candidateIndex < 0 || candidate.tagName === 'INPUT' && candidate.type === 'hidden' || candidate.disabled || isUnavailable(candidate, elementDocument)) {
      continue;
    }

    if (candidateIndex === 0) {
      basicTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        index: i,
        tabIndex: candidateIndex,
        node: candidate
      });
    }
  }

  var tabbableNodes = orderedTabbables.sort(function (a, b) {
    return a.tabIndex === b.tabIndex ? a.index - b.index : a.tabIndex - b.tabIndex;
  }).map(function (a) {
    return a.node;
  });

  Array.prototype.push.apply(tabbableNodes, basicTabbables);

  return tabbableNodes;
};

function createIsUnavailable(elementDocument) {
  // Node cache must be refreshed on every check, in case
  // the content of the element has changed
  var isOffCache = [];

  // "off" means `display: none;`, as opposed to "hidden",
  // which means `visibility: hidden;`. getComputedStyle
  // accurately reflects visiblity in context but not
  // "off" state, so we need to recursively check parents.

  function isOff(node, nodeComputedStyle) {
    if (node === elementDocument.documentElement) return false;

    // Find the cached node (Array.prototype.find not available in IE9)
    for (var i = 0, length = isOffCache.length; i < length; i++) {
      if (isOffCache[i][0] === node) return isOffCache[i][1];
    }

    nodeComputedStyle = nodeComputedStyle || elementDocument.defaultView.getComputedStyle(node);

    var result = false;

    if (nodeComputedStyle.display === 'none') {
      result = true;
    } else if (node.parentNode) {
      result = isOff(node.parentNode);
    }

    isOffCache.push([node, result]);

    return result;
  }

  return function isUnavailable(node) {
    if (node === elementDocument.documentElement) return false;

    var computedStyle = elementDocument.defaultView.getComputedStyle(node);

    if (isOff(node, computedStyle)) return true;

    return computedStyle.visibility === 'hidden';
  };
}

/***/ }),

/***/ "TWkU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-material-components/TextField/index.js
var TextField = __webpack_require__("Cv2I");
var TextField_default = /*#__PURE__*/__webpack_require__.n(TextField);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Fab/index.js
var Fab = __webpack_require__("jGKv");
var Fab_default = /*#__PURE__*/__webpack_require__.n(Fab);

// EXTERNAL MODULE: ../node_modules/preact-material-components/List/index.js
var List = __webpack_require__("E7XR");
var List_default = /*#__PURE__*/__webpack_require__.n(List);

// EXTERNAL MODULE: ./routes/shopping/style.css
var style = __webpack_require__("PKvf");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ./routes/shopping/ShoppingListItem.js
var ShoppingListItem = __webpack_require__("nbQo");

// EXTERNAL MODULE: ./Backend.js
var Backend = __webpack_require__("GNty");

// EXTERNAL MODULE: ../node_modules/preact-material-components/Dialog/index.js
var Dialog = __webpack_require__("JtzT");
var Dialog_default = /*#__PURE__*/__webpack_require__.n(Dialog);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Icon/index.js
var Icon = __webpack_require__("MeGi");
var Icon_default = /*#__PURE__*/__webpack_require__.n(Icon);

// EXTERNAL MODULE: ../node_modules/preact-material-autocompleter/style.css
var preact_material_autocompleter_style = __webpack_require__("SjLK");
var preact_material_autocompleter_style_default = /*#__PURE__*/__webpack_require__.n(preact_material_autocompleter_style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/TextField/style.css
var TextField_style = __webpack_require__("qKn3");
var TextField_style_default = /*#__PURE__*/__webpack_require__.n(TextField_style);

// CONCATENATED MODULE: ../node_modules/preact-material-autocompleter/index.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






/**
 * Material design autocompleter. Opens up a dropdown when the TextField is selected, where the user may select one of
 * the items in a collection.
 */

var _ref2 = Object(preact_min["h"])(
	'strong',
	null,
	'No such item, click here to add it.'
);

var _ref3 = Object(preact_min["h"])(
	'div',
	null,
	Object(preact_min["h"])(
		'strong',
		null,
		'No item matches your search.'
	)
);

var preact_material_autocompleter_Index = function (_Component) {
	_inherits(Index, _Component);

	function Index() {
		var _temp, _this, _ret;

		_classCallCheck(this, Index);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			autocompleting: false,
			currentInput: '',
			relevantItems: []
		}, _this.getRecommendation = function () {
			return _this.state.currentInput;
		}, _this.setRecommendation = function (value) {
			_this.setState({ currentInput: value });
		}, _this._autocomplete = function (e) {
			var input = void 0;
			if (e.target.children.length) input = e.target.children[0].innerHTML;else input = e.target.innerHTML;
			_this.setState({ currentInput: input });
			_this._stop();
		}, _this.start = function () {
			_this.setState({ autocompleting: true });
			_this._onInput({ target: { value: '' } });
		}, _this._stop = function () {
			_this.setState({ autocompleting: false });
			if (_this.state.onChange) _this.state.onChange({
				target: { value: _this.getRecommendation() }
			});
		}, _this.abort = function () {
			setTimeout(function () {
				_this.setState({ autocompleting: false });
			}, 100);
		}, _this._onInput = function (e) {
			var newVal = e.target.value;
			console.log(_this.state.allItems);

			var matches = void 0;
			if (_this.state.allItems) {
				matches = newVal ? _this.state.allItems.filter(function (item) {
					return item.includes(newVal);
				}) : _this.state.allItems;
			} else matches = [];
			_this.setState({
				relevantItems: matches,
				currentInput: newVal
			});
		}, _this.addNewCategory = function (e) {
			_this.state.allItems.push(_this.state.currentInput);
			_this._stop();
		}, _this.focus = function () {
			document.getElementById(_this._id).focus();
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	/**
  * Gets the current value of the autocompleter.
  * @returns {string}
  */


	/**
  * Sets the current value of the autocompleter.
  * @param value {string} The value to set.
  */


	/**
  * Autocomplete by reading the value of an option and setting the TextField's value to that.
  * @param e {event} onClick event object.
  * @private
  */


	/**
  * Create an item for the dropdown menu.
  * @param itemName {string} The name of the item to create.
  * @returns {*} An HTML element representing the item.
  * @private
  */
	Index.prototype._createItem = function _createItem(itemName) {
		return Object(preact_min["h"])(
			'div',
			{ onClick: this._autocomplete },
			Object(preact_min["h"])(
				'strong',
				null,
				itemName
			)
		);
	};

	/**
  * Starts the autocompleter by showing the dropdown menu and resetting the value of the input field.
  */

	/**
  * Stops the auto completion by hiding the dropdown menu and firing the onChange event, if that is set.
  * @private
  */

	/**
  * Abort the autocompletion by hiding the dropdown. The onChange event is not fired when aborting autocompletion.
  */


	/**
  * Responds to a user keystroke by finding suggestions and updating the dropdown correspondingly.
  * @param e {event} - The onInput event object from the TextField.
  * @private
  */


	/**
  * Focus the underlying input field, causing the autocompleter to expand the suggestion box.
  */


	Index.prototype.render = function render(_ref) {
		var _this2 = this;

		var items = _ref.items,
		    className = _ref.className,
		    _ref$allowAddNewItems = _ref.allowAddNewItems,
		    allowAddNewItems = _ref$allowAddNewItems === undefined ? false : _ref$allowAddNewItems,
		    _ref$hintText = _ref.hintText,
		    hintText = _ref$hintText === undefined ? undefined : _ref$hintText,
		    _ref$id = _ref.id,
		    id = _ref$id === undefined ? undefined : _ref$id,
		    _ref$onChange = _ref.onChange,
		    onChange = _ref$onChange === undefined ? undefined : _ref$onChange;

		this.state.allItems = items;
		this.state.onChange = onChange;
		this._id = id ? id : 'preact-material-autocompleter-id';

		var suggestions = void 0;
		if (this.state.relevantItems.length > 0) suggestions = this.state.relevantItems.map(function (i) {
			return _this2._createItem(i);
		});else if (allowAddNewItems) suggestions = Object(preact_min["h"])(
			'div',
			{ onClick: this.addNewCategory },
			_ref2
		);else suggestions = _ref3;

		return Object(preact_min["h"])(
			'div',
			{ className: className, 'class': className },
			Object(preact_min["h"])(
				'div',
				{ className: 'autocomplete', 'class': 'autocomplete' },
				Object(preact_min["h"])(TextField_default.a, { id: this._id, label: hintText,
					onInput: this._onInput,
					onfocusin: this.start, value: this.state.currentInput, onfocusout: function onfocusout(e) {
						return _this2.abort();
					}
				}),
				Object(preact_min["h"])(
					'div',
					{ className: ['autocomplete-items', this.state.autocompleting ? 'active' : ''].join(' '),
						'class': ['autocomplete-items', this.state.autocompleting ? 'active' : ''].join(' ') },
					suggestions
				)
			)
		);
	};

	return Index;
}(preact_min["Component"]);


// EXTERNAL MODULE: ../node_modules/linkstate/dist/linkstate.es.js
var linkstate_es = __webpack_require__("CSCC");

// EXTERNAL MODULE: ./components/toast.js
var toast = __webpack_require__("r33O");

// CONCATENATED MODULE: ./routes/shopping/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return shopping_Shopping; });


function shopping__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function shopping__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function shopping__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var shopping__ref2 = Object(preact_min["h"])(
	Icon_default.a,
	null,
	'check_box_outline_blank'
);

var shopping__ref3 = Object(preact_min["h"])(
	Icon_default.a,
	null,
	'check_box'
);

var _ref4 = Object(preact_min["h"])(
	Dialog_default.a.FooterButton,
	{ cancel: true },
	'Annuller'
);

var _ref5 = Object(preact_min["h"])(
	Dialog_default.a.FooterButton,
	{ accept: true },
	'Gem'
);

var _ref6 = Object(preact_min["h"])(
	Fab_default.a.Icon,
	null,
	'add_shopping_cart'
);

var shopping_Shopping = function (_Component) {
	shopping__inherits(Shopping, _Component);

	function Shopping() {
		var _temp, _this, _ret;

		shopping__classCallCheck(this, Shopping);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = shopping__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			items: null,
			addNewItem: false,
			newName: '',
			itemNameId: 'item-name-field'
		}, _this.openEditMenu = function (ware) {
			_this.setState({
				addNewItem: false,
				editWare: ware,
				newName: ware.Name
			});
			_this.autoCompleter.setRecommendation(ware.Category);
			_this.addItemDlg.MDComponent.show();
		}, _this.openAddMenu = function () {
			_this.clearItemDialog();
			_this.state.addNewItem = true;
			_this.addItemDlg.MDComponent.show();
		}, _this.deleteItem = function (item) {
			Backend["a" /* default */].deleteShoppingItem(item).then(function () {
				Object(toast["a" /* default */])(item.Name + ' blev slettet');
				_this.setState({ upForDeletion: item });
			}).catch(function (e) {
				Object(toast["a" /* default */])(item.Name + ' kunne ikke slettes', e, 'error');
			});
		}, _this.createShoppingList = function () {
			if (!_this.state.items || _this.state.items.length === 0) return;

			var list = [];
			//Find all unique categories
			var categories = _this.state.items.map(function (i) {
				return i.Category;
			}).filter(function (v, i, a) {
				return a.indexOf(v) === i;
			});

			categories.forEach(function (c) {
				var wares = _this.state.items.filter(function (i) {
					return i.Category === c;
				});

				list.push(Object(preact_min["h"])(
					'div',
					null,
					Object(preact_min["h"])(
						'label',
						null,
						c
					),
					Object(preact_min["h"])(
						List_default.a,
						{ 'class': style_default.a.revertMargin, Avatar: true },
						_this.createListItems(c, wares)
					)
				));
			});
			return list;
		}, _this.clearItemDialog = function () {
			_this.autoCompleter.setRecommendation('');
			_this.setState({
				addNewItem: false,
				newName: '',
				editWare: undefined
			});
		}, _this.confirmItemDialog = function (e) {
			//TODO: Prevent dialog from hiding if errors
			var fd = new FormData();
			fd.append('name', _this.state.newName);
			fd.append('category', _this.autoCompleter.getRecommendation());
			if (_this.state.editWare) fd.append('id', _this.state.editWare.Id);

			if (_this.state.addNewItem) {
				Backend["a" /* default */].addShoppingListItem(fd).then(function (r) {
					_this.clearItemDialog();
					_this.setState({ items: _this.state.items.concat(r), editWare: undefined });
				}).catch(function (e) {
					Object(toast["a" /* default */])('Kunne ikke tilføje til indkøbslisten', e, 'error');
				});
			} else {
				Backend["a" /* default */].updateShoppingListItem(fd).then(function (r) {
					var newItems = _this.state.items.filter(function (i) {
						return i.Id !== _this.state.editWare.Id;
					}).concat(r);
					_this.setState({ items: newItems, editWare: undefined });
					_this.clearItemDialog();
				}).catch(function (e) {
					Object(toast["a" /* default */])('Kunne ikke opdatere punkt', e, 'error');
				});
			}
		}, _this.deleteItemMobile = function (e) {
			_this.deleteItem(_this.state.editWare);
			_this.clearItemDialog();
			_this.addItemDlg.MDComponent.close();
		}, _this.focusElement = function (e) {
			if (e.key === 'Enter') {
				e.preventDefault();
				_this.autoCompleter.focus();
			}
		}, _temp), shopping__possibleConstructorReturn(_this, _ret);
	}

	Shopping.prototype.componentWillMount = function componentWillMount() {
		var _this2 = this;

		Backend["a" /* default */].getShoppingListItems().then(function (i) {
			if (!i) i = [];
			_this2.setState({
				items: i
			});
		}).catch(function (e) {
			Object(toast["a" /* default */])('Indkøbslisten kunne ikke hentes', e, 'error');
		});
	};

	Shopping.prototype.createListItems = function createListItems(category, wares) {
		var _this3 = this;

		var wareList = [];

		var _loop = function _loop(ware) {
			if (ware === _this3.state.upForDeletion) {
				var item = Object(preact_min["h"])(ShoppingListItem["a" /* default */], { item: ware, className: style_default.a.delete });
				setTimeout(function () {
					_this3.setState({ items: _this3.state.items.filter(function (i) {
							return i.Id !== ware.Id;
						}), upForDeletion: undefined });
				}, 510);
				wareList.push(item);
			} else wareList.push(Object(preact_min["h"])(ShoppingListItem["a" /* default */], { item: ware, onEditItem: _this3.openEditMenu, category: category, onDelete: _this3.deleteItem }));
		};

		for (var _iterator = wares, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
			var _ref;

			if (_isArray) {
				if (_i >= _iterator.length) break;
				_ref = _iterator[_i++];
			} else {
				_i = _iterator.next();
				if (_i.done) break;
				_ref = _i.value;
			}

			var ware = _ref;

			_loop(ware);
		}
		return wareList;
	};

	Shopping.prototype.render = function render() {
		var _this4 = this;

		return Object(preact_min["h"])(
			'div',
			{ className: ['appContainer', style_default.a.scrollable].join(' ') },
			Object(preact_min["h"])(
				'h2',
				{ className: style_default.a.title },
				'Indk\xF8bsliste'
			),
			Object(preact_min["h"])(
				'div',
				{ className: ['mdc-typography--caption', style_default.a.description].join(' ') },
				Object(preact_min["h"])(
					'div',
					null,
					shopping__ref2,
					Object(preact_min["h"])(
						'span',
						{ className: style_default.a.alignIconCenter },
						': Varen er ikke tilf\xF8jet til listen.'
					)
				),
				Object(preact_min["h"])(
					'div',
					null,
					shopping__ref3,
					Object(preact_min["h"])(
						'span',
						{ className: style_default.a.alignIconCenter },
						': Varen er tilf\xF8jet til listen.'
					)
				)
			),
			this.createShoppingList(),
			Object(preact_min["h"])(
				Dialog_default.a,
				{ onAccept: this.confirmItemDialog, onCancel: this.clearItemDialog, ref: function ref(addItemDlg) {
						return _this4.addItemDlg = addItemDlg;
					} },
				Object(preact_min["h"])(
					Dialog_default.a.Header,
					null,
					this.state.addNewItem ? 'Tilføj til indkøbslisten' : 'Rediger indkøbslistepunkt'
				),
				Object(preact_min["h"])(
					Dialog_default.a.Body,
					{ className: style_default.a.centerChildren },
					Object(preact_min["h"])(TextField_default.a, { className: style_default.a.wideInputField, id: this.state.itemNameId,
						onInput: Object(linkstate_es["a" /* default */])(this, 'newName'), value: this.state.newName, label: 'Navn',
						onkeydown: this.focusElement, required: true
					}),
					Object(preact_min["h"])(preact_material_autocompleter_Index, { ref: function ref(ac) {
							return _this4.autoCompleter = ac;
						}, className: style_default.a.wideInputField, hintText: 'V\xE6lg en kategori', allowAddNewItems: true,
						items: this.state.items ? this.state.items.map(function (i) {
							return i.Category;
						}).filter(function (v, i, a) {
							return a.indexOf(v) === i;
						}) : []
					})
				),
				Object(preact_min["h"])(
					Dialog_default.a.Footer,
					null,
					Object(preact_min["h"])(
						Dialog_default.a.FooterButton,
						{ cancel: true, onClick: this.deleteItemMobile, className: [style_default.a.onlyMobile, style_default.a.left].join(' ') },
						'Slet'
					),
					_ref4,
					_ref5
				)
			),
			Object(preact_min["h"])(
				Fab_default.a,
				{ 'class': style_default.a.fabLowerRight, onClick: this.openAddMenu },
				_ref6
			)
		);
	};

	return Shopping;
}(preact_min["Component"]);



/***/ }),

/***/ "jGKv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _interopRequireDefault = __webpack_require__("SpGf");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Fab = exports.FabIcon = void 0;

var _createClass2 = _interopRequireDefault(__webpack_require__("P8NW"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("0fcM"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("0421"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("UJE0"));

var _inherits2 = _interopRequireDefault(__webpack_require__("d4H2"));

var _preact = __webpack_require__("KM04");

var _MaterialComponent2 = _interopRequireDefault(__webpack_require__("uc5p"));

var _Icon2 = _interopRequireDefault(__webpack_require__("MeGi"));

var _generateThemeClass = _interopRequireDefault(__webpack_require__("QTRl"));

var FabIcon =
/*#__PURE__*/
function (_Icon) {
  (0, _inherits2.default)(FabIcon, _Icon);

  function FabIcon() {
    var _this;

    (0, _classCallCheck2.default)(this, FabIcon);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FabIcon).apply(this, arguments));
    _this.componentName = 'fab__icon';
    return _this;
  }

  return FabIcon;
}(_Icon2.default);

exports.FabIcon = FabIcon;

var Fab =
/*#__PURE__*/
function (_MaterialComponent) {
  (0, _inherits2.default)(Fab, _MaterialComponent);

  function Fab() {
    var _this2;

    (0, _classCallCheck2.default)(this, Fab);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Fab).apply(this, arguments));
    _this2.componentName = 'fab';
    _this2.mdcProps = ['mini', 'exited'];
    _this2.themeProps = ['primary', 'secondary'];
    return _this2;
  }

  (0, _createClass2.default)(Fab, [{
    key: "materialDom",
    value: function materialDom(props) {
      var classNames = [];
      this.themeProps.forEach(function (themeProp) {
        if (themeProp in props && props[themeProp] !== false) {
          classNames.push((0, _generateThemeClass.default)(themeProp));
        }
      });
      return (0, _preact.h)("button", _extends({
        ref: this.setControlRef
      }, props, {
        className: classNames.join(' ')
      }), props.children);
    }
  }]);
  return Fab;
}(_MaterialComponent2.default);

exports.Fab = Fab;

var default_1 =
/*#__PURE__*/
function (_Fab) {
  (0, _inherits2.default)(default_1, _Fab);

  function default_1() {
    (0, _classCallCheck2.default)(this, default_1);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(default_1).apply(this, arguments));
  }

  return default_1;
}(Fab);

exports.default = default_1;
default_1.Icon = FabIcon;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "nbQo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShoppingListItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_material_components_List__ = __webpack_require__("E7XR");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_material_components_List___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact_material_components_List__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__("PKvf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_preact_material_components_Icon__ = __webpack_require__("MeGi");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_preact_material_components_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_preact_material_components_Icon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_preact_material_components_Icon_style_css__ = __webpack_require__("2aJM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_preact_material_components_Icon_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_preact_material_components_Icon_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Backend__ = __webpack_require__("GNty");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var checkboxIcons = {
	checked: 'check_box',
	unchecked: 'check_box_outline_blank'
};
var editHoldTime = 1000;

var ShoppingListItem = function (_Component) {
	_inherits(ShoppingListItem, _Component);

	function ShoppingListItem() {
		var _temp, _this, _ret;

		_classCallCheck(this, ShoppingListItem);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			listItemIcon: 'fastfood',
			editTimer: null
		}, _this.editTimer = null, _this.toggleListItemTick = function (e) {
			var active = !_this.state.item.Active;
			__WEBPACK_IMPORTED_MODULE_5__Backend__["a" /* default */].setShoppingItemState(_this.state.item, active).then(function (i) {
				_this.state.item.Active = active;
				_this.setState({ item: _this.state.item });
			});
		}, _this.startEditTimer = function () {
			_this.editTimer = setTimeout(function () {
				_this.editTimer = null;
				_this.openEdit();
			}, editHoldTime);
		}, _this.abortEditTimer = function () {
			var takeAction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			return function (e) {
				if (_this.editTimer) {
					clearTimeout(_this.editTimer);
					_this.editTimer = null;
					if (takeAction) _this.toggleListItemTick();
				}
			};
		}, _this.openEdit = function (e) {
			if (e) e.stopPropagation();
			_this.onEditItem(_this.state.item);
		}, _this.removeFromList = function (e) {
			e.stopPropagation();
			__WEBPACK_IMPORTED_MODULE_5__Backend__["a" /* default */].deleteShoppingItem(_this.state.item).then(function () {
				_this.onDelete(_this.state.item);
			}).catch(function (e) {
				//App.Snackbar.MDComponent.show({message: e});
			});
		}, _this.clickHandler = function () {
			return (/Mobi|Android/i.test(navigator.userAgent) ? undefined : _this.toggleListItemTick
			);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	//TODO: Check if user swipes, cancel timeout if so

	ShoppingListItem.prototype.render = function render(_ref) {
		var item = _ref.item,
		    onEditItem = _ref.onEditItem,
		    category = _ref.category,
		    onDelete = _ref.onDelete,
		    className = _ref.className;

		var checkBoxIcon = checkboxIcons.unchecked;
		this.onEditItem = onEditItem;
		this.onDelete = onDelete;
		this.state.item = item;
		this.state.category = category;
		if (item.Active) checkBoxIcon = checkboxIcons.checked;

		return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			__WEBPACK_IMPORTED_MODULE_1_preact_material_components_List___default.a.Item,
			{ className: [__WEBPACK_IMPORTED_MODULE_2__style_css___default.a.shoppingListItem, className].join(' '), onClick: this.clickHandler(), ontouchstart: this.startEditTimer,
				ontouchmove: this.abortEditTimer(), ontouchend: this.abortEditTimer(true)
			},
			Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				__WEBPACK_IMPORTED_MODULE_1_preact_material_components_List___default.a.ItemGraphic,
				null,
				this.state.listItemIcon
			),
			Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'span',
				null,
				this.state.item.Name
			),
			Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'span',
				{ className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.listEndCenter },
				Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					__WEBPACK_IMPORTED_MODULE_3_preact_material_components_Icon___default.a,
					{ className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.checkbox },
					checkBoxIcon
				),
				Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					__WEBPACK_IMPORTED_MODULE_3_preact_material_components_Icon___default.a,
					{ className: [__WEBPACK_IMPORTED_MODULE_2__style_css___default.a.onlyDesktop, __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.primaryOnHover].join(' '), onClick: this.openEdit },
					'edit'
				),
				Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					__WEBPACK_IMPORTED_MODULE_3_preact_material_components_Icon___default.a,
					{ className: [__WEBPACK_IMPORTED_MODULE_2__style_css___default.a.onlyDesktop, __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.primaryOnHover].join(' '), onClick: this.removeFromList },
					'delete_forever'
				)
			)
		);
	};

	return ShoppingListItem;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "ySUw":
/***/ (function(module, exports, __webpack_require__) {

var tabbable = __webpack_require__("TO+D");

var listeningFocusTrap = null;

function focusTrap(element, userOptions) {
  var tabbableNodes = [];
  var firstTabbableNode = null;
  var lastTabbableNode = null;
  var nodeFocusedBeforeActivation = null;
  var active = false;
  var paused = false;
  var tabEvent = null;

  var container = typeof element === 'string' ? document.querySelector(element) : element;

  var config = userOptions || {};
  config.returnFocusOnDeactivate = userOptions && userOptions.returnFocusOnDeactivate !== undefined ? userOptions.returnFocusOnDeactivate : true;
  config.escapeDeactivates = userOptions && userOptions.escapeDeactivates !== undefined ? userOptions.escapeDeactivates : true;

  var trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause
  };

  return trap;

  function activate(activateOptions) {
    if (active) return;

    var defaultedActivateOptions = {
      onActivate: activateOptions && activateOptions.onActivate !== undefined ? activateOptions.onActivate : config.onActivate
    };

    active = true;
    paused = false;
    nodeFocusedBeforeActivation = document.activeElement;

    if (defaultedActivateOptions.onActivate) {
      defaultedActivateOptions.onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!active) return;

    var defaultedDeactivateOptions = {
      returnFocus: deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate,
      onDeactivate: deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate
    };

    removeListeners();

    if (defaultedDeactivateOptions.onDeactivate) {
      defaultedDeactivateOptions.onDeactivate();
    }

    if (defaultedDeactivateOptions.returnFocus) {
      setTimeout(function () {
        tryFocus(nodeFocusedBeforeActivation);
      }, 0);
    }

    active = false;
    paused = false;
    return this;
  }

  function pause() {
    if (paused || !active) return;
    paused = true;
    removeListeners();
  }

  function unpause() {
    if (!paused || !active) return;
    paused = false;
    addListeners();
  }

  function addListeners() {
    if (!active) return;

    // There can be only one listening focus trap at a time
    if (listeningFocusTrap) {
      listeningFocusTrap.pause();
    }
    listeningFocusTrap = trap;

    updateTabbableNodes();
    // Ensure that the focused element doesn't capture the event that caused the focus trap activation
    setTimeout(function () {
      tryFocus(firstFocusNode());
    }, 0);
    document.addEventListener('focus', checkFocus, true);
    document.addEventListener('click', checkClick, true);
    document.addEventListener('mousedown', checkPointerDown, true);
    document.addEventListener('touchstart', checkPointerDown, true);
    document.addEventListener('keydown', checkKey, true);

    return trap;
  }

  function removeListeners() {
    if (!active || listeningFocusTrap !== trap) return;

    document.removeEventListener('focus', checkFocus, true);
    document.removeEventListener('click', checkClick, true);
    document.removeEventListener('mousedown', checkPointerDown, true);
    document.removeEventListener('touchstart', checkPointerDown, true);
    document.removeEventListener('keydown', checkKey, true);

    listeningFocusTrap = null;

    return trap;
  }

  function getNodeForOption(optionName) {
    var optionValue = config[optionName];
    var node = optionValue;
    if (!optionValue) {
      return null;
    }
    if (typeof optionValue === 'string') {
      node = document.querySelector(optionValue);
      if (!node) {
        throw new Error('`' + optionName + '` refers to no known node');
      }
    }
    if (typeof optionValue === 'function') {
      node = optionValue();
      if (!node) {
        throw new Error('`' + optionName + '` did not return a node');
      }
    }
    return node;
  }

  function firstFocusNode() {
    var node;
    if (getNodeForOption('initialFocus') !== null) {
      node = getNodeForOption('initialFocus');
    } else if (container.contains(document.activeElement)) {
      node = document.activeElement;
    } else {
      node = tabbableNodes[0] || getNodeForOption('fallbackFocus');
    }

    if (!node) {
      throw new Error('You can\'t have a focus-trap without at least one focusable element');
    }

    return node;
  }

  // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event
  function checkPointerDown(e) {
    if (config.clickOutsideDeactivates && !container.contains(e.target)) {
      deactivate({ returnFocus: false });
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function checkFocus(e) {
    if (container.contains(e.target)) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    // Checking for a blur method here resolves a Firefox issue (#15)
    if (typeof e.target.blur === 'function') e.target.blur();

    if (tabEvent) {
      readjustFocus(tabEvent);
    }
  }

  function checkKey(e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      handleTab(e);
    }

    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      deactivate();
    }
  }

  function handleTab(e) {
    updateTabbableNodes();

    if (e.target.hasAttribute('tabindex') && Number(e.target.getAttribute('tabindex')) < 0) {
      return tabEvent = e;
    }

    e.preventDefault();
    var currentFocusIndex = tabbableNodes.indexOf(e.target);

    if (e.shiftKey) {
      if (e.target === firstTabbableNode || tabbableNodes.indexOf(e.target) === -1) {
        return tryFocus(lastTabbableNode);
      }
      return tryFocus(tabbableNodes[currentFocusIndex - 1]);
    }

    if (e.target === lastTabbableNode) return tryFocus(firstTabbableNode);

    tryFocus(tabbableNodes[currentFocusIndex + 1]);
  }

  function updateTabbableNodes() {
    tabbableNodes = tabbable(container);
    firstTabbableNode = tabbableNodes[0];
    lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
  }

  function readjustFocus(e) {
    if (e.shiftKey) return tryFocus(lastTabbableNode);

    tryFocus(firstTabbableNode);
  }
}

function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
}

function tryFocus(node) {
  if (!node || !node.focus) return;
  if (node === document.activeElement) return;

  node.focus();
  if (node.tagName.toLowerCase() === 'input') {
    node.select();
  }
}

module.exports = focusTrap;

/***/ })

};;
//# sourceMappingURL=0.chunk.2f3b9.js.map