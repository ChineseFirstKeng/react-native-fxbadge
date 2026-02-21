import { ViewStyle } from "react-native";
/**
 * 动画控制器接口
 * 所有需要队列管理的 UI 组件都必须实现此接口
 */
export interface FXBadgeAnimationImpl {
    /**
     * 执行显示动画
     * @returns Promise，在动画完成时 resolve
     */
    show(): Promise<void>;
    /**
     * 执行关闭动画
     * @returns Promise，在动画完成时 resolve
     */
    close(): Promise<void>;
    /**
     * 获取动画配置
     */
    getStyle(): ViewStyle;
    /**
     * 立即停止所有动画并重置状态
     */
    stop?(): void;
}
//# sourceMappingURL=FXBadgeAnimationImpl.d.ts.map