import React, { Component } from "react";
import { ViewStyle } from "react-native";
import { FXBadgeViewProps } from "./types";
export default class FXBadgeView extends Component<FXBadgeViewProps> {
    private animation?;
    constructor(props: FXBadgeViewProps);
    renderDot: () => React.JSX.Element;
    renderText: () => React.JSX.Element;
    renderCustom: () => React.JSX.Element;
    renderBadgeContent: () => React.JSX.Element | null;
    getBadgePositionStyle: () => ViewStyle;
    render(): React.JSX.Element;
}
//# sourceMappingURL=FXBadgeView.d.ts.map