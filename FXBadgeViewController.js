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
 */
class FXBadgeViewController {
    constructor(fxViewId) {
        this.activeBadges = new Set();
        this.fxViewId = fxViewId;
    }
    show(entry) {
        var _a, _b;
        try {
            const showItem = this.createShowItem(entry);
            this.activeBadges.add(showItem);
            (_a = showItem.controller) === null || _a === void 0 ? void 0 : _a.show();
            (_b = showItem.animationController) === null || _b === void 0 ? void 0 : _b.show();
            return showItem;
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadgeViewController] Failed to show badge", error);
            return null;
        }
    }
    close(showItem, closeType) {
        try {
            if (showItem) {
                // 关闭指定的徽章
                this.closeItem(showItem);
            }
            else {
                // 关闭所有徽章
                this.clear();
            }
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadgeViewController] Failed to close badge", error);
        }
    }
    clear() {
        try {
            this.activeBadges.forEach((showItem) => {
                this.closeItem(showItem);
            });
            this.activeBadges.clear();
        }
        catch (error) {
            react_native_fxview_1.logger.error("[FXBadgeViewController] Failed to clear badges", error);
        }
    }
    createShowItem(entry) {
        const componentId = `dialog_${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 9)}`;
        const showItem = {
            ...entry,
        };
        const badgeViewRef = react_1.default.createRef();
        showItem.badgeViewRef = badgeViewRef;
        showItem.badgeView = react_1.default.createElement(FXBadgeView_1.default, {
            ...entry.badgeProps,
            ref: badgeViewRef,
            close: (closeType) => {
                this.close(showItem, closeType);
            },
        });
        showItem.controller = react_native_fxview_1.FXManager.build(showItem.badgeView, this.fxViewId, types_1.FXBadgeFXViewCategory, componentId);
        return showItem;
    }
    closeItem(item, closeType) {
        var _a;
        const animationPromise = ((_a = item.animationController) === null || _a === void 0 ? void 0 : _a.close()) || Promise.resolve();
        animationPromise
            .then(() => {
            react_native_fxview_1.logger.info(`[FXBadgeViewController] Badge closed with closeType: ${closeType}`);
        })
            .catch((error) => {
            react_native_fxview_1.logger.error("[FXBadgeViewController] Failed to close badge animation", error);
        })
            .finally(() => {
            var _a;
            (_a = item.controller) === null || _a === void 0 ? void 0 : _a.remove();
            this.activeBadges.delete(item);
        });
    }
}
exports.FXBadgeViewController = FXBadgeViewController;
