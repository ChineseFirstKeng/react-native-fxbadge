import { FXBadgeType, FXBadgeCloseType, FXBadgeController, FXBadgeConfiguration, FXBadgeShowItem } from "./types";
/**
 * Badge 类型构建器基类
 */
declare class FXBadgeTypeBuilder {
    protected type: FXBadgeType;
    showItem: FXBadgeShowItem | null;
    constructor(type: FXBadgeType);
    /**
     * 显示徽章
     */
    show(fxViewId: string, configuration: FXBadgeConfiguration): FXBadgeController | null;
    close(closeType?: FXBadgeCloseType): void;
}
/**
 * 圆点徽章构建器
 */
declare class FXBadgeDotBuilder extends FXBadgeTypeBuilder {
    constructor();
}
/**
 * 文本徽章构建器
 */
declare class FXBadgeTextBuilder extends FXBadgeTypeBuilder {
    constructor();
}
/**
 * 自定义徽章构建器
 */
declare class FXBadgeCustomBuilder extends FXBadgeTypeBuilder {
    constructor();
}
/**
 * Badge 主类
 */
export default class FXBadge {
    constructor();
    static dot(): FXBadgeDotBuilder;
    static text(): FXBadgeTextBuilder;
    static custom(): FXBadgeCustomBuilder;
    /**
     * 关闭所有徽章
     * @param fxViewId 指定要关闭的徽章的 fxViewId
     */
    static hideAll(fxViewId: string): void;
}
export {};
//# sourceMappingURL=FXBadge.d.ts.map