"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../views/Home.vue"));

var _Register = _interopRequireDefault(require("../views/Register.vue"));

var _Login = _interopRequireDefault(require("../views/Login.vue"));

var _Cars = _interopRequireDefault(require("../views/Cars.vue"));

var _Restore = _interopRequireDefault(require("../views/Restore.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  component: _Home["default"]
}, {
  path: '/register',
  component: _Register["default"]
}, {
  path: '/login',
  component: _Login["default"]
}, {
  path: '/cars',
  component: _Cars["default"]
}, {
  path: '/restore',
  component: _Restore["default"]
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;