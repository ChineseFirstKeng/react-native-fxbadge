"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FXBadgeCloseSystemType = exports.FXBadgeFXViewCategory = exports.FXBadgePosition = exports.FXBadgeType = void 0;
// 徽章类型
var FXBadgeType;
(function (FXBadgeType) {
    FXBadgeType["Dot"] = "dot";
    FXBadgeType["Text"] = "text";
    FXBadgeType["Custom"] = "custom"; // 自定义
})(FXBadgeType || (exports.FXBadgeType = FXBadgeType = {}));
// 徽章位置
var FXBadgePosition;
(function (FXBadgePosition) {
    FXBadgePosition["TopRight"] = "topRight";
    FXBadgePosition["TopLeft"] = "topLeft";
    FXBadgePosition["BottomRight"] = "bottomRight";
    FXBadgePosition["BottomLeft"] = "bottomLeft";
    FXBadgePosition["Center"] = "center"; // 中心
})(FXBadgePosition || (exports.FXBadgePosition = FXBadgePosition = {}));
exports.FXBadgeFXViewCategory = "FXBadge";
var FXBadgeCloseSystemType;
(function (FXBadgeCloseSystemType) {
    FXBadgeCloseSystemType["Custom"] = "custom";
    FXBadgeCloseSystemType["Auto"] = "auto";
})(FXBadgeCloseSystemType || (exports.FXBadgeCloseSystemType = FXBadgeCloseSystemType = {}));
