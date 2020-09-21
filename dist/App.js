/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/App.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_todoRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router/todoRouter */ \"./src/router/todoRouter.ts\");\n\n_router_todoRouter__WEBPACK_IMPORTED_MODULE_0__[\"todoRouter\"].load();\n\n\n//# sourceURL=webpack:///./src/App.ts?");

/***/ }),

/***/ "./src/_core/Component.ts":
/*!********************************!*\
  !*** ./src/_core/Component.ts ***!
  \********************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ \"./src/utils/index.ts\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n\n\nclass Component {\n    constructor($target, $props) {\n        this.$target = $target;\n        this.$props = $props;\n        this.$children = {};\n        this.render = () => {\n            this.$target.innerHTML = this.template();\n            this.buildChildren();\n            this.componentDidMount();\n        };\n        this.setup();\n    }\n    async setup() {\n        await this.componentInit();\n        this.$state = Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"observable\"])(this.$state || {});\n        this.setEvent();\n        Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"observe\"])(this.render);\n    }\n    buildChildren() {\n        Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"selectAllElement\"])('[data-component]', this.$target).forEach(target => {\n            const componentName = target.dataset.component;\n            const { constructor, props } = this.$children[componentName];\n            new constructor(target, props);\n        });\n    }\n    componentInit() { }\n    setEvent() { }\n    componentDidMount() { }\n    template() {\n        return '';\n    }\n    setState(payload) {\n        Object.entries(payload)\n            .forEach(([key, value]) => {\n            this.$state[key] = value;\n        });\n    }\n    addEvent(ref, eventType, callback) {\n        Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"addEventBubblingListener\"])(this.$target, `[data-ref=\"${ref}\"]`, eventType, callback);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/_core/Component.ts?");

/***/ }),

/***/ "./src/_core/Observer.ts":
/*!*******************************!*\
  !*** ./src/_core/Observer.ts ***!
  \*******************************/
/*! exports provided: observe, observableOfKey, observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"observe\", function() { return observe; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"observableOfKey\", function() { return observableOfKey; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"observable\", function() { return observable; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ \"./src/utils/index.ts\");\n\nlet currentObserver = null;\nconst observe = (observer) => {\n    currentObserver = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"debounceOneFrame\"])(observer);\n    observer();\n    currentObserver = null;\n};\nconst observableOfKey = (obj, key, defaultValue) => {\n    if (!obj)\n        return;\n    const observers = new Set();\n    let _value = defaultValue && typeof defaultValue === 'object'\n        ? observable(defaultValue)\n        : defaultValue;\n    Object.defineProperty(obj, key, {\n        enumerable: true,\n        configurable: true,\n        get() {\n            if (currentObserver)\n                observers.add(currentObserver);\n            return _value;\n        },\n        set(value) {\n            if (JSON.stringify(value) === JSON.stringify(_value))\n                return;\n            _value = value && typeof value === 'object'\n                ? observable(value)\n                : value;\n            observers.forEach(observer => observer());\n        },\n    });\n    return obj;\n};\nconst observable = (target) => (Object.entries(target)\n    .reduce((obj, [key, defaultValue]) => observableOfKey(obj, key, defaultValue), target));\n\n\n//# sourceURL=webpack:///./src/_core/Observer.ts?");

/***/ }),

/***/ "./src/_core/RestClient.ts":
/*!*********************************!*\
  !*** ./src/_core/RestClient.ts ***!
  \*********************************/
/*! exports provided: RestClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RestClient\", function() { return RestClient; });\nclass RestClient {\n    constructor(baseURL) {\n        this.baseURL = baseURL;\n    }\n    getUrlOf(uri) {\n        const slash = uri.indexOf('/') === 0 ? '' : '/';\n        return `${this.baseURL}${slash}${uri}`;\n    }\n    request(uri, method = \"GET\" /* GET */) {\n        return fetch(this.getUrlOf(uri), { method })\n            .then(response => response.json());\n    }\n    requestWithBody(uri, method, body) {\n        const headers = { 'Content-Type': 'application/json' };\n        const requestInit = { method, headers, body: JSON.stringify(body) };\n        return fetch(this.getUrlOf(uri), requestInit).then(response => response.json());\n    }\n    get(uri) {\n        return this.request(uri);\n    }\n    delete(uri) {\n        return this.request(uri, \"DELETE\" /* DELETE */);\n    }\n    post(uri, body) {\n        return this.requestWithBody(uri, \"POST\" /* POST */, body);\n    }\n    put(uri, body) {\n        return this.requestWithBody(uri, \"PUT\" /* PUT */, body);\n    }\n    patch(uri, body) {\n        return this.requestWithBody(uri, \"PATCH\" /* PATCH */, body);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/_core/RestClient.ts?");

/***/ }),

/***/ "./src/_core/Router.ts":
/*!*****************************!*\
  !*** ./src/_core/Router.ts ***!
  \*****************************/
/*! exports provided: Router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Router\", function() { return Router; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils */ \"./src/utils/index.ts\");\n\nconst Router = class {\n    constructor(callback) {\n        this.callback = callback;\n        this.$query = {};\n        window.onpopstate = () => this.load();\n    }\n    load() {\n        const uri = location.pathname.split('/').pop() || '';\n        this.$query = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"parseQuery\"])(location.search);\n        this.callback(uri);\n    }\n    push(uri) {\n        const query = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"parseQuery\"])(uri);\n        this.$query = query;\n        this.callback(uri);\n        history.pushState(query, '', uri);\n    }\n};\n\n\n//# sourceURL=webpack:///./src/_core/Router.ts?");

/***/ }),

/***/ "./src/_core/Store.ts":
/*!****************************!*\
  !*** ./src/_core/Store.ts ***!
  \****************************/
/*! exports provided: Store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Store\", function() { return Store; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n\nclass Store {\n    constructor({ state, getters = {}, mutations = {}, actions = {} }) {\n        this.$state = Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"observable\"])(state);\n        this.$getters = Object.entries(getters)\n            .reduce((getters, [key, getter]) => {\n            Object.defineProperty(getters, key, {\n                get: () => getter(this.$state)\n            });\n            return getters;\n        }, {});\n        this.mutations = mutations;\n        this.actions = actions;\n    }\n    commit(key, payload) {\n        this.mutations[key](this.$state, payload);\n    }\n    dispatch(key, payload) {\n        return this.actions[key]({\n            commit: (key, payload) => this.commit(key, payload),\n            dispatch: (key, payload) => this.dispatch(key, payload),\n            state: this.$state,\n        }, payload);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/_core/Store.ts?");

/***/ }),

/***/ "./src/_core/index.ts":
/*!****************************!*\
  !*** ./src/_core/index.ts ***!
  \****************************/
/*! exports provided: Component, RestClient, Router, Store, observe, observableOfKey, observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ \"./src/_core/Component.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return _Component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]; });\n\n/* harmony import */ var _RestClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RestClient */ \"./src/_core/RestClient.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"RestClient\", function() { return _RestClient__WEBPACK_IMPORTED_MODULE_1__[\"RestClient\"]; });\n\n/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Router */ \"./src/_core/Router.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Router\", function() { return _Router__WEBPACK_IMPORTED_MODULE_2__[\"Router\"]; });\n\n/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Store */ \"./src/_core/Store.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Store\", function() { return _Store__WEBPACK_IMPORTED_MODULE_3__[\"Store\"]; });\n\n/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Observer */ \"./src/_core/Observer.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"observe\", function() { return _Observer__WEBPACK_IMPORTED_MODULE_4__[\"observe\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"observableOfKey\", function() { return _Observer__WEBPACK_IMPORTED_MODULE_4__[\"observableOfKey\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"observable\", function() { return _Observer__WEBPACK_IMPORTED_MODULE_4__[\"observable\"]; });\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/_core/index.ts?");

/***/ }),

/***/ "./src/adapter/todoAdapter.ts":
/*!************************************!*\
  !*** ./src/adapter/todoAdapter.ts ***!
  \************************************/
/*! exports provided: todoAdapterURL, todoAdapterClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"todoAdapterURL\", function() { return todoAdapterURL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"todoAdapterClient\", function() { return todoAdapterClient; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n\nconst todoAdapterURL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';\nconst todoAdapterClient = new _core__WEBPACK_IMPORTED_MODULE_0__[\"RestClient\"](todoAdapterURL);\n\n\n//# sourceURL=webpack:///./src/adapter/todoAdapter.ts?");

/***/ }),

/***/ "./src/components/Team/TeamAppendForm.ts":
/*!***********************************************!*\
  !*** ./src/components/Team/TeamAppendForm.ts ***!
  \***********************************************/
/*! exports provided: TeamAppendForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TeamAppendForm\", function() { return TeamAppendForm; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store */ \"./src/store/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils */ \"./src/utils/index.ts\");\n\n\n\nconst TeamAppendForm = class extends _core__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    close() {\n        _store__WEBPACK_IMPORTED_MODULE_1__[\"teamStore\"].commit(_store__WEBPACK_IMPORTED_MODULE_1__[\"SET_OPENED_TEAM_APPEND_FORM\"], false);\n    }\n    async appendTeam(name) {\n        try {\n            await _store__WEBPACK_IMPORTED_MODULE_1__[\"teamStore\"].dispatch(_store__WEBPACK_IMPORTED_MODULE_1__[\"ADD_TEAM\"], name);\n            this.close();\n        }\n        catch (e) {\n            console.error(e);\n        }\n    }\n    template() {\n        const { openedAppendForm } = _store__WEBPACK_IMPORTED_MODULE_1__[\"teamStore\"].$state;\n        return openedAppendForm ? `\n      <div class=\"modal\" data-ref=\"close\">\n        <div class=\"modal-box\">\n          <button type=\"button\" class=\"modal-close-button\" data-ref=\"close\">×</button>\n          <h3 class=\"modal-title\">팀 추가하기</h3>\n          <form action=\"\" data-ref=\"append\">\n            <div class=\"appendForm\">\n              <input type=\"text\" data-ref=\"team-name\" />\n              <button type=\"submit\">추가하기</button>\n            </div>\n          </form>\n        </div>     \n      </div>\n    ` : '';\n    }\n    componentDidMount() {\n        if (!_store__WEBPACK_IMPORTED_MODULE_1__[\"teamStore\"].$state.openedAppendForm)\n            return;\n        const { $target } = this;\n        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"selectElement\"])('.modal-box', $target).addEventListener('click', event => {\n            const target = event.target;\n            if (target.closest('.modal-box')) {\n                event.stopPropagation();\n            }\n        });\n        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"selectElement\"])('input', $target).focus();\n    }\n    setEvent() {\n        this.addEvent('close', 'click', () => this.close());\n        this.addEvent('append', 'submit', e => {\n            e.preventDefault();\n            const teamName = Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"selectElement\"])('input', e.target).value;\n            this.appendTeam(teamName);\n        });\n        this.addEvent('team-name', 'keyup', ({ key, target }) => {\n            if (key === 'Escape')\n                this.close();\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/components/Team/TeamAppendForm.ts?");

/***/ }),

/***/ "./src/components/Team/TeamList.ts":
/*!*****************************************!*\
  !*** ./src/components/Team/TeamList.ts ***!
  \*****************************************/
/*! exports provided: TeamList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TeamList\", function() { return TeamList; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store */ \"./src/store/index.ts\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/router */ \"./src/router/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils */ \"./src/utils/index.ts\");\n\n\n\n\nconst TeamList = class extends _core__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    template() {\n        const { teams } = _store__WEBPACK_IMPORTED_MODULE_1__[\"teamStore\"].$state;\n        return `\n      ${teams.map(({ _id, name }) => `\n        <div class=\"team-card-container\" data-id=\"${_id}\">\n          <a href=\"#!\" class=\"card\" data-ref=\"view\">\n            <div class=\"card-title\">\n              ${name}\n            </div>\n          </a>\n        </div>\n      `).join('')}\n      \n      <div class=\"add-team-button-container\">\n        <button id=\"add-team-button\" class=\"ripple\" data-ref=\"add\">\n          <span class=\"material-icons\">add</span>\n        </button>\n      </div>\n    `;\n    }\n    setEvent() {\n        this.addEvent('view', 'click', event => {\n            event.preventDefault();\n            const id = Object(_utils__WEBPACK_IMPORTED_MODULE_3__[\"selectParent\"])('[data-id]', event.target).dataset.id;\n            _router__WEBPACK_IMPORTED_MODULE_2__[\"todoRouter\"].push(`./kanban.html?id=${id}`);\n        });\n        this.addEvent('add', 'click', () => {\n            _store__WEBPACK_IMPORTED_MODULE_1__[\"teamStore\"].commit(_store__WEBPACK_IMPORTED_MODULE_1__[\"SET_OPENED_TEAM_APPEND_FORM\"], true);\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/components/Team/TeamList.ts?");

/***/ }),

/***/ "./src/components/Todo/TodoHeader.ts":
/*!*******************************************!*\
  !*** ./src/components/Todo/TodoHeader.ts ***!
  \*******************************************/
/*! exports provided: TodoHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TodoHeader\", function() { return TodoHeader; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _store_todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store/todoOfTeamStore */ \"./src/store/todoOfTeamStore.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store */ \"./src/store/index.ts\");\n\n\n\nconst TodoHeader = class extends _core__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    template() {\n        const { name } = _store_todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].$state;\n        return name ? `\n        <span><strong>${name}</strong>'s Todo List</span>\n        <button type=\"button\" data-ref=\"removeMember\">⌫</button>\n    ` : '';\n    }\n    setEvent() {\n        this.addEvent('removeMember', 'click', () => {\n            if (!confirm('현재 팀을 삭제하시겠습니까?'))\n                return;\n            _store__WEBPACK_IMPORTED_MODULE_2__[\"teamStore\"].dispatch(_store__WEBPACK_IMPORTED_MODULE_2__[\"REMOVE_TEAM\"], _store_todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].$state._id);\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/components/Todo/TodoHeader.ts?");

/***/ }),

/***/ "./src/components/Todo/TodoItemAppender.ts":
/*!*************************************************!*\
  !*** ./src/components/Todo/TodoItemAppender.ts ***!
  \*************************************************/
/*! exports provided: TodoItemAppender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TodoItemAppender\", function() { return TodoItemAppender; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _store_todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store/todoOfTeamStore */ \"./src/store/todoOfTeamStore.ts\");\n\n\nconst TodoItemAppender = class extends _core__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    template() {\n        return `\n      <input class=\"new-todo\" placeholder=\"할 일을 입력해주세요.\" data-ref=\"appender\" autofocus />\n    `;\n    }\n    setEvent() {\n        this.addEvent('appender', 'keyup', ({ key, target }) => {\n            if (key === 'Enter') {\n                _store_todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].dispatch(_store_todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"ADD_ITEM\"], {\n                    memberId: this.$props.id,\n                    contents: target.value\n                });\n                target.value = '';\n            }\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/components/Todo/TodoItemAppender.ts?");

/***/ }),

/***/ "./src/components/Todo/TodoList.ts":
/*!*****************************************!*\
  !*** ./src/components/Todo/TodoList.ts ***!
  \*****************************************/
/*! exports provided: TodoList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TodoList\", function() { return TodoList; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store */ \"./src/store/index.ts\");\n/* harmony import */ var _TodoListFooter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoListFooter */ \"./src/components/Todo/TodoListFooter.ts\");\n/* harmony import */ var _TodoItemAppender__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TodoItemAppender */ \"./src/components/Todo/TodoItemAppender.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/constants */ \"./src/constants/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils */ \"./src/utils/index.ts\");\n\n\n\n\n\n\nconst sortByPriority = (priority) => priority === \"FIRST\" /* FIRST */ ? 1 :\n    priority === \"SECOND\" /* SECOND */ ? 2 : 3;\nconst TodoList = class extends _core__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    get id() {\n        return this.$props.id;\n    }\n    get member() {\n        return _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].$state.members[this.id];\n    }\n    get filterType() {\n        return _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].$state.filterType[this.id];\n    }\n    get filteredItems() {\n        const memberOfItem = _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].$getters.membersByFilteredTodoList;\n        const items = memberOfItem[this.id];\n        if (this.filterType === \"priority\" /* PRIORITY */) {\n            items.sort((a, b) => sortByPriority(a.priority) - sortByPriority(b.priority));\n        }\n        return items;\n    }\n    isEditingOf(id) {\n        return _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].$state.editing === id;\n    }\n    toggle(itemId) {\n        _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].dispatch(_store__WEBPACK_IMPORTED_MODULE_1__[\"TOGGLE_ITEM\"], { memberId: this.id, itemId });\n    }\n    remove(itemId) {\n        _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].dispatch(_store__WEBPACK_IMPORTED_MODULE_1__[\"DELETE_ITEM\"], { memberId: this.id, itemId });\n    }\n    removeMember() {\n        _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].dispatch(_store__WEBPACK_IMPORTED_MODULE_1__[\"DELETE_TEAM_MEMBER\"], this.id);\n    }\n    editing(itemId) {\n        _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].commit(_store__WEBPACK_IMPORTED_MODULE_1__[\"SET_EDITING\"], itemId);\n    }\n    edited(itemId, contents) {\n        _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].dispatch(_store__WEBPACK_IMPORTED_MODULE_1__[\"UPDATE_ITEM\"], { memberId: this.id, itemId, contents });\n        this.cancel();\n    }\n    cancel() {\n        _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].commit(_store__WEBPACK_IMPORTED_MODULE_1__[\"SET_EDITING\"], null);\n    }\n    updatePriority(itemId, priority) {\n        _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].dispatch(_store__WEBPACK_IMPORTED_MODULE_1__[\"UPDATE_ITEM_PRIORITY\"], { memberId: this.id, itemId, priority });\n    }\n    componentInit() {\n        const props = { id: this.id };\n        this.$children = {\n            TodoItemAppender: { constructor: _TodoItemAppender__WEBPACK_IMPORTED_MODULE_3__[\"TodoItemAppender\"], props },\n            TodoListFooter: { constructor: _TodoListFooter__WEBPACK_IMPORTED_MODULE_2__[\"TodoListFooter\"], props },\n        };\n    }\n    template() {\n        return `\n      <h2>\n        <span><strong>${this.member.name}</strong>'s Todo List</span>\n        <button type=\"button\" data-ref=\"removeMember\">⌫</button>\n      </h2>\n      <div class=\"todoapp\">\n        <section data-component=\"TodoItemAppender\" id=\"todo-item-appender\" class=\"input-container\"></section>\n        <section class=\"main\">\n          <ul class=\"todo-list\">\n            ${this.filteredItems.map(({ _id, isCompleted, priority, contents }) => `\n              <li class=\"todo-list-item ${isCompleted ? 'completed' : ''} ${this.isEditingOf(_id) ? 'editing' : ''}\" data-id=\"${_id}\">\n                <div class=\"view\">\n                  <input class=\"toggle\" type=\"checkbox\" data-ref=\"toggle\" ${isCompleted ? 'checked' : ''} />\n                  <label class=\"label\" data-ref=\"editing\">\n                    <div class=\"chip-container\">\n                      ${priority === \"NONE\" /* NONE */ ? `\n                        <select class=\"chip select\" data-ref=\"priority\">\n                          <option value=\"${\"NONE\" /* NONE */}\" selected>순위</option>\n                          <option value=\"${\"FIRST\" /* FIRST */}\">1순위</option>\n                          <option value=\"${\"SECOND\" /* SECOND */}\">2순위</option>\n                        </select>` : `\n                        <span class=\"chip ${Object(_constants__WEBPACK_IMPORTED_MODULE_4__[\"getPriorityChip\"])(priority)}\">${priority}순위</span>                        \n                      `}\n                    </div>\n                    ${contents}\n                  </label>\n                  <button class=\"destroy\" data-ref=\"delete\"></button>\n                </div>\n                <input class=\"edit\" value=\"${contents}\" data-ref=\"edited\" />\n              </li>\n            `).join('')}\n          </ul>\n        </section>\n        <div data-component=\"TodoListFooter\" id=\"todo-list-footer\" class=\"count-container\"></div>\n      </div>\n    `;\n    }\n    setEvent() {\n        const getId = (target) => Object(_utils__WEBPACK_IMPORTED_MODULE_5__[\"selectParent\"])('[data-id]', target).dataset.id;\n        this.addEvent('toggle', 'change', ({ target }) => {\n            this.toggle(getId(target));\n        });\n        this.addEvent('delete', 'click', ({ target }) => {\n            this.remove(getId(target));\n        });\n        this.addEvent('editing', 'dblclick', ({ target }) => {\n            this.editing(getId(target));\n        });\n        this.addEvent('edited', 'keypress', ({ key, target }) => {\n            if (key === 'Enter')\n                this.edited(getId(target), target.value);\n        });\n        this.addEvent('edited', 'keyup', e => {\n            const { key } = e;\n            if (key === 'Escape')\n                this.cancel();\n        });\n        this.addEvent('removeMember', 'click', () => {\n            if (!confirm('정말로 삭제하시겠습니까?'))\n                return;\n            this.removeMember();\n        });\n        this.addEvent('priority', 'change', ({ target }) => {\n            this.updatePriority(getId(target), target.value);\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/components/Todo/TodoList.ts?");

/***/ }),

/***/ "./src/components/Todo/TodoListFooter.ts":
/*!***********************************************!*\
  !*** ./src/components/Todo/TodoListFooter.ts ***!
  \***********************************************/
/*! exports provided: TodoListFooter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TodoListFooter\", function() { return TodoListFooter; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store */ \"./src/store/index.ts\");\n\n\nconst filterButtons = {\n    [\"all\" /* ALL */]: '전체보기',\n    [\"priority\" /* PRIORITY */]: '우선 순위',\n    [\"active\" /* ACTIVE */]: '해야할 일',\n    [\"completed\" /* COMPLETED */]: '완료한 일',\n};\nconst TodoListFooter = class extends _core__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    get id() {\n        return this.$props.id;\n    }\n    get filterType() {\n        return _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].$state.filterType[this.id];\n    }\n    get filteredCount() {\n        const memberOfItem = _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].$getters.membersByFilteredTodoList;\n        return memberOfItem[this.id].length;\n    }\n    template() {\n        return `\n      <span class=\"todo-count\">총 <strong>${this.filteredCount}</strong> 개</span>\n      <ul class=\"filters\">\n        ${Object.entries(filterButtons).map(([type, text]) => `\n          <li>\n            <a href=\"#\" ${this.filterType === type ? ' class=\"selected\"' : ''} data-filter-type=\"${type}\" data-ref=\"filter\">${text}</a>\n          </li>\n        `).join('')}\n      </ul>\n      <button class=\"clear-completed\" data-ref=\"delete-all\">모두 삭제</button>\n    `;\n    }\n    setEvent() {\n        this.addEvent('filter', 'click', event => {\n            event.preventDefault();\n            _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].commit(_store__WEBPACK_IMPORTED_MODULE_1__[\"SET_FILTER_TYPE\"], {\n                memberId: this.id,\n                filterType: event.target.dataset.filterType\n            });\n        });\n        this.addEvent('delete-all', 'click', event => {\n            event.preventDefault();\n            _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].dispatch(_store__WEBPACK_IMPORTED_MODULE_1__[\"DELETE_ALL_ITEM\"], this.id);\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/components/Todo/TodoListFooter.ts?");

/***/ }),

/***/ "./src/components/Todo/TodoListOfTeam.ts":
/*!***********************************************!*\
  !*** ./src/components/Todo/TodoListOfTeam.ts ***!
  \***********************************************/
/*! exports provided: TodoListOfTeam */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TodoListOfTeam\", function() { return TodoListOfTeam; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _TodoMemberAppender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodoMemberAppender */ \"./src/components/Todo/TodoMemberAppender.ts\");\n/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoList */ \"./src/components/Todo/TodoList.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/store */ \"./src/store/index.ts\");\n\n\n\n\nconst TodoListOfTeam = class extends _core__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    get ids() {\n        return Object.keys(_store__WEBPACK_IMPORTED_MODULE_3__[\"todoOfTeamStore\"].$state.members);\n    }\n    componentInit() {\n        this.$children = {\n            TodoMemberAppender: { constructor: _TodoMemberAppender__WEBPACK_IMPORTED_MODULE_1__[\"TodoMemberAppender\"] },\n            ...this.ids.reduce((obj, id) => {\n                obj[`TodoList-${id}`] = {\n                    constructor: _TodoList__WEBPACK_IMPORTED_MODULE_2__[\"TodoList\"],\n                    props: { id },\n                };\n                return obj;\n            }, {})\n        };\n    }\n    template() {\n        return `\n      ${this.ids.map(id => `\n        <li data-component=\"TodoList-${id}\" class=\"todoapp-container\"></li>\n      `).join('')}\n      <li id=\"todo-member-appender\" data-component=\"TodoMemberAppender\" class=\"add-user-button-container\"></li>\n    `;\n    }\n};\n\n\n//# sourceURL=webpack:///./src/components/Todo/TodoListOfTeam.ts?");

/***/ }),

/***/ "./src/components/Todo/TodoMemberAppendForm.ts":
/*!*****************************************************!*\
  !*** ./src/components/Todo/TodoMemberAppendForm.ts ***!
  \*****************************************************/
/*! exports provided: TodoMemberAppendForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TodoMemberAppendForm\", function() { return TodoMemberAppendForm; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store */ \"./src/store/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils */ \"./src/utils/index.ts\");\n\n\n\nconst TodoMemberAppendForm = class extends _core__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    close() {\n        _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].commit(_store__WEBPACK_IMPORTED_MODULE_1__[\"SET_OPENED_MEMBER_APPEND_FORM\"], false);\n    }\n    async appendMember(name) {\n        try {\n            await _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].dispatch(_store__WEBPACK_IMPORTED_MODULE_1__[\"ADD_TEAM_MEMBER\"], name);\n            this.close();\n        }\n        catch (e) {\n            console.error(e);\n        }\n    }\n    template() {\n        const { openedAppendForm } = _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].$state;\n        return openedAppendForm ? `\n      <div class=\"modal\" data-ref=\"close\">\n        <div class=\"modal-box\">\n          <button type=\"button\" class=\"modal-close-button\" data-ref=\"close\">×</button>\n          <h3 class=\"modal-title\">멤버 추가하기</h3>\n          <form action=\"\" data-ref=\"append\">\n            <div class=\"appendForm\">\n              <input type=\"text\" data-ref=\"member-name\" />\n              <button type=\"submit\">추가하기</button>\n            </div>\n          </form>\n        </div>\n      </div>\n    ` : '';\n    }\n    componentDidMount() {\n        if (!_store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].$state.openedAppendForm)\n            return;\n        const { $target } = this;\n        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"selectElement\"])('.modal-box', $target).addEventListener('click', e => e.stopPropagation());\n        Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"selectElement\"])('input', $target).focus();\n    }\n    setEvent() {\n        this.addEvent('close', 'click', () => this.close());\n        this.addEvent('append', 'submit', e => {\n            e.preventDefault();\n            const memberName = Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"selectElement\"])('input', e.target).value;\n            this.appendMember(memberName);\n        });\n        this.addEvent('member-name', 'keyup', ({ key, target }) => {\n            if (key === 'Escape')\n                this.close();\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/components/Todo/TodoMemberAppendForm.ts?");

/***/ }),

/***/ "./src/components/Todo/TodoMemberAppender.ts":
/*!***************************************************!*\
  !*** ./src/components/Todo/TodoMemberAppender.ts ***!
  \***************************************************/
/*! exports provided: TodoMemberAppender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TodoMemberAppender\", function() { return TodoMemberAppender; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/store */ \"./src/store/index.ts\");\n\n\nconst TodoMemberAppender = class extends _core__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    template() {\n        return `\n      <button id=\"add-user-button\" class=\"ripple\" data-ref=\"append\">\n        <span class=\"material-icons\">add</span>\n      </button>\n    `;\n    }\n    setEvent() {\n        this.addEvent('append', 'click', () => _store__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"].commit(_store__WEBPACK_IMPORTED_MODULE_1__[\"SET_OPENED_MEMBER_APPEND_FORM\"], true));\n    }\n};\n\n\n//# sourceURL=webpack:///./src/components/Todo/TodoMemberAppender.ts?");

/***/ }),

/***/ "./src/constants/index.ts":
/*!********************************!*\
  !*** ./src/constants/index.ts ***!
  \********************************/
/*! exports provided: getPriorityChip, ONE_FRAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPriorityChip\", function() { return getPriorityChip; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ONE_FRAME\", function() { return ONE_FRAME; });\nconst getPriorityChip = (priority) => {\n    return priority === \"FIRST\" /* FIRST */ ? 'primary' :\n        priority === \"SECOND\" /* SECOND */ ? 'secondary' :\n            priority === \"NONE\" /* NONE */ ? 'none' :\n                '';\n};\nconst ONE_FRAME = 1000 / 60;\n\n\n//# sourceURL=webpack:///./src/constants/index.ts?");

/***/ }),

/***/ "./src/router/index.ts":
/*!*****************************!*\
  !*** ./src/router/index.ts ***!
  \*****************************/
/*! exports provided: todoRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todoRouter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoRouter */ \"./src/router/todoRouter.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"todoRouter\", function() { return _todoRouter__WEBPACK_IMPORTED_MODULE_0__[\"todoRouter\"]; });\n\n\n\n\n//# sourceURL=webpack:///./src/router/index.ts?");

/***/ }),

/***/ "./src/router/todoRouter.ts":
/*!**********************************!*\
  !*** ./src/router/todoRouter.ts ***!
  \**********************************/
/*! exports provided: todoRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"todoRouter\", function() { return todoRouter; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/views */ \"./src/views/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils */ \"./src/utils/index.ts\");\n\n\n\nconst $app = Object(_utils__WEBPACK_IMPORTED_MODULE_2__[\"selectElement\"])('#app');\nconst todoRouter = new _core__WEBPACK_IMPORTED_MODULE_0__[\"Router\"]((uri) => {\n    if (uri.includes('kanban')) {\n        return new _views__WEBPACK_IMPORTED_MODULE_1__[\"Kanban\"]($app);\n    }\n    return new _views__WEBPACK_IMPORTED_MODULE_1__[\"Team\"]($app);\n});\n\n\n//# sourceURL=webpack:///./src/router/todoRouter.ts?");

/***/ }),

/***/ "./src/services/TeamService.ts":
/*!*************************************!*\
  !*** ./src/services/TeamService.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/adapter/todoAdapter */ \"./src/adapter/todoAdapter.ts\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object.freeze({\n    fetchTeams() {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].get('/teams');\n    },\n    fetchTeam(teamId) {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].get(`/teams/${teamId}`);\n    },\n    addTeam(name) {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].post(`/teams`, { name });\n    },\n    addTeamMember(teamId, name) {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].post(`/teams/${teamId}/members`, { name });\n    },\n    deleteTeam(teamId) {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].delete(`/teams/${teamId}`);\n    },\n    deleteTeamMember(teamId, memberId) {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].delete(`/teams/${teamId}/members/${memberId}`);\n    },\n}));\n\n\n//# sourceURL=webpack:///./src/services/TeamService.ts?");

/***/ }),

/***/ "./src/services/TodoService.ts":
/*!*************************************!*\
  !*** ./src/services/TodoService.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/adapter/todoAdapter */ \"./src/adapter/todoAdapter.ts\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object.freeze({\n    fetchTodoList({ teamId, memberId }) {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].get(`/teams/${teamId}/members/${memberId}`);\n    },\n    addItem({ teamId, memberId, contents }) {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].post(`/teams/${teamId}/members/${memberId}/items`, { contents });\n    },\n    toggleItem({ teamId, memberId, itemId }) {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].put(`/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`);\n    },\n    updateItem({ teamId, memberId, itemId, contents }) {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].put(`/teams/${teamId}/members/${memberId}/items/${itemId}`, { contents });\n    },\n    updateItemPriority({ teamId, memberId, itemId, priority }) {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].put(`/teams/${teamId}/membersZ/${memberId}/items/${itemId}/priority`, { priority });\n    },\n    deleteItem({ teamId, memberId, itemId }) {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].delete(`/teams/${teamId}/members/${memberId}/items/${itemId}`);\n    },\n    deleteAllItem({ teamId, memberId }) {\n        return _adapter_todoAdapter__WEBPACK_IMPORTED_MODULE_0__[\"todoAdapterClient\"].delete(`/teams/${teamId}/members/${memberId}/items`);\n    },\n}));\n\n\n//# sourceURL=webpack:///./src/services/TodoService.ts?");

/***/ }),

/***/ "./src/services/index.ts":
/*!*******************************!*\
  !*** ./src/services/index.ts ***!
  \*******************************/
/*! exports provided: TeamService, TodoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TeamService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TeamService */ \"./src/services/TeamService.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TeamService\", function() { return _TeamService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _TodoService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodoService */ \"./src/services/TodoService.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TodoService\", function() { return _TodoService__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///./src/services/index.ts?");

/***/ }),

/***/ "./src/store/index.ts":
/*!****************************!*\
  !*** ./src/store/index.ts ***!
  \****************************/
/*! exports provided: SET_TEAMS, SET_OPENED_TEAM_APPEND_FORM, FETCH_TEAMS, ADD_TEAM, REMOVE_TEAM, teamStore, INIT, SET_TODO_LIST, SET_EDITING, SET_FILTER_TYPE, SET_OPENED_MEMBER_APPEND_FORM, FETCH_TEAM, FETCH_TODO_LIST, ADD_ITEM, ADD_TEAM_MEMBER, TOGGLE_ITEM, UPDATE_ITEM, UPDATE_ITEM_PRIORITY, DELETE_ITEM, DELETE_ALL_ITEM, DELETE_TEAM_MEMBER, todoOfTeamStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _teamStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./teamStore */ \"./src/store/teamStore.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SET_TEAMS\", function() { return _teamStore__WEBPACK_IMPORTED_MODULE_0__[\"SET_TEAMS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SET_OPENED_TEAM_APPEND_FORM\", function() { return _teamStore__WEBPACK_IMPORTED_MODULE_0__[\"SET_OPENED_TEAM_APPEND_FORM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FETCH_TEAMS\", function() { return _teamStore__WEBPACK_IMPORTED_MODULE_0__[\"FETCH_TEAMS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ADD_TEAM\", function() { return _teamStore__WEBPACK_IMPORTED_MODULE_0__[\"ADD_TEAM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"REMOVE_TEAM\", function() { return _teamStore__WEBPACK_IMPORTED_MODULE_0__[\"REMOVE_TEAM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"teamStore\", function() { return _teamStore__WEBPACK_IMPORTED_MODULE_0__[\"teamStore\"]; });\n\n/* harmony import */ var _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todoOfTeamStore */ \"./src/store/todoOfTeamStore.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"INIT\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"INIT\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SET_TODO_LIST\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"SET_TODO_LIST\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SET_EDITING\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"SET_EDITING\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SET_FILTER_TYPE\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"SET_FILTER_TYPE\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SET_OPENED_MEMBER_APPEND_FORM\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"SET_OPENED_MEMBER_APPEND_FORM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FETCH_TEAM\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"FETCH_TEAM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"FETCH_TODO_LIST\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"FETCH_TODO_LIST\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ADD_ITEM\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"ADD_ITEM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ADD_TEAM_MEMBER\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"ADD_TEAM_MEMBER\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TOGGLE_ITEM\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"TOGGLE_ITEM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_ITEM\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"UPDATE_ITEM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_ITEM_PRIORITY\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"UPDATE_ITEM_PRIORITY\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"DELETE_ITEM\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"DELETE_ITEM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"DELETE_ALL_ITEM\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"DELETE_ALL_ITEM\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"DELETE_TEAM_MEMBER\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"DELETE_TEAM_MEMBER\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"todoOfTeamStore\", function() { return _todoOfTeamStore__WEBPACK_IMPORTED_MODULE_1__[\"todoOfTeamStore\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///./src/store/index.ts?");

/***/ }),

/***/ "./src/store/teamStore.ts":
/*!********************************!*\
  !*** ./src/store/teamStore.ts ***!
  \********************************/
/*! exports provided: SET_TEAMS, SET_OPENED_TEAM_APPEND_FORM, FETCH_TEAMS, ADD_TEAM, REMOVE_TEAM, teamStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_TEAMS\", function() { return SET_TEAMS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_OPENED_TEAM_APPEND_FORM\", function() { return SET_OPENED_TEAM_APPEND_FORM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FETCH_TEAMS\", function() { return FETCH_TEAMS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_TEAM\", function() { return ADD_TEAM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REMOVE_TEAM\", function() { return REMOVE_TEAM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"teamStore\", function() { return teamStore; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services */ \"./src/services/index.ts\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/router */ \"./src/router/index.ts\");\n\n\n\nconst SET_TEAMS = 'SET_TEAMS';\nconst SET_OPENED_TEAM_APPEND_FORM = 'SET_OPENED_TEAM_APPEND_FORM';\nconst FETCH_TEAMS = 'FETCH_TEAMS';\nconst ADD_TEAM = 'ADD_TEAM';\nconst REMOVE_TEAM = 'REMOVE_TEAM';\nconst teamStore = new _core__WEBPACK_IMPORTED_MODULE_0__[\"Store\"]({\n    state: {\n        teams: [],\n        openedAppendForm: false,\n    },\n    mutations: {\n        [SET_TEAMS](state, teams) {\n            state.teams = teams;\n        },\n        [SET_OPENED_TEAM_APPEND_FORM](state, openedAppendForm) {\n            state.openedAppendForm = openedAppendForm;\n        },\n    },\n    actions: {\n        async [FETCH_TEAMS]({ commit }) {\n            commit(SET_TEAMS, await _services__WEBPACK_IMPORTED_MODULE_1__[\"TeamService\"].fetchTeams());\n        },\n        async [ADD_TEAM]({ dispatch }, name) {\n            await _services__WEBPACK_IMPORTED_MODULE_1__[\"TeamService\"].addTeam(name);\n            return dispatch(FETCH_TEAMS);\n        },\n        async [REMOVE_TEAM]({ dispatch }, teamId) {\n            await _services__WEBPACK_IMPORTED_MODULE_1__[\"TeamService\"].deleteTeam(teamId);\n            alert('삭제되었습니다.');\n            _router__WEBPACK_IMPORTED_MODULE_2__[\"todoRouter\"].push('./');\n        },\n    },\n});\n\n\n//# sourceURL=webpack:///./src/store/teamStore.ts?");

/***/ }),

/***/ "./src/store/todoOfTeamStore.ts":
/*!**************************************!*\
  !*** ./src/store/todoOfTeamStore.ts ***!
  \**************************************/
/*! exports provided: INIT, SET_TODO_LIST, SET_EDITING, SET_FILTER_TYPE, SET_OPENED_MEMBER_APPEND_FORM, FETCH_TEAM, FETCH_TODO_LIST, ADD_ITEM, ADD_TEAM_MEMBER, TOGGLE_ITEM, UPDATE_ITEM, UPDATE_ITEM_PRIORITY, DELETE_ITEM, DELETE_ALL_ITEM, DELETE_TEAM_MEMBER, todoOfTeamStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"INIT\", function() { return INIT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_TODO_LIST\", function() { return SET_TODO_LIST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_EDITING\", function() { return SET_EDITING; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_FILTER_TYPE\", function() { return SET_FILTER_TYPE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SET_OPENED_MEMBER_APPEND_FORM\", function() { return SET_OPENED_MEMBER_APPEND_FORM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FETCH_TEAM\", function() { return FETCH_TEAM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FETCH_TODO_LIST\", function() { return FETCH_TODO_LIST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_ITEM\", function() { return ADD_ITEM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_TEAM_MEMBER\", function() { return ADD_TEAM_MEMBER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TOGGLE_ITEM\", function() { return TOGGLE_ITEM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_ITEM\", function() { return UPDATE_ITEM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_ITEM_PRIORITY\", function() { return UPDATE_ITEM_PRIORITY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DELETE_ITEM\", function() { return DELETE_ITEM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DELETE_ALL_ITEM\", function() { return DELETE_ALL_ITEM; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DELETE_TEAM_MEMBER\", function() { return DELETE_TEAM_MEMBER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"todoOfTeamStore\", function() { return todoOfTeamStore; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/services */ \"./src/services/index.ts\");\n\n\nconst INIT = 'INIT';\nconst SET_TODO_LIST = 'SET_TODO_LIST';\nconst SET_EDITING = 'SET_EDITING';\nconst SET_FILTER_TYPE = 'SET_FILTER_TYPE';\nconst SET_OPENED_MEMBER_APPEND_FORM = 'SET_OPENED_MEMBER_APPEND_FORM';\nconst FETCH_TEAM = 'FETCH_TEAM';\nconst FETCH_TODO_LIST = 'FETCH_TODO_LIST';\nconst ADD_ITEM = 'ADD_ITEM';\nconst ADD_TEAM_MEMBER = 'ADD_TEAM_MEMBER';\nconst TOGGLE_ITEM = 'TOGGLE_ITEM';\nconst UPDATE_ITEM = 'UPDATE_ITEM';\nconst UPDATE_ITEM_PRIORITY = 'UPDATE_ITEM_PRIORITY';\nconst DELETE_ITEM = 'DELETE_ITEM';\nconst DELETE_ALL_ITEM = 'DELETE_ALL_ITEM';\nconst DELETE_TEAM_MEMBER = 'DELETE_TEAM_MEMBER';\nconst todoOfTeamStore = new _core__WEBPACK_IMPORTED_MODULE_0__[\"Store\"]({\n    state: {\n        _id: '',\n        name: '',\n        members: {},\n        filterType: {},\n        editing: '',\n        openedAppendForm: false,\n    },\n    mutations: {\n        [INIT](state, { _id, name, members }) {\n            state._id = _id;\n            state.name = name;\n            const memberMap = {};\n            const filterMap = {};\n            for (const member of members) {\n                memberMap[member._id] = {\n                    ...member,\n                    todoList: (member.todoList || []).filter(v => v !== null)\n                };\n                filterMap[member._id] = \"all\" /* ALL */;\n            }\n            state.members = Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"observable\"])(memberMap);\n            state.filterType = Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"observable\"])(filterMap);\n        },\n        [SET_TODO_LIST](state, { memberId, todoList }) {\n            state.members[memberId].todoList = todoList;\n        },\n        [SET_EDITING](state, editing) {\n            state.editing = editing;\n        },\n        [SET_FILTER_TYPE](state, { memberId, filterType }) {\n            state.filterType[memberId] = filterType;\n        },\n        [SET_OPENED_MEMBER_APPEND_FORM](state, openedAppendForm) {\n            state.openedAppendForm = openedAppendForm;\n        },\n    },\n    getters: {\n        membersByFilteredTodoList: ({ members, filterType }) => Object.entries(members)\n            .reduce((temp, [id, { todoList }]) => ({\n            ...temp,\n            [id]: todoList.filter(({ isCompleted }) => (filterType[id] === \"all\" /* ALL */) ||\n                (filterType[id] === \"priority\" /* PRIORITY */) ||\n                (filterType[id] === \"completed\" /* COMPLETED */ && isCompleted) ||\n                (filterType[id] === \"active\" /* ACTIVE */ && !isCompleted))\n        }), {}),\n    },\n    actions: {\n        async [FETCH_TEAM]({ commit }, teamId) {\n            commit(INIT, await _services__WEBPACK_IMPORTED_MODULE_1__[\"TeamService\"].fetchTeam(teamId));\n        },\n        async [FETCH_TODO_LIST]({ commit, state: { _id: teamId } }, memberId) {\n            const { todoList } = await _services__WEBPACK_IMPORTED_MODULE_1__[\"TodoService\"].fetchTodoList({ teamId, memberId });\n            commit(SET_TODO_LIST, { memberId, todoList: (todoList || []).filter((v) => v !== null) });\n        },\n        async [ADD_ITEM]({ dispatch, state: { _id: teamId } }, { memberId, contents }) {\n            await _services__WEBPACK_IMPORTED_MODULE_1__[\"TodoService\"].addItem({ teamId, memberId, contents });\n            return dispatch(FETCH_TODO_LIST, memberId);\n        },\n        async [TOGGLE_ITEM]({ dispatch, state: { _id: teamId } }, { memberId, itemId }) {\n            await _services__WEBPACK_IMPORTED_MODULE_1__[\"TodoService\"].toggleItem({ teamId, memberId, itemId });\n            return dispatch(FETCH_TODO_LIST, memberId);\n        },\n        async [UPDATE_ITEM]({ dispatch, state: { _id: teamId } }, { memberId, itemId, contents }) {\n            await _services__WEBPACK_IMPORTED_MODULE_1__[\"TodoService\"].updateItem({ teamId, memberId, itemId, contents });\n            return dispatch(FETCH_TODO_LIST, memberId);\n        },\n        async [UPDATE_ITEM_PRIORITY]({ dispatch, state: { _id: teamId } }, { memberId, itemId, priority }) {\n            await _services__WEBPACK_IMPORTED_MODULE_1__[\"TodoService\"].updateItemPriority({ teamId, memberId, itemId, priority });\n            return dispatch(FETCH_TODO_LIST, memberId);\n        },\n        async [DELETE_ITEM]({ dispatch, state: { _id: teamId } }, { memberId, itemId }) {\n            await _services__WEBPACK_IMPORTED_MODULE_1__[\"TodoService\"].deleteItem({ teamId, memberId, itemId });\n            return dispatch(FETCH_TODO_LIST, memberId);\n        },\n        async [DELETE_ALL_ITEM]({ dispatch, state: { _id: teamId } }, memberId) {\n            await _services__WEBPACK_IMPORTED_MODULE_1__[\"TodoService\"].deleteAllItem({ teamId, memberId });\n            return dispatch(FETCH_TODO_LIST, memberId);\n        },\n        async [ADD_TEAM_MEMBER]({ commit, state: { _id: teamId } }, name) {\n            return commit(INIT, await _services__WEBPACK_IMPORTED_MODULE_1__[\"TeamService\"].addTeamMember(teamId, name));\n        },\n        async [DELETE_TEAM_MEMBER]({ dispatch, state: { _id: teamId } }, memberId) {\n            await _services__WEBPACK_IMPORTED_MODULE_1__[\"TeamService\"].deleteTeamMember(teamId, memberId);\n            return dispatch(FETCH_TEAM, teamId);\n        },\n    },\n});\n\n\n//# sourceURL=webpack:///./src/store/todoOfTeamStore.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! exports provided: selectElement, selectAllElement, selectParent, debounceOneFrame, lazyFrame, addEventBubblingListener, parseQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selectElement\", function() { return selectElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selectAllElement\", function() { return selectAllElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"selectParent\", function() { return selectParent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"debounceOneFrame\", function() { return debounceOneFrame; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lazyFrame\", function() { return lazyFrame; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addEventBubblingListener\", function() { return addEventBubblingListener; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseQuery\", function() { return parseQuery; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/constants */ \"./src/constants/index.ts\");\n\nconst selectElement = (selector, parent = document) => parent.querySelector(selector);\nconst selectAllElement = (selector, parent = document) => [...parent.querySelectorAll(selector)];\nconst selectParent = (selector, target) => target.closest(selector);\nconst debounceOneFrame = (callback) => {\n    let timer = -1;\n    return (props) => {\n        cancelAnimationFrame(timer);\n        timer = requestAnimationFrame(() => callback(props));\n    };\n};\nconst lazyFrame = () => new Promise(resolve => setTimeout(resolve, _constants__WEBPACK_IMPORTED_MODULE_0__[\"ONE_FRAME\"] * 10));\nconst addEventBubblingListener = (parent, childSelector, eventType, callback) => {\n    const isTarget = (target) => selectAllElement(childSelector).includes(target) ||\n        selectParent(childSelector, target);\n    parent.addEventListener(eventType, (event) => {\n        const e = event;\n        if (!isTarget(e.target))\n            return;\n        callback(e);\n    });\n};\nconst parseQuery = (uri) => {\n    const queryString = uri.split('?')[1] || '';\n    return queryString.split('&').reduce((query, str) => {\n        const [key, value] = str.split(\"=\");\n        if (key && value)\n            query[key] = value;\n        return query;\n    }, {});\n};\n\n\n//# sourceURL=webpack:///./src/utils/index.ts?");

/***/ }),

/***/ "./src/views/Kanban.ts":
/*!*****************************!*\
  !*** ./src/views/Kanban.ts ***!
  \*****************************/
/*! exports provided: Kanban */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Kanban\", function() { return Kanban; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _components_Todo_TodoHeader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/Todo/TodoHeader */ \"./src/components/Todo/TodoHeader.ts\");\n/* harmony import */ var _router_todoRouter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/router/todoRouter */ \"./src/router/todoRouter.ts\");\n/* harmony import */ var _components_Todo_TodoListOfTeam__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/Todo/TodoListOfTeam */ \"./src/components/Todo/TodoListOfTeam.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/store */ \"./src/store/index.ts\");\n/* harmony import */ var _components_Todo_TodoMemberAppendForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/Todo/TodoMemberAppendForm */ \"./src/components/Todo/TodoMemberAppendForm.ts\");\n\n\n\n\n\n\nconst Kanban = class extends _core__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    async componentInit() {\n        await _store__WEBPACK_IMPORTED_MODULE_4__[\"todoOfTeamStore\"].dispatch(_store__WEBPACK_IMPORTED_MODULE_4__[\"FETCH_TEAM\"], _router_todoRouter__WEBPACK_IMPORTED_MODULE_2__[\"todoRouter\"].$query.id);\n        this.$children = {\n            TodoHeader: { constructor: _components_Todo_TodoHeader__WEBPACK_IMPORTED_MODULE_1__[\"TodoHeader\"] },\n            TodoListOfTeam: { constructor: _components_Todo_TodoListOfTeam__WEBPACK_IMPORTED_MODULE_3__[\"TodoListOfTeam\"] },\n            TodoMemberAppendForm: { constructor: _components_Todo_TodoMemberAppendForm__WEBPACK_IMPORTED_MODULE_5__[\"TodoMemberAppendForm\"] },\n        };\n    }\n    template() {\n        return `\n      <h1 data-component=\"TodoHeader\" id=\"user-title\"></h1>\n      <ul data-component=\"TodoListOfTeam\" id=\"todo-list-of-team\" class=\"todoapp-list-container flex-column-container\"></ul>\n      <div data-component=\"TodoMemberAppendForm\" id=\"member-append-form\"></div>\n    `;\n    }\n};\n\n\n//# sourceURL=webpack:///./src/views/Kanban.ts?");

/***/ }),

/***/ "./src/views/Team.ts":
/*!***************************!*\
  !*** ./src/views/Team.ts ***!
  \***************************/
/*! exports provided: Team */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Team\", function() { return Team; });\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/_core */ \"./src/_core/index.ts\");\n/* harmony import */ var _components_Team_TeamList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/Team/TeamList */ \"./src/components/Team/TeamList.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store */ \"./src/store/index.ts\");\n/* harmony import */ var _components_Team_TeamAppendForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/Team/TeamAppendForm */ \"./src/components/Team/TeamAppendForm.ts\");\n\n\n\n\nconst Team = class extends _core__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    async componentInit() {\n        await _store__WEBPACK_IMPORTED_MODULE_2__[\"teamStore\"].dispatch(_store__WEBPACK_IMPORTED_MODULE_2__[\"FETCH_TEAMS\"]);\n        this.$children = {\n            TeamList: { constructor: _components_Team_TeamList__WEBPACK_IMPORTED_MODULE_1__[\"TeamList\"] },\n            TeamAppendForm: { constructor: _components_Team_TeamAppendForm__WEBPACK_IMPORTED_MODULE_3__[\"TeamAppendForm\"] },\n        };\n    }\n    template() {\n        return `\n      <h1 id=\"user-title\" data-username=\"eastjun\">\n        <span><strong>Team</strong>'s Todo Lists</span>\n      </h1>\n      <div data-component=\"TeamList\" class=\"team-list-container\"></div>\n      <div data-component=\"TeamAppendForm\" id=\"team-append-form\"></div>\n    `;\n    }\n};\n\n\n//# sourceURL=webpack:///./src/views/Team.ts?");

/***/ }),

/***/ "./src/views/index.ts":
/*!****************************!*\
  !*** ./src/views/index.ts ***!
  \****************************/
/*! exports provided: Kanban, Team */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Kanban__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Kanban */ \"./src/views/Kanban.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Kanban\", function() { return _Kanban__WEBPACK_IMPORTED_MODULE_0__[\"Kanban\"]; });\n\n/* harmony import */ var _Team__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Team */ \"./src/views/Team.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Team\", function() { return _Team__WEBPACK_IMPORTED_MODULE_1__[\"Team\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///./src/views/index.ts?");

/***/ })

/******/ });