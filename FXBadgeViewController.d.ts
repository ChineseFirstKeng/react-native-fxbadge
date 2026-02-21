import { FXBadgeCloseType, FXBadgeShowItem, FXBadgeShowEntry } from "./types";
/**
 * Badge 视图控制器
 * 负责单个FXView下的徽章管理，包括显示、关闭和清理
 */
export declare class FXBadgeViewController {
    /**
     * FXView ID
     */
    private fxViewId;
    /**
     * 活跃的徽章数组，按添加顺序存储
     */
    private activeBadges;
    /**
     * 构造函数
     * @param fxViewId FXView ID
     */
    constructor(fxViewId: string);
    /**
     * 显示徽章
     * @param entry 徽章显示配置
     * @returns 徽章显示项，失败返回null
     */
    show(entry: FXBadgeShowEntry): FXBadgeShowItem | null;
    /**
     * 关闭徽章
     * @param showItem 徽章显示项（可选），不传则关闭最后一个徽章
     * @param closeType 关闭类型
     */
    close(showItem?: FXBadgeShowItem, closeType?: FXBadgeCloseType): void;
    /**
     * 清理所有徽章
     */
    clear(): void;
    /**
     * 创建徽章显示项
     * @param entry 徽章显示配置
     * @returns 徽章显示项
     */
    private createShowItem;
    /**
     * 关闭单个徽章
     * @param item 徽章显示项
     * @param closeType 关闭类型
     */
    private closeItem;
}
//# sourceMappingURL=FXBadgeViewController.d.ts.map