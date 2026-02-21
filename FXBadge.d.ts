import { FXBadgeType, FXBadgeCloseType, FXBadgeController, FXBadgeConfiguration, FXBadgeShowItem, FXBadgeTextConfiguration, FXBadgeDotConfiguration, FXBadgeCustomConfiguration } from "./types";
/**
 * Badge 类型构建器基类
 * @template T - 徽章配置类型
 */
declare class FXBadgeTypeBuilder<T extends FXBadgeConfiguration> {
    /**
     * 徽章类型
     */
    protected type: FXBadgeType;
    /**
     * 徽章显示项
     */
    showItem: FXBadgeShowItem | null;
    /**
     * 构造函数
     * @param type 徽章类型
     */
    constructor(type: FXBadgeType);
    /**
     * 显示徽章
     * @param configuration 徽章配置
     * @param fxViewId FXView ID（可选）
     * @returns 徽章控制器，失败返回null
     */
    show(configuration: T, fxViewId?: string): FXBadgeController | null;
    /**
     * 关闭徽章
     * @param closeType 关闭类型
     */
    close(closeType?: FXBadgeCloseType): void;
}
/**
 * 圆点徽章构建器
 * 用于创建和显示圆点类型的徽章
 */
declare class FXBadgeDotBuilder extends FXBadgeTypeBuilder<FXBadgeDotConfiguration> {
    /**
     * 构造函数
     */
    constructor();
}
/**
 * 文本徽章构建器
 * 用于创建和显示文本类型的徽章
 */
declare class FXBadgeTextBuilder extends FXBadgeTypeBuilder<FXBadgeTextConfiguration> {
    /**
     * 构造函数
     */
    constructor();
}
/**
 * 自定义徽章构建器
 * 用于创建和显示自定义类型的徽章
 */
declare class FXBadgeCustomBuilder extends FXBadgeTypeBuilder<FXBadgeCustomConfiguration> {
    /**
     * 构造函数
     */
    constructor();
}
/**
 * Badge 主类
 * 提供创建和管理徽章的静态方法
 */
export default class FXBadge {
    /**
     * 构造函数
     */
    constructor();
    /**
     * 获取圆点徽章构建器
     * @returns 圆点徽章构建器
     */
    static dot(): FXBadgeDotBuilder;
    /**
     * 获取文本徽章构建器
     * @returns 文本徽章构建器
     */
    static text(): FXBadgeTextBuilder;
    /**
     * 获取自定义徽章构建器
     * @returns 自定义徽章构建器
     */
    static custom(): FXBadgeCustomBuilder;
    /**
     * 静态函数关闭徽章，关闭的是最近展示出来的那个。触发关闭徽章，并不是关闭完成。转发给 FXBadgeManager
     * @param fxViewId 可选，指定要关闭的徽章的 fxViewId
     */
    static close(fxViewId?: string, closeType?: FXBadgeCloseType): void;
    /**
     * 关闭所有徽章
     * @param fxViewId 指定要关闭的徽章的 fxViewId
     */
    static clearAll(fxViewId: string): void;
}
export {};
//# sourceMappingURL=FXBadge.d.ts.map