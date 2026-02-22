import { ViewStyle, TextStyle } from "react-native";
import { FXComponentController } from "react-native-fxview";
import { FXBadgeAnimationImpl } from "./animation/FXBadgeAnimationImpl";
import FXBadgeView from "./FXBadgeView";

/**
 * 徽章类型
 */
export enum FXBadgeType {
  Dot = "dot",     // 红点类型
  Text = "text",   // 文字类型
  Custom = "custom" // 自定义类型
}

/**
 * 徽章位置
 */
export enum FXBadgePosition {
  TopRight = "topRight",     // 右上角
  TopLeft = "topLeft",       // 左上角
  BottomRight = "bottomRight", // 右下角
  BottomLeft = "bottomLeft",  // 左下角
  Center = "center"           // 中心
}

/**
 * FXView 分类
 */
export const FXBadgeFXViewCategory = "FXBadge";

/**
 * Badge 的最大行数，用于实现"无限行"的文本显示
 * 设置为一个足够大的数值以避免文本被截断
 */
export const FXBadgeMaxNumberOfLines = 99999;

/**
 * 徽章关闭类型
 * 可以是系统预定义的关闭类型，也可以是自定义的字符串
 */
export type FXBadgeCloseType = FXBadgeCloseSystemType | string;

/**
 * 系统预定义的徽章关闭类型
 */
export enum FXBadgeCloseSystemType {
  Badge = "badge",  // 徽章关闭
  Custom = "custom", // 自定义关闭
}

/**
 * 基础配置
 * 所有类型徽章的通用配置项
 */
export interface FXBadgeBaseConfiguration {
  /**
   * 徽章位置
   * @default FXBadgePosition.TopRight
   */
  position?: FXBadgePosition;
  
  /**
   * 徽章相对于目标视图的偏移
   * 单位为像素
   * @default { x: 0, y: 0 }
   */
  offset?: { x: number; y: number };
  
  /**
   * 相对于徽章自身尺寸的偏移
   * 值为0-1之间的小数
   * @default { x: 0, y: 0 }
   */
  ratioOffset?: { x: number; y: number };
  
  /**
   * 动画控制器
   * 用于自定义徽章的显示和关闭动画
   */
  animationController?: FXBadgeAnimationImpl;
  
  /**
   * 是否可点击关闭
   * @default false
   */
  clickClose?: boolean;
  
  /**
   * 显示完成回调
   */
  didShow?: () => void;
  
  /**
   * 关闭完成回调
   * @param closeType 关闭类型
   */
  didClose?: (closeType?: FXBadgeCloseType) => void;
}

/**
 * 圆点配置
 * 用于配置圆点类型的徽章
 */
export interface FXBadgeDotConfiguration extends FXBadgeBaseConfiguration {
  /**
   * 圆点颜色
   * @default "#FF3B30"
   */
  color?: string;
  
  /**
   * 圆点大小
   * 单位为像素
   * @default 8
   */
  size?: number;
  
  /**
   * 圆点半径
   * 不设置时默认等于size的一半
   */
  radius?: number;
}

/**
 * 文本配置
 * 用于配置文本类型的徽章
 */
export interface FXBadgeTextConfiguration extends FXBadgeBaseConfiguration {
  /**
   * 文本内容
   * 必需项
   */
  text: string;

  /** 
   * 最大显示行数
   * @default FXBadgeMaxNumberOfLines
   */   
  numberOfLines?: number;
  /** 
   * 文本溢出时的省略模式 
   * @default "tail"
   */
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  /**
   * 文本样式
   */
  textStyle?: TextStyle;
  /**
   * 容器样式
   */
  containerStyle?: ViewStyle;
}

/**
 * 自定义配置
 * 用于配置自定义类型的徽章
 */
export interface FXBadgeCustomConfiguration extends FXBadgeBaseConfiguration {
  /**
   * 自定义内容
   * 必需项
   */
  custom: React.ReactNode;
  
  /**
   * 容器样式
   */
  containerStyle?: ViewStyle;
}

/**
 * 徽章配置
 * 联合类型，包含所有类型的徽章配置
 */
export type FXBadgeConfiguration = FXBadgeDotConfiguration | FXBadgeTextConfiguration | FXBadgeCustomConfiguration;

/**
 * 徽章视图属性
 * 用于传递给FXBadgeView组件的属性
 */
export type FXBadgeViewProps = 
  Omit<FXBadgeConfiguration, "didShow" | "didClose"> & {
    /**
     * 徽章类型
     */
    type: FXBadgeType;
    
    /**
     * 关闭回调
     * @param closeType 关闭类型
     */
    close: (closeType?: FXBadgeCloseType) => void;
  };

/**
 * 徽章显示入口
 * 用于传递给FXBadgeManager.show()的配置
 */
export interface FXBadgeShowEntry {
  /**
   * FXView ID
   * 可选，不传则使用最新的FXView ID
   */
  fxViewId?: string;
  
  /**
   * 徽章视图属性
   */
  badgeProps: FXBadgeViewProps;
  
  /**
   * 动画控制器
   */
  animationController?: FXBadgeAnimationImpl;
  
  /**
   * 显示完成回调
   */
  didShow?: () => void;
  
  /**
   * 关闭完成回调
   * @param closeType 关闭类型
   */
  didClose?: (closeType?: FXBadgeCloseType) => void;
}

/**
 * 徽章显示项
 * 由FXBadgeManager内部使用，包含徽章的所有信息
 */
export interface FXBadgeShowItem {
  /**
   * FXView ID
   */
  fxViewId: string;
  
  /**
   * 徽章视图属性
   */
  badgeProps: FXBadgeViewProps;
  
  /**
   * 动画控制器
   */
  animationController?: FXBadgeAnimationImpl;
  
  /**
   * 显示完成回调
   */
  didShow?: () => void;
  
  /**
   * 关闭完成回调
   * @param closeType 关闭类型
   */
  didClose?: (closeType?: FXBadgeCloseType) => void;
  
  /**
   * FXComponent控制器
   */
  controller?: FXComponentController;
  
  /**
   * 徽章视图
   */
  badgeView?: React.ReactNode;
  
  /**
   * 徽章视图引用
   */
  badgeViewRef?: React.RefObject<FXBadgeView | null>;
}

/**
 * 徽章控制器
 * 用于控制已显示的徽章
 */
export interface FXBadgeController {
  /**
   * 关闭徽章
   * @param closeType 关闭类型
   */
  close: (closeType?: FXBadgeCloseType) => void;
  
  /**
   * 获取FXView ID
   * @returns FXView ID
   */
  fxViewId: () => string | undefined;
}