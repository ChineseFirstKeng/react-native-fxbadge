import { ViewStyle, TextStyle } from "react-native";
import { FXComponentController } from "react-native-fxview";
import { FXBadgeAnimationImpl } from "./animation/FXBadgeAnimationImpl";
import FXBadgeView from "./FXBadgeView";
export declare enum FXBadgeType {
    Dot = "dot",// 红点
    Text = "text",// 文字
    Custom = "custom"
}
export declare enum FXBadgePosition {
    TopRight = "topRight",// 右上角
    TopLeft = "topLeft",// 左上角
    BottomRight = "bottomRight",// 右下角
    BottomLeft = "bottomLeft",// 左下角
    Center = "center"
}
export declare const FXBadgeFXViewCategory = "FXBadge";
export type FXBadgeCloseType = FXBadgeCloseSystemType | string;
export declare enum FXBadgeCloseSystemType {
    Custom = "custom",
    Auto = "auto"
}
export interface FXBadgeBaseConfiguration {
    position?: FXBadgePosition;
    offset?: {
        x: number;
        y: number;
    };
    animationController?: FXBadgeAnimationImpl;
    clickBackgroundClose?: boolean;
    didShow?: () => void;
    didClose?: (closeType?: FXBadgeCloseType) => void;
}
export interface FXBadgeDotConfiguration extends FXBadgeBaseConfiguration {
    color?: string;
    size?: number;
}
export interface FXBadgeTextConfiguration extends FXBadgeBaseConfiguration {
    text: string;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
}
export interface FXBadgeCustomConfiguration extends FXBadgeBaseConfiguration {
    custom: React.ReactNode;
    containerStyle?: ViewStyle;
}
export type FXBadgeConfiguration = FXBadgeDotConfiguration | FXBadgeTextConfiguration | FXBadgeCustomConfiguration;
export type FXBadgeViewProps = Omit<FXBadgeConfiguration, "didShow" | "didClose"> & {
    type: FXBadgeType;
    close: (closeType?: FXBadgeCloseType) => void;
};
export interface FXBadgeShowEntry {
    fxViewId: string;
    badgeProps: FXBadgeViewProps;
    animationController?: FXBadgeAnimationImpl;
    didShow?: () => void;
    didClose?: (closeType?: FXBadgeCloseType) => void;
}
export type FXBadgeShowItem = FXBadgeShowEntry & {
    controller?: FXComponentController;
    badgeView?: React.ReactNode;
    badgeViewRef?: React.RefObject<FXBadgeView | null>;
};
export interface FXBadgeController {
    close: (closeType?: FXBadgeCloseType) => void;
    fxViewId: () => string | undefined;
}
//# sourceMappingURL=types.d.ts.map