import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  ViewStyle,
  LayoutChangeEvent,
  TouchableOpacity,
} from "react-native";
import {
  FXBadgeType,
  FXBadgePosition,
  FXBadgeViewProps,
  FXBadgeDotConfiguration,
  FXBadgeTextConfiguration,
  FXBadgeCustomConfiguration,
  FXBadgeCloseSystemType,
  FXBadgeMaxNumberOfLines,
} from "./types";
import { FXBadgeAnimationImpl } from "./animation/FXBadgeAnimationImpl";
import { logger } from "react-native-fxview";
import { styles } from "./style";

interface FXBadgeViewState {
  hasMeasured: boolean;
  height?: number;
  width?: number;
}

export default class FXBadgeView extends Component<FXBadgeViewProps, FXBadgeViewState> {
  private animation?: FXBadgeAnimationImpl;
  constructor(props: FXBadgeViewProps) {
    logger.info("[FXBadgeView] constructor", props);
    super(props);
    this.animation = this.props.animationController;
    this.state = {
      hasMeasured: false,
      height: undefined,
      width: undefined,
    };
  }

  // 处理布局变化事件
  handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    logger.info("[FXBadgeView] handleLayout", { width, height });
    this.setState({
      hasMeasured: true,
      height,
      width,
    });
  };
  // 渲染圆点徽章
  renderDot = () => {
    const {
      color = "#FF3B30",
      size = 8,
      radius = size * 0.5,
    } = this.props as Omit<FXBadgeDotConfiguration, "didShow" | "didClose">;
    const style = {
      backgroundColor: color,
      width: size,
      height: size,
      borderRadius: radius,
    };
    logger.info("[FXBadgeView] renderDot", { color, size, radius });
    return <View style={style} />;
  };

  // 渲染文本徽章
  renderText = () => {
    const { text, textStyle, containerStyle, numberOfLines = FXBadgeMaxNumberOfLines, ellipsizeMode = "tail" } = this.props as unknown as Omit<
      FXBadgeTextConfiguration,
      "didShow" | "didClose"
    >;
    return (
      <View style={[styles.text.container, containerStyle]}>
        <Text
          style={[styles.text.text, textStyle]}
          numberOfLines={numberOfLines}
          ellipsizeMode={ellipsizeMode}
        >
          {text}
        </Text>
      </View>
    );
  };

  // 渲染自定义徽章
  renderCustom = () => {
    const { custom, containerStyle } = this.props as unknown as Omit<
      FXBadgeCustomConfiguration,
      "didShow" | "didClose"
    >;
    return (
      <View style={[styles.custom.container, containerStyle]}>{custom}</View>
    );
  };

  // 渲染徽章内容
  renderBadgeContent = () => {
    switch (this.props.type) {
      case FXBadgeType.Dot:
        return this.renderDot();
      case FXBadgeType.Text:
        return this.renderText();
      case FXBadgeType.Custom:
        return this.renderCustom();
      default:
        return null;
    }
  };
  // 获取徽章位置样式
  getBadgePositionStyle = (): ViewStyle => {
    const {
      position = FXBadgePosition.TopRight,
      offset = { x: 0, y: 0 },
      ratioOffset = { x: 0, y: 0 },
    } = this.props || {};
    const { height = 0, width = 0 } = this.state;
    logger.info("[FXBadgeView] getBadgePositionStyle", {
      position,
      offset,
      ratioOffset,
      height,
      width,
    });
    const baseStyle: ViewStyle = {
      position: "absolute",
    };
    const totalOffsetValue = {
      x: offset.x + ratioOffset.x * width,
      y: offset.y + ratioOffset.y * height,
    } as { x: number; y: number };

    switch (position) {
      case FXBadgePosition.TopRight:
        return {
          ...baseStyle,
          top: - height * 0.5 + totalOffsetValue.y,
          right: - width * 0.5 - totalOffsetValue.x,
        };
      case FXBadgePosition.TopLeft:
        return {
          ...baseStyle,
          top: - height * 0.5 + totalOffsetValue.y,
          left: - width * 0.5 + totalOffsetValue.x,
        };
      case FXBadgePosition.BottomRight:
        return {
          ...baseStyle,
          bottom: - height * 0.5 - totalOffsetValue.y,
          right: - width * 0.5 - totalOffsetValue.x,
        };
      case FXBadgePosition.BottomLeft:
        return {
          ...baseStyle,
          bottom: - height * 0.5 - totalOffsetValue.y,
          left: - width * 0.5 + totalOffsetValue.x,
        };
      case FXBadgePosition.Center:
        return {
          ...baseStyle,
          marginTop: "50%",
          marginLeft: "50%",
          top: - height * 0.5 + totalOffsetValue.y,
          left: - width * 0.5 + totalOffsetValue.x,
        };
      default:
        return {
          ...baseStyle,
          top: - height * 0.5 + totalOffsetValue.y,
          right: - width * 0.5 - totalOffsetValue.x,
        };
    }
  };

  // 渲染徽章容器，处理点击关闭
  renderBadgeContainer = (content: React.ReactNode) => {
    const { clickClose } = this.props;
    if (clickClose) {
      return (
        <TouchableOpacity onPress={() => this.props.close?.(FXBadgeCloseSystemType.Badge)}>
          {content}
        </TouchableOpacity>
      );
    }
    return content;
  };

  render() {
    const { hasMeasured } = this.state;

    // 只负责定位和布局
    const badgePositionStyle = this.getBadgePositionStyle();

    // 只负责视觉动画变化（比如transform/opacity）
    const animationStyle = this.animation?.getStyle?.();

    logger.info("[FXBadgeView] render", hasMeasured);

    // 测量层只用布局样式，不加动画
    const measureLayer = !hasMeasured && (
      <Animated.View
        style={{
          ...badgePositionStyle, // 只加定位相关
          ...animationStyle, // 只加动画样式
          opacity: 0,
        }}
        onLayout={this.handleLayout}
      >
        {this.renderBadgeContainer(this.renderBadgeContent())}
      </Animated.View>
    );

    // 展示层外层负责定位，内层负责动画
    const displayLayer = hasMeasured && (
      <Animated.View style={[badgePositionStyle, animationStyle]}>
        {this.renderBadgeContainer(this.renderBadgeContent())}
      </Animated.View>
    );

    return (
      <React.Fragment>
        {measureLayer}
        {displayLayer}
      </React.Fragment>
    );
  }
}
