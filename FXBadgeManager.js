"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_fxview_1 = require("react-native-fxview");
const FXBadgeViewController_1 = require("./FXBadgeViewController");
/**
 * Badge 管理器
 * 负责管理徽章的显示、关闭和清理
 * 使用单例模式，确保全局只有一个实例
 */
class FXBadgeManager {
    constructor() {
        /**
         * ViewController映射，存储FXView ID和对应的ViewController
         */
        this.viewControllerMap = new Map();
    }
    /**
     * 获取单例实例
     * @returns FXBadgeManager实例
     */
    static getInstance() {
        if (!FXBadgeManager.instance) {
            FXBadgeManager.instance = new FXBadgeManager();
        }
        return FXBadgeManager.instance;
    }
    /**
     * 显示徽章
     * @param entry 徽章显示配置
     * @returns 徽章显示项，失败返回null
     */
    show(entry) {
        try {
            let fxViewId = entry.fxViewId || react_native_fxview_1.FXManager.getLatestFXViewId();
            if (!fxViewId) {
                react_native_fxview_1.logger.warn("[FXBadgeManager] No available FXView");
                return null;
            }
            entry.fxViewId = fxViewId;
            const viewController = this.getOrCreateViewController(fxViewId);
            return viewController.show(entry);
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadgeManager] Failed to show badge", error);
            return null;
        }
    }
    /**
     * 关闭徽章
     * @param param FXView ID 或徽章显示项
     * @param closeType 关闭类型
     */
    close(param, closeType) {
        try {
            let fxViewId = null;
            let showItem;
            if (!param || typeof param === "string") {
                fxViewId = param || react_native_fxview_1.FXManager.getLatestFXViewId();
            }
            else {
                fxViewId = param.fxViewId;
                showItem = param;
            }
            if (!fxViewId) {
                react_native_fxview_1.logger.warn("[FXBadgeManager] No available FXView");
                return;
            }
            const viewController = this.viewControllerMap.get(fxViewId);
            if (!viewController) {
                react_native_fxview_1.logger.warn(`[FXBadgeManager] No viewController found for fxViewId: ${fxViewId}`);
                return;
            }
            viewController.close(showItem, closeType);
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadgeManager] Failed to close badge", error);
        }
    }
    /**
     * 清理指定FXView的ViewController
     * @param fxViewId FXView ID
     */
    clearViewController(fxViewId) {
        try {
            if (!fxViewId) {
                react_native_fxview_1.logger.warn("[FXBadgeManager] No available FXView");
                return;
            }
            const viewController = this.viewControllerMap.get(fxViewId);
            viewController === null || viewController === void 0 ? void 0 : viewController.clear();
            this.viewControllerMap.delete(fxViewId);
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadgeManager] Failed to clear badges", error);
        }
    }
    /**
     * 获取或创建ViewController
     * @param fxViewId FXView ID
     * @returns ViewController
     */
    getOrCreateViewController(fxViewId) {
        let viewController = this.viewControllerMap.get(fxViewId);
        if (!viewController) {
            viewController = new FXBadgeViewController_1.FXBadgeViewController(fxViewId);
            this.viewControllerMap.set(fxViewId, viewController);
        }
        return viewController;
    }
}
exports.default = FXBadgeManager;
