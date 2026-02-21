"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_fxview_1 = require("react-native-fxview");
const FXBadgeViewController_1 = require("./FXBadgeViewController");
/**
 * Badge 管理器
 */
class FXBadgeManager {
    constructor() {
        this.viewControllerMap = new Map();
    }
    static getInstance() {
        if (!FXBadgeManager.instance) {
            FXBadgeManager.instance = new FXBadgeManager();
        }
        return FXBadgeManager.instance;
    }
    show(entry) {
        try {
            const fxViewId = entry.fxViewId;
            if (!fxViewId) {
                react_native_fxview_1.logger.warn("[FXBadgeManager] No available FXView");
                return null;
            }
            const viewController = this.getOrCreateViewController(fxViewId);
            return viewController.show(entry);
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadgeManager] Failed to show badge", error);
            return null;
        }
    }
    close(param, closeType) {
        try {
            if (!param || typeof param === "string") {
                const fxViewId = param;
                if (!fxViewId) {
                    react_native_fxview_1.logger.warn("[FXBadgeManager] No available FXView");
                    return;
                }
                const viewController = this.viewControllerMap.get(fxViewId);
                if (!viewController) {
                    react_native_fxview_1.logger.warn(`[FXBadgeManager] No viewController found for fxViewId: ${fxViewId}`);
                    return;
                }
                viewController.close(undefined, closeType);
            }
            else {
                const viewController = this.viewControllerMap.get(param.fxViewId);
                if (!viewController) {
                    react_native_fxview_1.logger.warn(`[FXBadgeManager] No viewController found for fxViewId: ${param.fxViewId}`);
                    return;
                }
                viewController.close(param, closeType);
            }
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadgeManager] Failed to close badge", error);
        }
    }
    clearAll(fxViewId) {
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
