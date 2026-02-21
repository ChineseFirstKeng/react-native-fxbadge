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
 * @template T - 徽章配置类型
 */
class FXBadgeTypeBuilder {
    /**
     * 构造函数
     * @param type 徽章类型
     */
    constructor(type) {
        /**
         * 徽章显示项
         */
        this.showItem = null;
        this.type = type;
    }
    /**
     * 显示徽章
     * @param configuration 徽章配置
     * @param fxViewId FXView ID（可选）
     * @returns 徽章控制器，失败返回null
     */
    show(configuration, fxViewId) {
        react_native_fxview_1.logger.info("[FXBadgeTypeBuilder] show", fxViewId, configuration);
        try {
            // 提取回调函数和其他配置
            const { didShow, didClose, ...restConfig } = configuration;
            // 创建徽章显示配置
            const entry = {
                fxViewId: fxViewId,
                didShow: didShow,
                didClose: didClose,
                animationController: restConfig.animationController,
                badgeProps: {
                    ...restConfig,
                    type: this.type,
                    close: (closeType) => {
                        this.close(closeType);
                    }
                },
            };
            // 显示徽章
            const showItem = FXBadgeManager_1.default.getInstance().show(entry);
            this.showItem = showItem || null;
            // 检查show操作是否成功
            if (!showItem) {
                react_native_fxview_1.logger.error("[FXBadge] Failed to show badge: FXBadgeManager.show() returned null");
                return null;
            }
            // 返回徽章控制器
            return {
                close: (closeType) => this.close(closeType),
                fxViewId: () => { var _a; return ((_a = this.showItem) === null || _a === void 0 ? void 0 : _a.fxViewId) || ""; },
            };
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadge] Failed to show badge", error);
            return null;
        }
    }
    /**
     * 关闭徽章
     * @param closeType 关闭类型
     */
    close(closeType) {
        react_native_fxview_1.logger.log("[FXBadgeTypeBuilder] close", closeType);
        FXBadgeManager_1.default.getInstance().close(this.showItem || undefined, closeType);
    }
}
/**
 * 圆点徽章构建器
 * 用于创建和显示圆点类型的徽章
 */
class FXBadgeDotBuilder extends FXBadgeTypeBuilder {
    /**
     * 构造函数
     */
    constructor() {
        super(types_1.FXBadgeType.Dot);
    }
}
/**
 * 文本徽章构建器
 * 用于创建和显示文本类型的徽章
 */
class FXBadgeTextBuilder extends FXBadgeTypeBuilder {
    /**
     * 构造函数
     */
    constructor() {
        super(types_1.FXBadgeType.Text);
    }
}
/**
 * 自定义徽章构建器
 * 用于创建和显示自定义类型的徽章
 */
class FXBadgeCustomBuilder extends FXBadgeTypeBuilder {
    /**
     * 构造函数
     */
    constructor() {
        super(types_1.FXBadgeType.Custom);
    }
}
/**
 * Badge 主类
 * 提供创建和管理徽章的静态方法
 */
class FXBadge {
    /**
     * 构造函数
     */
    constructor() {
        // 空构造函数
    }
    /**
     * 获取圆点徽章构建器
     * @returns 圆点徽章构建器
     */
    static dot() {
        return new FXBadgeDotBuilder();
    }
    /**
     * 获取文本徽章构建器
     * @returns 文本徽章构建器
     */
    static text() {
        return new FXBadgeTextBuilder();
    }
    /**
     * 获取自定义徽章构建器
     * @returns 自定义徽章构建器
     */
    static custom() {
        return new FXBadgeCustomBuilder();
    }
    /**
     * 静态函数关闭徽章，关闭的是最近展示出来的那个。触发关闭徽章，并不是关闭完成。转发给 FXBadgeManager
     * @param fxViewId 可选，指定要关闭的徽章的 fxViewId
     */
    static close(fxViewId, closeType) {
        try {
            react_native_fxview_1.logger.log("[FXBadge] static close", fxViewId);
            FXBadgeManager_1.default.getInstance().close(fxViewId, closeType || types_1.FXBadgeCloseSystemType.Custom);
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadge] Failed to close badge", error);
        }
    }
    /**
     * 关闭所有徽章
     * @param fxViewId 指定要关闭的徽章的 fxViewId
     */
    static clearAll(fxViewId) {
        try {
            react_native_fxview_1.logger.log("[FXBadge] clearAll", fxViewId);
            FXBadgeManager_1.default.getInstance().clearViewController(fxViewId);
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadge] Failed to clear badges", error);
        }
    }
}
exports.default = FXBadge;
