"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FXBadgeViewController = void 0;
const react_native_fxview_1 = require("react-native-fxview");
const react_1 = __importDefault(require("react"));
const FXBadgeView_1 = __importDefault(require("./FXBadgeView"));
const types_1 = require("./types");
/**
 * Badge 视图控制器
 * 负责单个FXView下的徽章管理，包括显示、关闭和清理
 */
class FXBadgeViewController {
    /**
     * 构造函数
     * @param fxViewId FXView ID
     */
    constructor(fxViewId) {
        /**
         * 活跃的徽章数组，按添加顺序存储
         */
        this.activeBadges = [];
        this.fxViewId = fxViewId;
    }
    /**
     * 显示徽章
     * @param entry 徽章显示配置
     * @returns 徽章显示项，失败返回null
     */
    show(entry) {
        var _a, _b;
        try {
            // 创建徽章显示项
            const showItem = this.createShowItem(entry);
            // 添加到活跃徽章数组
            this.activeBadges.push(showItem);
            // 显示徽章
            (_a = showItem.controller) === null || _a === void 0 ? void 0 : _a.show();
            const animationPromise = ((_b = showItem.animationController) === null || _b === void 0 ? void 0 : _b.show()) || Promise.resolve();
            // 执行显示动画
            animationPromise.then(() => {
                react_native_fxview_1.logger.info("[FXBadgeViewController] Badge shown successfully");
            }).catch((error) => {
                react_native_fxview_1.logger.error("[FXBadgeViewController] Failed to show badge animation", error);
            }).finally(() => {
                var _a;
                // 调用 didShow 回调
                (_a = showItem.didShow) === null || _a === void 0 ? void 0 : _a.call(showItem);
            });
            return showItem;
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadgeViewController] Failed to show badge", error);
            return null;
        }
    }
    /**
     * 关闭徽章
     * @param showItem 徽章显示项（可选），不传则关闭最后一个徽章
     * @param closeType 关闭类型
     */
    close(showItem, closeType) {
        try {
            if (showItem) {
                // 关闭指定的徽章
                this.closeItem(showItem, closeType);
            }
            else {
                // 关闭数组里最后一个徽章
                if (this.activeBadges.length > 0) {
                    const lastItem = this.activeBadges[this.activeBadges.length - 1];
                    this.closeItem(lastItem, closeType);
                }
            }
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadgeViewController] Failed to close badge", error);
        }
    }
    /**
     * 清理所有徽章
     */
    clear() {
        try {
            // 倒序遍历，避免删除元素时影响索引
            for (let i = this.activeBadges.length - 1; i >= 0; i--) {
                this.closeItem(this.activeBadges[i]);
            }
            // 清空数组
            this.activeBadges = [];
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadgeViewController] Failed to clear badges", error);
        }
    }
    /**
     * 创建徽章显示项
     * @param entry 徽章显示配置
     * @returns 徽章显示项
     */
    createShowItem(entry) {
        // 生成唯一的组件ID
        const componentId = `fxbadge_${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 9)}`;
        // 创建徽章显示项
        const showItem = {
            ...entry,
            fxViewId: this.fxViewId,
        };
        // 创建徽章视图引用
        const badgeViewRef = react_1.default.createRef();
        showItem.badgeViewRef = badgeViewRef;
        // 创建徽章视图
        showItem.badgeView = react_1.default.createElement(FXBadgeView_1.default, {
            ...entry.badgeProps,
            ref: badgeViewRef,
            close: (closeType) => {
                this.close(showItem, closeType);
            },
        });
        // 构建控制器
        showItem.controller = react_native_fxview_1.FXManager.build(showItem.badgeView, this.fxViewId, types_1.FXBadgeFXViewCategory, componentId);
        return showItem;
    }
    /**
     * 关闭单个徽章
     * @param item 徽章显示项
     * @param closeType 关闭类型
     */
    closeItem(item, closeType) {
        var _a;
        // 执行关闭动画
        const animationPromise = ((_a = item.animationController) === null || _a === void 0 ? void 0 : _a.close()) || Promise.resolve();
        animationPromise
            .then(() => {
            react_native_fxview_1.logger.info(`[FXBadgeViewController] Badge closed with closeType: ${closeType}`);
        })
            .catch((error) => {
            react_native_fxview_1.logger.error("[FXBadgeViewController] Failed to close badge animation", error);
        })
            .finally(() => {
            var _a, _b;
            // 调用 didClose 回调
            (_a = item.didClose) === null || _a === void 0 ? void 0 : _a.call(item, closeType);
            // 移除控制器
            (_b = item.controller) === null || _b === void 0 ? void 0 : _b.remove();
            // 从数组中移除
            const index = this.activeBadges.indexOf(item);
            if (index > -1) {
                this.activeBadges.splice(index, 1);
            }
        });
    }
}
exports.FXBadgeViewController = FXBadgeViewController;
