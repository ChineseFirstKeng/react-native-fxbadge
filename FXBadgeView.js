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
const style_1 = require("./style");
class FXBadgeView extends react_1.Component {
    constructor(props) {
        react_native_fxview_1.logger.info("[FXBadgeView] constructor", props);
        super(props);
        // 处理布局变化事件
        this.handleLayout = (event) => {
            const { width, height } = event.nativeEvent.layout;
            react_native_fxview_1.logger.info("[FXBadgeView] handleLayout", { width, height });
            this.setState({
                hasMeasured: true,
                height,
                width,
            });
        };
        // 渲染圆点徽章
        this.renderDot = () => {
            const { color = "#FF3B30", size = 8, radius = size * 0.5, } = this.props;
            const style = {
                backgroundColor: color,
                width: size,
                height: size,
                borderRadius: radius,
            };
            react_native_fxview_1.logger.info("[FXBadgeView] renderDot", { color, size, radius });
            return <react_native_1.View style={style}/>;
        };
        // 渲染文本徽章
        this.renderText = () => {
            const { text, textStyle, containerStyle } = this.props;
            return (<react_native_1.View style={[style_1.styles.text.container, containerStyle]}>
        <react_native_1.Text style={[style_1.styles.text.text, textStyle]}>{text}</react_native_1.Text>
      </react_native_1.View>);
        };
        // 渲染自定义徽章
        this.renderCustom = () => {
            const { custom, containerStyle } = this.props;
            return (<react_native_1.View style={[style_1.styles.custom.container, containerStyle]}>{custom}</react_native_1.View>);
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
            const { position = types_1.FXBadgePosition.TopRight, offset = { x: 0, y: 0 }, ratioOffset = { x: 0, y: 0 }, } = this.props || {};
            const { height = 0, width = 0 } = this.state;
            react_native_fxview_1.logger.info("[FXBadgeView] getBadgePositionStyle", {
                position,
                offset,
                ratioOffset,
                height,
                width,
            });
            const baseStyle = {
                position: "absolute",
            };
            const totalOffsetValue = {
                x: offset.x + ratioOffset.x * width,
                y: offset.y + ratioOffset.y * height,
            };
            switch (position) {
                case types_1.FXBadgePosition.TopRight:
                    return {
                        ...baseStyle,
                        top: -height * 0.5 + totalOffsetValue.y,
                        right: -width * 0.5 - totalOffsetValue.x,
                    };
                case types_1.FXBadgePosition.TopLeft:
                    return {
                        ...baseStyle,
                        top: -height * 0.5 + totalOffsetValue.y,
                        left: -width * 0.5 + totalOffsetValue.x,
                    };
                case types_1.FXBadgePosition.BottomRight:
                    return {
                        ...baseStyle,
                        bottom: -height * 0.5 - totalOffsetValue.y,
                        right: -width * 0.5 - totalOffsetValue.x,
                    };
                case types_1.FXBadgePosition.BottomLeft:
                    return {
                        ...baseStyle,
                        bottom: -height * 0.5 - totalOffsetValue.y,
                        left: -width * 0.5 + totalOffsetValue.x,
                    };
                case types_1.FXBadgePosition.Center:
                    return {
                        ...baseStyle,
                        marginTop: "50%",
                        marginLeft: "50%",
                        top: -height * 0.5 + totalOffsetValue.y,
                        left: -width * 0.5 + totalOffsetValue.x,
                    };
                default:
                    return {
                        ...baseStyle,
                        top: -height * 0.5 + totalOffsetValue.y,
                        right: -width * 0.5 - totalOffsetValue.x,
                    };
            }
        };
        // 渲染徽章容器，处理点击关闭
        this.renderBadgeContainer = (content) => {
            const { clickClose } = this.props;
            if (clickClose) {
                return (<react_native_1.TouchableOpacity onPress={() => { var _a, _b; return (_b = (_a = this.props).close) === null || _b === void 0 ? void 0 : _b.call(_a, types_1.FXBadgeCloseSystemType.Badge); }}>
          {content}
        </react_native_1.TouchableOpacity>);
            }
            return content;
        };
        this.animation = this.props.animationController;
        this.state = {
            hasMeasured: false,
            height: undefined,
            width: undefined,
        };
    }
    render() {
        var _a, _b;
        const { hasMeasured } = this.state;
        // 只负责定位和布局
        const badgePositionStyle = this.getBadgePositionStyle();
        // 只负责视觉动画变化（比如transform/opacity）
        const animationStyle = (_b = (_a = this.animation) === null || _a === void 0 ? void 0 : _a.getStyle) === null || _b === void 0 ? void 0 : _b.call(_a);
        react_native_fxview_1.logger.info("[FXBadgeView] render", hasMeasured);
        // 测量层只用布局样式，不加动画
        const measureLayer = !hasMeasured && (<react_native_1.View style={{
                ...badgePositionStyle, // 只加定位相关
                opacity: 0,
            }} onLayout={this.handleLayout}>
        {this.renderBadgeContainer(this.renderBadgeContent())}
      </react_native_1.View>);
        // 展示层外层负责定位，内层负责动画
        const displayLayer = hasMeasured && (<react_native_1.Animated.View style={[badgePositionStyle, animationStyle]}>
        {this.renderBadgeContainer(this.renderBadgeContent())}
      </react_native_1.Animated.View>);
        return (<react_1.default.Fragment>
        {measureLayer}
        {displayLayer}
      </react_1.default.Fragment>);
    }
}
exports.default = FXBadgeView;
