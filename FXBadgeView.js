"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const types_1 = require("./types");
const react_native_fxview_1 = require("react-native-fxview");
class FXBadgeView extends react_1.Component {
    constructor(props) {
        react_native_fxview_1.logger.info("[FXBadgeView] constructor", props);
        super(props);
        // 渲染圆点徽章
        this.renderDot = () => {
            const { color = "#FF3B30", size = 8 } = this.props;
            react_native_fxview_1.logger.info("[FXBadgeView] renderDot", { color, size });
            return (<react_native_1.View style={[
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor: color,
                    },
                ]}/>);
        };
        // 渲染文本徽章
        this.renderText = () => {
            const { text, textStyle, containerStyle } = this.props;
            return (<react_native_1.View style={[containerStyle]}>
        <react_native_1.Text style={[textStyle]}>{text}</react_native_1.Text>
      </react_native_1.View>);
        };
        // 渲染自定义徽章
        this.renderCustom = () => {
            const { custom, containerStyle } = this.props;
            return <react_native_1.View style={[containerStyle]}>{custom}</react_native_1.View>;
        };
        // 渲染徽章内容
        this.renderBadgeContent = () => {
            switch (this.props.type) {
                case types_1.FXBadgeType.Dot:
                    return this.renderDot();
                case types_1.FXBadgeType.Text:
                    return this.renderText();
                case types_1.FXBadgeType.Custom:
                    return this.renderCustom();
                default:
                    return null;
            }
        };
        // 获取徽章位置样式
        this.getBadgePositionStyle = () => {
            const { position = types_1.FXBadgePosition.TopRight, offset = { x: 0, y: 0 } } = this.props || {};
            const baseStyle = {
                position: "absolute",
            };
            switch (position) {
                case types_1.FXBadgePosition.TopRight:
                    return {
                        ...baseStyle,
                        top: offset.y,
                        right: offset.x,
                    };
                case types_1.FXBadgePosition.TopLeft:
                    return {
                        ...baseStyle,
                        top: offset.y,
                        left: offset.x,
                    };
                case types_1.FXBadgePosition.BottomRight:
                    return {
                        ...baseStyle,
                        bottom: offset.y,
                        right: offset.x,
                    };
                case types_1.FXBadgePosition.BottomLeft:
                    return {
                        ...baseStyle,
                        bottom: offset.y,
                        left: offset.x,
                    };
                case types_1.FXBadgePosition.Center:
                    return {
                        ...baseStyle,
                        top: "50%",
                        left: "50%",
                        transform: [
                            { translateX: offset.x - 50 },
                            { translateY: offset.y - 50 },
                        ],
                    };
                default:
                    return {
                        ...baseStyle,
                        top: offset.y,
                        right: offset.x,
                    };
            }
        };
        this.animation = this.props.animationController;
    }
    render() {
        var _a, _b;
        return (<react_native_1.Animated.View style={[this.getBadgePositionStyle(), (_b = (_a = this.animation) === null || _a === void 0 ? void 0 : _a.getStyle) === null || _b === void 0 ? void 0 : _b.call(_a)]}>
        {this.renderBadgeContent()}
      </react_native_1.Animated.View>);
    }
}
exports.default = FXBadgeView;
