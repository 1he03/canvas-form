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
exports.__esModule = true;
exports.Forms = void 0;
var fs = require("fs");
var Forms = /** @class */ (function () {
    function Forms() {
        this.Canvas = require("canvas");
        this.canvas = new this.Canvas.Canvas(1920, 1080);
        this.ctx = this.canvas.getContext('2d');
        this.x = 0;
        this.y = 0;
        this.size = 50;
        this.color = "black";
        this.height = 100;
        this.width = 100;
        this.lineWidth = 1;
        this.radius = 50;
        this.path = "https://cdn.discordapp.com/attachments/715079889593565264/801931382833807360/unknown.png";
        this.isCircle = false;
        this.fontFamily = "Arial";
        this.text = "";
        this.textAlign = "center";
        this.endX = this.x + 50;
        this.endY = this.y + 50;
        this.spikes = 5;
        this.outerRadius = 30;
        this.innerRadius = 15;
        this.sideAB = 0;
        this.sideAC = 0;
        this.sideBC = 0;
        this.rotate = 0;
        this.rot = Math.PI / 2 * 3;
    }
    Forms.prototype.fill = function (color) {
        this.ctx.fillStyle = color;
        this.ctx.fill();
    };
    Forms.prototype.stroke = function (color) {
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    };
    Forms.prototype.setCanvasSize = function (height, width) {
        if (height)
            this.canvas.height = height;
        if (width)
            this.canvas.width = width;
    };
    Forms.prototype.createCircle = function (options) {
        if (!options)
            options = {};
        if (!options.x)
            options.x = this.x;
        if (!options.y)
            options.y = this.y;
        if (!options.color)
            options.color = this.color;
        if (!options.radius && options.radius != 0)
            options.radius = this.radius;
        var main = this;
        return ({ x: options.x, y: options.y, radius: options.radius, color: options.color, draw: function (_options) {
                if (!_options)
                    _options = {};
                if (!_options.drawType)
                    _options.drawType = "fill";
                var x = _options.x == 0 ? 0 : _options.x || options.x;
                var y = _options.y == 0 ? 0 : _options.y || options.y;
                var radius = _options.radius || options.radius;
                var color = _options.color || options.color;
                main.ctx.beginPath();
                main.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
                main.ctx.closePath();
                if (_options.drawType == 'fill')
                    main.fill(color);
                else if (_options.drawType == 'stroke')
                    main.stroke(color);
                var sub = this;
                return { x: x, y: y, radius: radius, color: color, draw: function (options) { return sub.draw(options); } };
            }
        });
    };
    Forms.prototype.createText = function (options) {
        if (!options)
            options = {};
        if (!options.x)
            options.x = this.x;
        if (!options.y)
            options.y = this.y;
        if (!options.fontFamily)
            options.fontFamily = this.fontFamily;
        if (!options.text)
            options.text = this.text;
        if (!options.textAlign)
            options.textAlign = this.textAlign;
        if (!options.width)
            options.width = 0;
        if (!options.color)
            options.color = this.color;
        if (!options.size || options.size != 0)
            options.size = this.size;
        var main = this;
        function fill(_a) {
            var text = _a.text, color = _a.color, size = _a.size, x = _a.x, y = _a.y, width = _a.width, fontFamily = _a.fontFamily, textAlign = _a.textAlign, isWidth = _a.isWidth;
            main.ctx.beginPath();
            main.ctx.font = "".concat(size, "px ").concat(fontFamily);
            main.ctx.textAlign = textAlign;
            main.ctx.fillStyle = color;
            if (isWidth)
                main.ctx.fillText(text, x, y, width);
            else
                main.ctx.fillText(text, x, y);
            main.ctx.closePath();
        }
        function stroke(_a) {
            var text = _a.text, color = _a.color, size = _a.size, x = _a.x, y = _a.y, width = _a.width, fontFamily = _a.fontFamily, textAlign = _a.textAlign, isWidth = _a.isWidth;
            main.ctx.beginPath();
            main.ctx.font = "".concat(size, "px ").concat(fontFamily);
            main.ctx.textAlign = textAlign;
            main.ctx.strokeStyle = color;
            if (isWidth)
                main.ctx.strokeText(text, x, y, width);
            else
                main.ctx.strokeText(text, x, y);
            main.ctx.closePath();
        }
        return ({ x: options.x, y: options.y, size: options.size, text: options.text, width: options.width, color: options.color, fontFamily: options.fontFamily, textAlign: options.textAlign, draw: function (_options) {
                if (!_options)
                    _options = {};
                if (!_options.drawType)
                    _options.drawType = "fill";
                var x = _options.x == 0 ? 0 : _options.x || options.x, y = _options.y == 0 ? 0 : _options.y || options.y, size = _options.size || options.size, fontFamily = _options.fontFamily || options.fontFamily, textAlign = _options.textAlign || options.textAlign, text = _options.text || options.text, color = _options.color || options.color, width = _options.width || options.width, isWidth = width > 0 ? true : false;
                if (_options.drawType == 'fill')
                    fill({ text: text, color: color, size: size, x: x, y: y, width: width, fontFamily: fontFamily, textAlign: textAlign, isWidth: isWidth });
                else if (_options.drawType == 'stroke')
                    stroke({ text: text, color: color, size: size, x: x, y: y, width: width, fontFamily: fontFamily, textAlign: textAlign, isWidth: isWidth });
                var sub = this;
                return { x: x, y: y, size: size, text: text, width: width, color: color, fontFamily: fontFamily, textAlign: textAlign, draw: function (options) { return sub.draw(options); } };
            } });
    };
    Forms.prototype.createRect = function (options) {
        if (!options)
            options = {};
        if (!options.x)
            options.x = this.x;
        if (!options.y)
            options.y = this.y;
        if (!options.width && options.width != 0)
            options.width = this.width;
        if (!options.height && options.height != 0)
            options.height = this.height;
        if (!options.color)
            options.color = this.color;
        var main = this;
        function fill(_a) {
            var x = _a.x, y = _a.y, width = _a.width, height = _a.height, color = _a.color;
            main.ctx.beginPath();
            main.ctx.fillStyle = color;
            main.ctx.fillRect(x, y, width, height);
            main.ctx.closePath();
        }
        function stroke(_a) {
            var x = _a.x, y = _a.y, width = _a.width, height = _a.height, color = _a.color;
            main.ctx.beginPath();
            main.ctx.strokeStyle = color;
            main.ctx.strokeRect(x, y, width, height);
            main.ctx.closePath();
        }
        return ({ x: options.x, y: options.y, width: options.width, height: options.height, color: options.color, draw: function (_options) {
                if (!_options)
                    _options = {};
                if (!_options.drawType)
                    _options.drawType = "fill";
                var x = _options.x == 0 ? 0 : _options.x || options.x, y = _options.y == 0 ? 0 : _options.y || options.y, width = _options.width || options.width, height = _options.height || options.height, color = _options.color || options.color;
                if (_options.drawType == 'fill')
                    fill({ x: x, y: y, width: width, height: height, color: color });
                else if (_options.drawType == 'stroke')
                    stroke({ x: x, y: y, width: width, height: height, color: color });
                var sub = this;
                return { x: x, y: y, width: width, height: height, color: color, draw: function (options) { return sub.draw(options); } };
            }
        });
    };
    Forms.prototype.createLine = function (options) {
        if (!options)
            options = {};
        if (!options.x)
            options.x = this.x;
        if (!options.y)
            options.y = this.y;
        if (!options.endX && options.endX != 0)
            options.endX = this.endX;
        if (!options.endY && options.endY != 0)
            options.endY = this.endY;
        if (!options.lineWidth && options.lineWidth != 0)
            options.lineWidth = this.lineWidth;
        if (!options.color)
            options.color = this.color;
        var main = this;
        return ({ x: options.x, y: options.y, endX: options.endX, endY: options.endY, lineWidth: options.lineWidth, color: options.color, draw: function (_options) {
                if (!_options)
                    _options = {};
                var x = _options.x == 0 ? 0 : _options.x || options.x, y = _options.y == 0 ? 0 : _options.y || options.y, endX = _options.endX || options.endX, endY = _options.endY || options.endY, lineWidth = _options.lineWidth || options.lineWidth, color = _options.color || options.color;
                main.ctx.beginPath();
                main.ctx.lineWidth = lineWidth;
                main.ctx.moveTo(x, y);
                main.ctx.lineTo(endX, endY);
                main.stroke(color);
                main.ctx.closePath();
                var sub = this;
                return { x: x, y: y, endX: endX, endY: endY, lineWidth: lineWidth, color: color, draw: function (options) { return sub.draw(options); } };
            }
        });
    };
    Forms.prototype.createRhombus = function (options) {
        if (!options)
            options = {};
        if (!options.x)
            options.x = this.x;
        if (!options.y)
            options.y = this.y;
        if (!options.width && options.width != 0)
            options.width = this.width;
        if (!options.height && options.height != 0)
            options.height = this.height;
        if (!options.lineWidth && options.lineWidth != 0)
            options.lineWidth = this.lineWidth;
        if (!options.color)
            options.color = this.color;
        var main = this;
        return ({ x: options.x, y: options.y, width: options.width, height: options.height, color: options.color, lineWidth: options.lineWidth, draw: function (_options) {
                if (!_options)
                    _options = {};
                if (!_options.drawType)
                    _options.drawType = "fill";
                var x = _options.x == 0 ? 0 : _options.x || options.x, y = _options.y == 0 ? 0 : _options.y || options.y, width = _options.width || options.width, height = _options.height || options.height, color = _options.color || options.color, lineWidth = _options.lineWidth || options.lineWidth;
                main.ctx.beginPath();
                main.ctx.moveTo(x, y - height);
                main.ctx.lineTo(x - width, y);
                main.ctx.lineTo(x, y + height);
                main.ctx.lineTo(x + width, y);
                main.ctx.closePath();
                main.ctx.lineWidth = lineWidth;
                if (_options.drawType == 'fill')
                    main.fill(color);
                else if (_options.drawType == 'stroke')
                    main.stroke(color);
                var sub = this;
                return { x: x, y: y, width: width, height: height, lineWidth: lineWidth, color: color, draw: function (options) { return sub.draw(options); } };
            }
        });
    };
    Forms.prototype.createStar = function (options) {
        if (!options)
            options = {};
        if (!options.x)
            options.x = this.x;
        if (!options.y)
            options.y = this.y;
        if (!options.spikes && options.spikes != 0)
            options.spikes = this.spikes;
        if (!options.outerRadius && options.outerRadius != 0)
            options.outerRadius = this.outerRadius;
        if (!options.innerRadius && options.innerRadius != 0)
            options.innerRadius = this.innerRadius;
        if (!options.lineWidth && options.lineWidth != 0)
            options.lineWidth = this.lineWidth;
        if (!options.color)
            options.color = this.color;
        var main = this;
        return ({ x: options.x, y: options.y, spikes: options.spikes, outerRadius: options.outerRadius, innerRadius: options.innerRadius, color: options.color, lineWidth: options.lineWidth, draw: function (_options) {
                if (!_options)
                    _options = {};
                if (!_options.drawType)
                    _options.drawType = "fill";
                var x = _options.x == 0 ? 0 : _options.x || options.x, y = _options.y == 0 ? 0 : _options.y || options.y, spikes = _options.spikes || options.spikes, outerRadius = _options.outerRadius || options.outerRadius, innerRadius = _options.innerRadius || options.innerRadius, color = _options.color || options.color, lineWidth = _options.lineWidth || options.lineWidth, rx = x, ry = y, step = Math.PI / spikes;
                main.ctx.beginPath();
                main.ctx.moveTo(x, y - outerRadius);
                for (var i = 0; i < spikes; i++) {
                    rx = x + Math.cos(main.rot) * outerRadius;
                    ry = y + Math.sin(main.rot) * outerRadius;
                    main.ctx.lineTo(rx, ry);
                    main.rot += step;
                    rx = x + Math.cos(main.rot) * innerRadius;
                    ry = y + Math.sin(main.rot) * innerRadius;
                    main.ctx.lineTo(rx, ry);
                    main.rot += step;
                }
                main.ctx.lineTo(x, y - outerRadius);
                main.ctx.closePath();
                main.ctx.lineWidth = lineWidth;
                if (_options.drawType == 'fill')
                    main.fill(color);
                else if (_options.drawType == 'stroke')
                    main.stroke(color);
                var sub = this;
                return { x: x, y: y, spikes: spikes, outerRadius: outerRadius, innerRadius: innerRadius, lineWidth: lineWidth, color: color, step: step, draw: function (options) { return sub.draw(options); } };
            }
        });
    };
    Forms.prototype.createImage = function (options) {
        if (!options)
            options = {};
        if (!options.x)
            options.x = this.x;
        if (!options.y)
            options.y = this.y;
        if (!options.width && options.width != 0)
            options.width = this.width;
        if (!options.height && options.height != 0)
            options.height = this.height;
        if (!options.path)
            options.path = this.path;
        if (!options.isCircle)
            options.isCircle = this.isCircle;
        if (!options.radius && options.radius != 0)
            options.radius = this.radius;
        var main = this;
        return ({ x: options.x, y: options.y, width: options.width, height: options.height, radius: options.radius, path: options.path, isCircle: options.isCircle, draw: function (_options) {
                return __awaiter(this, void 0, void 0, function () {
                    var radius, isCircle, x, y, width, height, path, img, sub;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!_options)
                                    _options = {};
                                radius = _options.radius || options.radius, isCircle = _options.isCircle || options.isCircle, x = isCircle ? (_options.x == 0 ? 0 : _options.x || options.x) : _options.x || options.x, y = isCircle ? (_options.y == 0 ? 0 : _options.y || options.y) : _options.y || options.y, width = isCircle ? radius * 2 : _options.width || options.width, height = isCircle ? radius * 2 : _options.height || options.height, path = _options.path || options.path;
                                if (isCircle) {
                                    main.ctx.save();
                                    main.ctx.beginPath();
                                    main.ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2, false);
                                    main.ctx.clip();
                                    main.ctx.strokeStyle = "rgba(0,0,0,0)";
                                    main.ctx.stroke();
                                    main.ctx.closePath();
                                }
                                return [4 /*yield*/, main.Canvas.loadImage(path)];
                            case 1:
                                img = _a.sent();
                                main.ctx.drawImage(img, x, y, width, height);
                                if (isCircle)
                                    main.ctx.restore();
                                sub = this;
                                return [2 /*return*/, { path: path, x: x, y: y, radius: radius, height: height, width: width, draw: function (options) { return sub.draw(options); } }];
                        }
                    });
                });
            }
        });
    };
    Forms.prototype.createTriangle = function (options) {
        if (!options)
            options = {};
        if (!options.x)
            options.x = this.x;
        if (!options.y)
            options.y = this.y;
        if (!options.sideAB)
            options.sideAB = this.sideAB;
        if (!options.sideAC)
            options.sideAC = this.sideAC;
        if (!options.sideBC)
            options.sideBC = this.sideBC;
        if (!options.rotate)
            options.rotate = this.rotate;
        if (!options.color)
            options.color = this.color;
        if (!options.size && options.size != 0)
            options.size = this.size;
        var main = this;
        return ({ x: options.x, y: options.y, color: options.color, sideAB: options.sideAB, sideAC: options.sideAC, sideBC: options.sideBC, rotate: options.rotate, size: options.size, draw: function (_options) {
                if (!_options)
                    _options = {};
                var size = _options.size == 0 ? 0 : _options.size || options.size, x = _options.x == 0 ? 0 : _options.x || options.x, y = _options.y == 0 ? 0 : _options.y || options.y, rotate = _options.rotate == 0 ? 0 : _options.rotate || options.rotate == 0, sideAB = _options.sideAB == 0 ? 0 : _options.sideAB || options.sideAB == 0, sideAC = _options.sideAC == 0 ? 0 : _options.sideAC || options.sideAC == 0, sideBC = _options.sideBC == 0 ? 0 : _options.sideBC || options.sideBC == 0, color = _options.color || options.color;
                sideAB = sideAB / 100;
                sideAC = sideAC / 100;
                sideBC = sideBC / 200;
                var v = [
                    [sideAB - sideAC, -sideAB - sideAC - 1],
                    [-sideAB - sideBC - 0.6, sideAB],
                    [0.6 + sideAC + sideBC, sideAC]
                ];
                main.ctx.beginPath();
                main.ctx.save();
                main.ctx.translate(x, y);
                main.ctx.rotate(rotate * Math.PI / 180);
                main.ctx.scale(size, size);
                main.ctx.beginPath();
                main.ctx.moveTo(v[0][0], v[0][1]);
                main.ctx.lineTo(v[1][0], v[1][1]);
                main.ctx.lineTo(v[2][0], v[2][1]);
                main.ctx.closePath();
                main.ctx.fillStyle = color + "";
                main.ctx.fill();
                main.ctx.restore();
                var sub = this;
                return { x: x, y: y, size: size, sideAB: sideAB, sideAC: sideAC, sideBC: sideBC, draw: function (options) { return sub.draw(options); } };
            } });
    };
    Forms.prototype.toSave = function (path, type) {
        if (type === void 0) { type = "png"; }
        var stream;
        if (!path)
            path = (Math.floor(Math.random() * 7508567556840459) + 111111111).toString();
        if (type == "jpeg")
            stream = this.canvas.createJPEGStream().pipe(fs.createWriteStream(path + ".jpeg"));
        else if (type == "png")
            stream = this.canvas.createPNGStream().pipe(fs.createWriteStream(path + ".png"));
        return stream;
    };
    Forms.prototype.toBuffer = function () {
        return this.canvas.toBuffer();
    };
    Forms.prototype.addFontFamily = function (path, setName, options) {
        if (!options)
            options = {};
        this.Canvas.registerFont(path, { family: setName, style: options.style, weight: options.weight });
    };
    return Forms;
}());
exports.Forms = Forms;
