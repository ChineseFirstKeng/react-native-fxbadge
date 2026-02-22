"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FXBadgeCloseSystemType = exports.FXBadgeMaxNumberOfLines = exports.FXBadgeFXViewCategory = exports.FXBadgePosition = exports.FXBadgeType = void 0;
/**
 * 徽章类型
 */
var FXBadgeType;
(function (FXBadgeType) {
    FXBadgeType["Dot"] = "dot";
    FXBadgeType["Text"] = "text";
    FXBadgeType["Custom"] = "custom"; // 自定义类型
})(FXBadgeType || (exports.FXBadgeType = FXBadgeType = {}));
/**
 * 徽章位置
 */
var FXBadgePosition;
(function (FXBadgePosition) {
    FXBadgePosition["TopRight"] = "topRight";
    FXBadgePosition["TopLeft"] = "topLeft";
    FXBadgePosition["BottomRight"] = "bottomRight";
    FXBadgePosition["BottomLeft"] = "bottomLeft";
    FXBadgePosition["Center"] = "center"; // 中心
})(FXBadgePosition || (exports.FXBadgePosition = FXBadgePosition = {}));
/**
 * FXView 分类
 */
exports.FXBadgeFXViewCategory = "FXBadge";
/**
 * Badge 的最大行数，用于实现"无限行"的文本显示
 * 设置为一个足够大的数值以避免文本被截断
 */
exports.FXBadgeMaxNumberOfLines = 99999;
/**
 * 系统预定义的徽章关闭类型
 */
var FXBadgeCloseSystemType;
(function (FXBadgeCloseSystemType) {
    FXBadgeCloseSystemType["Badge"] = "badge";
    FXBadgeCloseSystemType["Custom"] = "custom";
})(FXBadgeCloseSystemType || (exports.FXBadgeCloseSystemType = FXBadgeCloseSystemType = {}));
