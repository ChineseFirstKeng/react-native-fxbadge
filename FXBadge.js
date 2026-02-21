"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_fxview_1 = require("react-native-fxview");
const types_1 = require("./types");
const FXBadgeManager_1 = __importDefault(require("./FXBadgeManager"));
/**
 * Badge 类型构建器基类
 */
class FXBadgeTypeBuilder {
    constructor(type) {
        this.showItem = null;
        this.type = type;
    }
    /**
     * 显示徽章
     */
    show(fxViewId, configuration) {
        react_native_fxview_1.logger.info("[FXBadgeTypeBuilder] show", fxViewId, configuration);
        try {
            const { didShow, didClose, ...restConfig } = configuration;
            const entry = {
                fxViewId: fxViewId,
                didClose: didClose,
                didShow: didShow,
                animationController: restConfig.animationController,
                badgeProps: {
                    ...restConfig,
                    type: this.type,
                    close: (closeType) => {
                        this.close(closeType);
                    }
                },
            };
            const showItem = FXBadgeManager_1.default.getInstance().show(entry);
            this.showItem = showItem || null;
            // 检查show操作是否成功
            if (!showItem) {
                react_native_fxview_1.logger.error("[FXBadge] Failed to show badge: FXBadgeManager.show() returned null");
                return null;
            }
            return {
                close: (closeType) => this.close(closeType),
                fxViewId: () => showItem.fxViewId,
            };
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadge] Failed to show badge", error);
            return null;
        }
    }
    close(closeType) {
        react_native_fxview_1.logger.log("[FXBadgeTypeBuilder] close", closeType);
        FXBadgeManager_1.default.getInstance().close(this.showItem || undefined, closeType);
    }
}
/**
 * 圆点徽章构建器
 */
class FXBadgeDotBuilder extends FXBadgeTypeBuilder {
    constructor() {
        super(types_1.FXBadgeType.Dot);
    }
}
/**
 * 文本徽章构建器
 */
class FXBadgeTextBuilder extends FXBadgeTypeBuilder {
    constructor() {
        super(types_1.FXBadgeType.Text);
    }
}
/**
 * 自定义徽章构建器
 */
class FXBadgeCustomBuilder extends FXBadgeTypeBuilder {
    constructor() {
        super(types_1.FXBadgeType.Custom);
    }
}
/**
 * Badge 主类
 */
class FXBadge {
    constructor() {
        // 空构造函数
    }
    // 获取圆点徽章构建器
    static dot() {
        return new FXBadgeDotBuilder();
    }
    // 获取文本徽章构建器
    static text() {
        return new FXBadgeTextBuilder();
    }
    // 获取自定义徽章构建器
    static custom() {
        return new FXBadgeCustomBuilder();
    }
    /**
     * 关闭所有徽章
     * @param fxViewId 指定要关闭的徽章的 fxViewId
     */
    static hideAll(fxViewId) {
        try {
            react_native_fxview_1.logger.log("FXBadge hideAll", fxViewId);
            FXBadgeManager_1.default.getInstance().clearAll(fxViewId);
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadge] Failed to hide badges", error);
        }
    }
}
exports.default = FXBadge;
