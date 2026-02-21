import { FXBadgeCloseType, FXBadgeShowItem, FXBadgeShowEntry } from "./types";
/**
 * Badge 视图控制器
 */
export declare class FXBadgeViewController {
    private fxViewId;
    private activeBadges;
    constructor(fxViewId: string);
    show(entry: FXBadgeShowEntry): FXBadgeShowItem | null;
    close(showItem?: FXBadgeShowItem, closeType?: FXBadgeCloseType): void;
    clear(): void;
    private createShowItem;
    private closeItem;
}
//# sourceMappingURL=FXBadgeViewController.d.ts.map