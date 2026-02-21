import React, { Component } from "react";
import { ViewStyle, LayoutChangeEvent } from "react-native";
import { FXBadgeViewProps } from "./types";
interface FXBadgeViewState {
    hasMeasured: boolean;
    height?: number;
    width?: number;
}
export default class FXBadgeView extends Component<FXBadgeViewProps, FXBadgeViewState> {
    private animation?;
    constructor(props: FXBadgeViewProps);
    handleLayout: (event: LayoutChangeEvent) => void;
    renderDot: () => React.JSX.Element;
    renderText: () => React.JSX.Element;
    renderCustom: () => React.JSX.Element;
    renderBadgeContent: () => React.JSX.Element | null;
    getBadgePositionStyle: () => ViewStyle;
    renderBadgeContainer: (content: React.ReactNode) => string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
    render(): React.JSX.Element;
}
export {};
//# sourceMappingURL=FXBadgeView.d.ts.map