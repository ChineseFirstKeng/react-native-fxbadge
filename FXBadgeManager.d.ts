import { FXBadgeCloseType, FXBadgeShowEntry, FXBadgeShowItem } from "./types";
/**
 * Badge 管理器
 */
declare class FXBadgeManager {
    private static instance;
    private viewControllerMap;
    static getInstance(): FXBadgeManager;
    show(entry: FXBadgeShowEntry): FXBadgeShowItem | null;
    close(param?: string | FXBadgeShowItem, closeType?: FXBadgeCloseType): void;
    clearAll(fxViewId: string): void;
    private getOrCreateViewController;
}
export default FXBadgeManager;
//# sourceMappingURL=FXBadgeManager.d.ts.map