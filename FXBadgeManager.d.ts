import { FXBadgeCloseType, FXBadgeShowEntry, FXBadgeShowItem } from "./types";
/**
 * Badge 管理器
 * 负责管理徽章的显示、关闭和清理
 * 使用单例模式，确保全局只有一个实例
 */
declare class FXBadgeManager {
    /**
     * 单例实例
     */
    private static instance;
    /**
     * ViewController映射，存储FXView ID和对应的ViewController
     */
    private viewControllerMap;
    /**
     * 获取单例实例
     * @returns FXBadgeManager实例
     */
    static getInstance(): FXBadgeManager;
    /**
     * 显示徽章
     * @param entry 徽章显示配置
     * @returns 徽章显示项，失败返回null
     */
    show(entry: FXBadgeShowEntry): FXBadgeShowItem | null;
    /**
     * 关闭徽章
     * @param param FXView ID 或徽章显示项
     * @param closeType 关闭类型
     */
    close(param?: string | FXBadgeShowItem, closeType?: FXBadgeCloseType): void;
    /**
     * 清理指定FXView的ViewController
     * @param fxViewId FXView ID
     */
    clearViewController(fxViewId: string): void;
    /**
     * 获取或创建ViewController
     * @param fxViewId FXView ID
     * @returns ViewController
     */
    private getOrCreateViewController;
}
export default FXBadgeManager;
//# sourceMappingURL=FXBadgeManager.d.ts.map