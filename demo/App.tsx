import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { FXView } from "react-native-fxview";
import {
  FXBadge,
  FXBadgePosition,
  FXBadgeAnimationImpl,
} from "react-native-fxbadge";

export default function App() {
  const [fxViewId] = useState("VVVVVV");

  // 显示圆点徽章
  const showDotBadge = () => {
    FXBadge.dot().show({
      color: "#FF3B30",
      size: 10,
      position: FXBadgePosition.TopRight,
      offset: { x: 0, y: 0 },
      didShow: () => console.log("圆点徽章显示了"),
      didClose: () => console.log("圆点徽章关闭了"),
    });
  };

  // 显示文本徽章
  const showTextBadge = () => {
    FXBadge.text().show({
      text: "1",
      containerStyle: {
        backgroundColor: "#FF3B30",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        marginRight: 4,
        marginTop: 4,
      },
      textStyle: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
      },
      position: FXBadgePosition.TopRight,
      didShow: () => console.log("文本徽章显示了"),
      didClose: () => console.log("文本徽章关闭了"),
    });
  };

  // 显示自定义徽章
  const showCustomBadge = () => {
    FXBadge.custom().show({
      custom: (
        <View
          style={{
            backgroundColor: "#FF3B30",
            height: 24,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 8,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            我草了个dj
          </Text>
        </View>
      ),
      position: FXBadgePosition.TopRight,
      didShow: () => console.log("自定义徽章显示了"),
      didClose: () => console.log("自定义徽章关闭了"),
    });
  };

  // 自定义动画类
  class CustomAnimation implements FXBadgeAnimationImpl {
    private scaleAnim = new Animated.Value(0);
    private opacityAnim = new Animated.Value(0);

    show(): Promise<void> {
      return new Promise((resolve) => {
        Animated.parallel([
          Animated.spring(this.scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.timing(this.opacityAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]).start((finished) => finished && resolve());
      });
    }

    close(): Promise<void> {
      return new Promise((resolve) => {
        Animated.parallel([
          Animated.timing(this.scaleAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(this.opacityAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]).start((finished) => finished && resolve());
      });
    }

    getStyle(): any {
      return {
        transform: [{ scale: this.scaleAnim }],
        opacity: this.opacityAnim,
      };
    }

    stop(): void {
      this.scaleAnim.stopAnimation();
      this.opacityAnim.stopAnimation();
    }
  }

  // 显示带自定义动画的徽章
  const showCustomAnimationBadge = () => {
    const customAnimation = new CustomAnimation();

    FXBadge.text().show(
      {
        text: "New",
        containerStyle: {
          backgroundColor: "#FF9500",
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 12,
        },
        textStyle: {
          color: "#FFFFFF",
          fontSize: 12,
          fontWeight: "bold",
        },
        position: FXBadgePosition.TopLeft,
        animationController: customAnimation,
        didShow: () => console.log("带自定义动画的徽章显示了"),
        didClose: () => console.log("带自定义动画的徽章关闭了"),
      },
      fxViewId,
    );
  };

  // 显示带默认样式的文本徽章
  const showDefaultTextBadge = () => {
    FXBadge.text().show(
      {
        text: "99+",
        // 不设置样式，使用默认样式
        position: FXBadgePosition.BottomRight,
      },
      fxViewId,
    );
  };

  // 显示可点击关闭的徽章
  const showClickableBadge = () => {
    FXBadge.text().show(
      {
        text: "Click",
        clickClose: true, // 启用点击关闭
        containerStyle: {
          backgroundColor: "#5856D6",
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 12,
        },
        textStyle: {
          color: "#FFFFFF",
          fontSize: 12,
          fontWeight: "bold",
        },
        position: FXBadgePosition.BottomLeft,
      },
      fxViewId,
    );
  };

  // 显示带偏移的徽章
  const showOffsetBadge = () => {
    FXBadge.dot().show(
      {
        color: "#34C759",
        size: 12,
        position: FXBadgePosition.TopRight,
        offset: { x: 0, y: 12 }, // 直接偏移
      },
      fxViewId,
    );
  };

  // 显示带比例偏移的徽章
  const showRatioOffsetBadge = () => {
    FXBadge.dot().show(
      {
        color: "#007AFF",
        size: 10,
        position: FXBadgePosition.TopLeft,
        ratioOffset: { x: 0.5, y: 0.5 }, // 比例偏移
      },
      fxViewId,
    );
  };

  // 显示中心位置的徽章
  const showCenterBadge = () => {
    FXBadge.text().show(
      {
        text: "Center",
        containerStyle: {
          backgroundColor: "#FF2D55",
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 16,
        },
        textStyle: {
          color: "#FFFFFF",
          fontSize: 14,
          fontWeight: "bold",
        },
        position: FXBadgePosition.Center,
      },
      fxViewId,
    );
  };

  // 显示自定义样式的自定义徽章
  const showCustomStyleBadge = () => {
    FXBadge.custom().show(
      {
        custom: (
          <View
            style={{
              backgroundColor: "#FFCC00",
              width: 32,
              height: 32,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2,
              borderColor: "#FFFFFF",
            }}
          >
            <Text
              style={{
                color: "#000000",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              !
            </Text>
          </View>
        ),
        position: FXBadgePosition.TopRight,
        clickClose: true,
      },
      fxViewId,
    );
  };

  // 关闭所有徽章
  const hideAllBadges = () => {
    FXBadge.clearAll(fxViewId);
    console.log("所有徽章已关闭");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* 主标题 */}
      <Text style={styles.title}>FXBadge Demo</Text>

      {/* 徽章容器 */}
      <FXView
        fxViewId={fxViewId}
        style={styles.badgeContainer}
        testID={fxViewId}
      >
        <Text style={styles.badgeContainerText}>徽章显示区域</Text>
      </FXView>

      {/* 操作按钮 */}
      <ScrollView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={showDotBadge}>
          <Text style={styles.buttonText}>显示圆点徽章</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showTextBadge}>
          <Text style={styles.buttonText}>显示文本徽章</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showCustomBadge}>
          <Text style={styles.buttonText}>显示自定义徽章</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.animationButton]}
          onPress={showCustomAnimationBadge}
        >
          <Text style={styles.buttonText}>显示带自定义动画的徽章</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button]}
          onPress={showDefaultTextBadge}
        >
          <Text style={styles.buttonText}>显示默认样式文本徽章</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button]} onPress={showClickableBadge}>
          <Text style={styles.buttonText}>显示可点击关闭的徽章</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button]} onPress={showOffsetBadge}>
          <Text style={styles.buttonText}>显示带直接偏移的徽章</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button]}
          onPress={showRatioOffsetBadge}
        >
          <Text style={styles.buttonText}>显示带比例偏移的徽章</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button]} onPress={showCenterBadge}>
          <Text style={styles.buttonText}>显示中心位置的徽章</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button]}
          onPress={showCustomStyleBadge}
        >
          <Text style={styles.buttonText}>显示自定义样式的自定义徽章</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={hideAllBadges}
        >
          <Text style={styles.clearButtonText}>关闭所有徽章</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 说明文本 */}
      <Text style={styles.description}>点击上方按钮查看不同类型的徽章效果</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  badgeContainer: {
    width: 200,
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    position: "relative",
  },
  badgeContainerText: {
    fontSize: 16,
    color: "#666",
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  clearButton: {
    backgroundColor: "#FF3B30",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  animationButton: {
    backgroundColor: "#5856D6",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
