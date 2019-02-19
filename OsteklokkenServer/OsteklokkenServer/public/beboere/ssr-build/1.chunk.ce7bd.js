exports.ids = [1];
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

/***/ "ChkW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"media":"media__2xH3U","actionIcon":"actionIcon__1Tl_C","like":"like__3Y1gi","dislike":"dislike__3dr_o","pb-0":"pb-0__3wAY3","mb-0":"mb-0__21CDa","delete":"delete__2sUOt","shrink":"shrink__1Talw","fabLowerRight":"fabLowerRight__1JPTY","listEndCenter":"listEndCenter__31dbr","shoppingListItem":"shoppingListItem__388kQ","revertMargin":"revertMargin__39qWK","primaryOnHover":"primaryOnHover__VAPut","mdc-theme--dark":"mdc-theme--dark__2tFqz","wideInputField":"wideInputField__wErw_","addCategoryIcon":"addCategoryIcon__1-zyz","centerChildren":"centerChildren__2ef-T","onlyDesktop":"onlyDesktop__2b50w","onlyMobile":"onlyMobile__2c-VR","left":"left__3fCio","cardBody":"cardBody__3ApWS","menuDetails":"menuDetails__3ZqHW","scollable":"scollable__3jwrw","cardHeader":"cardHeader__1PqxI"};

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

/***/ "jc6z":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Card/index.js
var Card = __webpack_require__("sJaT");
var Card_default = /*#__PURE__*/__webpack_require__.n(Card);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Card/style.css
var style = __webpack_require__("UlEV");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact-material-components/Button/style.css
var Button_style = __webpack_require__("aqQ4");
var Button_style_default = /*#__PURE__*/__webpack_require__.n(Button_style);

// EXTERNAL MODULE: ./routes/cooking/style.css
var cooking_style = __webpack_require__("ChkW");
var cooking_style_default = /*#__PURE__*/__webpack_require__.n(cooking_style);

// EXTERNAL MODULE: ./Backend.js
var Backend = __webpack_require__("GNty");

// EXTERNAL MODULE: ../node_modules/preact-material-components/Dialog/index.js
var Dialog = __webpack_require__("JtzT");
var Dialog_default = /*#__PURE__*/__webpack_require__.n(Dialog);

// EXTERNAL MODULE: ../node_modules/preact-material-components/TextField/index.js
var TextField = __webpack_require__("Cv2I");
var TextField_default = /*#__PURE__*/__webpack_require__.n(TextField);

// EXTERNAL MODULE: ../node_modules/linkstate/dist/linkstate.es.js
var linkstate_es = __webpack_require__("CSCC");

// EXTERNAL MODULE: ../node_modules/preact-material-components/Fab/index.js
var Fab = __webpack_require__("jGKv");
var Fab_default = /*#__PURE__*/__webpack_require__.n(Fab);

// EXTERNAL MODULE: ./components/toast.js
var toast = __webpack_require__("r33O");

// CONCATENATED MODULE: ./routes/cooking/CookingCard.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var _ref2 = Object(preact_min["h"])(
	'span',
	null,
	'Ret:'
);

var _ref3 = Object(preact_min["h"])(
	'span',
	null,
	'Tilberedt af:'
);

var CookingCard_CookingCard = function (_Component) {
	_inherits(CookingCard, _Component);

	function CookingCard() {
		_classCallCheck(this, CookingCard);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	CookingCard.prototype.render = function render(_ref) {
		var menu = _ref.menu,
		    className = _ref.className,
		    openEditMenu = _ref.openEditMenu,
		    deleteItem = _ref.deleteItem;

		return Object(preact_min["h"])(
			Card_default.a,
			{ className: className },
			Object(preact_min["h"])(
				'div',
				null,
				Object(preact_min["h"])(
					'h2',
					{ className: ' mdc-typography--title' },
					'Uge ',
					menu.Week
				)
			),
			Object(preact_min["h"])(
				'div',
				{ className: cooking_style_default.a.cardBody },
				Object(preact_min["h"])(
					'div',
					{ className: cooking_style_default.a.menuDetails },
					_ref2,
					Object(preact_min["h"])(
						'span',
						null,
						menu.Meal
					)
				),
				Object(preact_min["h"])(
					'div',
					{ className: cooking_style_default.a.menuDetails },
					_ref3,
					Object(preact_min["h"])(
						'span',
						null,
						menu.Chef
					)
				)
			),
			Object(preact_min["h"])(
				Card_default.a.Actions,
				null,
				Object(preact_min["h"])(
					Card_default.a.ActionIcons,
					null,
					Object(preact_min["h"])(
						Card_default.a.ActionIcon,
						{ className: cooking_style_default.a.actionIcon, onClick: openEditMenu },
						'edit'
					),
					Object(preact_min["h"])(
						Card_default.a.ActionIcon,
						{ className: cooking_style_default.a.actionIcon, onClick: deleteItem },
						'delete'
					)
				)
			)
		);
	};

	return CookingCard;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/shopping/ShoppingListItem.js
var ShoppingListItem = __webpack_require__("nbQo");

// CONCATENATED MODULE: ./routes/cooking/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cooking_Cooking; });


function cooking__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function cooking__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function cooking__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }















var cooking__ref = Object(preact_min["h"])(
	Dialog_default.a.Footer,
	null,
	Object(preact_min["h"])(
		Dialog_default.a.FooterButton,
		{ cancel: true },
		'Annuller'
	),
	Object(preact_min["h"])(
		Dialog_default.a.FooterButton,
		{ accept: true },
		'Gem'
	)
);

var cooking__ref2 = Object(preact_min["h"])(
	Fab_default.a.Icon,
	null,
	'add'
);

var cooking_Cooking = function (_Component) {
	cooking__inherits(Cooking, _Component);

	function Cooking() {
		var _temp, _this, _ret;

		cooking__classCallCheck(this, Cooking);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = cooking__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
			schedule: []
		}, _this.domIds = {
			dialogNameId: 'menu-dialog-name',
			dialogMealId: 'menu-dialog-meal',
			dialogWeek: 'menu-dialog-week'
		}, _this.openEditMenu = function (menu) {
			return function (e) {
				_this.setState({
					addNewItem: false,
					newChef: menu.Chef,
					newMeal: menu.Meal,
					newWeek: menu.Week
				});
				_this.addItemDlg.MDComponent.show();
			};
		}, _this.openAddMenu = function () {
			_this.clearItemDialog();
			_this.state.addNewItem = true;
			_this.addItemDlg.MDComponent.show();
		}, _this.deleteItem = function (menu) {
			return function () {
				Backend["a" /* default */].deleteMenuSchedule(menu).then(function () {
					Object(toast["a" /* default */])('Planen for uge ' + menu.Week + ' blev slettet');
					_this.setState({ upForDeletion: menu });
				}).catch(function (e) {
					Object(toast["a" /* default */])('Planen for uge ' + menu.Week + ' kunne ikke slettes', e, 'error');
				});
			};
		}, _this.clearItemDialog = function () {
			_this.setState({
				addNewItem: undefined,
				newMeal: '',
				newChef: '',
				newWeek: ''
			});
		}, _this.confirmMenuDialog = function (e) {
			//TODO: Prevent dialog from hiding if errors
			var fd = new FormData();
			fd.append('chef', _this.state.newChef);
			fd.append('meal', _this.state.newMeal);
			fd.append('week', _this.state.newWeek);

			if (_this.state.addNewItem) {
				Backend["a" /* default */].addMenuSchedule(fd).then(function (r) {
					_this.clearItemDialog();
					_this.setState({ schedule: _this.state.schedule.concat(r), editWare: undefined });
				}).catch(function (e) {
					Object(toast["a" /* default */])('Kunne ikke tilføje madplan', e, 'error');
				});
			} else {
				Backend["a" /* default */].updateMenuSchedule(fd).then(function (r) {
					var newItems = _this.state.schedule.filter(function (i) {
						return i.Week !== _this.state.newWeek;
					}).concat(r);
					_this.setState({ schedule: newItems, editWare: undefined });
					_this.clearItemDialog();
				}).catch(function (e) {
					Object(toast["a" /* default */])('Kunne ikke opdatere madplan', e, 'error');
				});
			}
		}, _this.focusOnEnter = function (id) {
			return function (e) {
				if (e.key === 'Enter') {
					e.preventDefault();
					document.getElementById(id).focus();
				}
			};
		}, _this.submitOnEnter = function (e) {
			if (e.key === 'Enter') {
				_this.confirmMenuDialog(e);
				_this.addItemDlg.MDComponent.close();
			}
		}, _temp), cooking__possibleConstructorReturn(_this, _ret);
	}

	Cooking.prototype.componentWillMount = function componentWillMount() {
		var _this2 = this;

		Backend["a" /* default */].getMenuSchedule().then(function (r) {
			_this2.setState({ schedule: r });
		}).catch(function (e) {
			Object(toast["a" /* default */])('Madplanen kunne ikke hentes', e, 'error');
		});
	};

	Cooking.prototype.render = function render() {
		var _this3 = this;

		return Object(preact_min["h"])(
			'div',
			{ className: ['appContainer', cooking_style_default.a.scollable].join(' ') },
			this.state.schedule.map(function (m) {
				if (m === _this3.state.upForDeletion) {
					var item = Object(preact_min["h"])(CookingCard_CookingCard, { className: cooking_style_default.a.delete, menu: m });
					setTimeout(function () {
						_this3.setState({ schedule: _this3.state.schedule.filter(function (i) {
								return i.Week !== m.Week;
							}), upForDeletion: undefined });
					}, 510);
					return item;
				}
				return Object(preact_min["h"])(CookingCard_CookingCard, { menu: m, openEditMenu: _this3.openEditMenu(m), deleteItem: _this3.deleteItem(m) });
			}),
			Object(preact_min["h"])(
				Dialog_default.a,
				{ onAccept: this.confirmMenuDialog, onCancel: this.clearItemDialog, ref: function ref(addItemDlg) {
						return _this3.addItemDlg = addItemDlg;
					} },
				Object(preact_min["h"])(
					Dialog_default.a.Header,
					null,
					this.state.addNewItem ? 'Tilføj en madplan' : 'Rediger en madplan'
				),
				Object(preact_min["h"])(
					Dialog_default.a.Body,
					{ className: cooking_style_default.a.centerChildren },
					Object(preact_min["h"])(TextField_default.a, { className: cooking_style_default.a.wideInputField, id: this.domIds.dialogNameId,
						onInput: Object(linkstate_es["a" /* default */])(this, 'newChef'), value: this.state.newChef, label: 'Lavet af',
						onkeydown: this.focusOnEnter(this.domIds.dialogMealId), required: true
					}),
					Object(preact_min["h"])(TextField_default.a, { className: cooking_style_default.a.wideInputField, id: this.domIds.dialogMealId,
						onInput: Object(linkstate_es["a" /* default */])(this, 'newMeal'), value: this.state.newMeal, label: 'Ret',
						onkeydown: this.focusOnEnter(this.domIds.dialogWeek), required: true
					}),
					Object(preact_min["h"])(TextField_default.a, { className: cooking_style_default.a.wideInputField, type: 'number', id: this.domIds.dialogWeek,
						onInput: Object(linkstate_es["a" /* default */])(this, 'newWeek'), value: this.state.newWeek, label: 'Uge Nummer',
						onkeydown: this.submitOnEnter, required: true
					})
				),
				cooking__ref
			),
			Object(preact_min["h"])(
				Fab_default.a,
				{ 'class': cooking_style_default.a.fabLowerRight, onClick: this.openAddMenu },
				cooking__ref2
			)
		);
	};

	return Cooking;
}(preact_min["Component"]);



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
//# sourceMappingURL=1.chunk.ce7bd.js.map