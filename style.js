"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
const react_native_1 = require("react-native");
exports.styles = react_native_1.StyleSheet.create({
    // 覆盖层样式
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent",
        pointerEvents: "box-none", // 允许点击穿透
    },
    // 徽章包装器
    badgeWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    // 位置样式
    positionTopRight: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    positionTopLeft: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    positionBottomRight: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
    positionBottomLeft: {
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    // 圆点样式
    badgeDot: {
        borderRadius: 50,
        backgroundColor: "#FF4D4F",
    },
    // 数字徽章样式
    badgeNumberContainer: {
        backgroundColor: "#FF4D4F",
        borderRadius: 10,
        paddingHorizontal: 6,
        minWidth: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeNumberText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    // 文本徽章样式
    badgeTextContainer: {
        backgroundColor: "#FF4D4F",
        borderRadius: 10,
        paddingHorizontal: 8,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeTextText: {
        color: "#FFFFFF",
        fontWeight: "500",
        textAlign: "center",
    },
});
