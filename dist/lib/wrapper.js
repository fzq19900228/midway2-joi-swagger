"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapper = void 0;
var swagger_html_1 = require("./swagger-html");
var swagger_json_1 = require("./swagger-json");
var swagger_joi_controller_1 = require("./swagger-joi-controller");
/**
 * swagger路由注册绑定
 * @param router
 * @param options
 */
var handleSwagger = function (router, options) {
    var 
    // 声明json路由
    _a = options.swaggerJsonEndpoint, 
    // 声明json路由
    swaggerJsonEndpoint = _a === void 0 ? '/swagger-json' : _a, 
    // 声明html路由
    _b = options.swaggerHtmlEndpoint, 
    // 声明html路由
    swaggerHtmlEndpoint = _b === void 0 ? '/swagger-html' : _b, _c = options.prefix, prefix = _c === void 0 ? '' : _c;
    // setup swagger router
    router.get(swaggerJsonEndpoint, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var swaggerJson;
        return __generator(this, function (_a) {
            swaggerJson = swagger_json_1.default(options, swagger_joi_controller_1.apiObjects);
            ctx.body = swaggerJson;
            return [2 /*return*/];
        });
    }); });
    router.get(swaggerHtmlEndpoint, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            ctx.body = swagger_html_1.default(("" + prefix + swaggerJsonEndpoint).replace('//', '/'));
            return [2 /*return*/];
        });
    }); });
};
/**
 * swagger注册
 * @param app
 * @param options
 */
var wrapper = function (app, options) {
    // 参数配置
    var opts = {
        title: 'API DOC',
        description: 'API DOC',
        version: 'v1.0.0',
        prefix: '',
        swaggerJsonEndpoint: '/swagger-json',
        swaggerHtmlEndpoint: '/swagger-html',
        makeSwaggerRouter: false,
    };
    Object.assign(opts, options || {});
    var router = app.router;
    // 配置是否开启swagger
    if (app.config.swagger) {
        handleSwagger(router, opts);
    }
};
exports.wrapper = wrapper;
