import React from "react";
import { logger } from "react-native-fxview";
import {
  FXBadgeType,
  FXBadgeCloseType,
  FXBadgeController,
  FXBadgeConfiguration,
  FXBadgeShowEntry,
  FXBadgeShowItem,
  FXBadgeTextConfiguration,
  FXBadgeDotConfiguration,
  FXBadgeCustomConfiguration,
  FXBadgeCloseSystemType,
} from "./types";
import FXBadgeManager from "./FXBadgeManager";

/**
 * Badge 类型构建器基类
 * @template T - 徽章配置类型
 */
class FXBadgeTypeBuilder<T extends FXBadgeConfiguration> {
  /**
   * 徽章类型
   */
  protected type: FXBadgeType;
  
  /**
   * 徽章显示项
   */
  showItem: FXBadgeShowItem | null = null;

  /**
   * 构造函数
   * @param type 徽章类型
   */
  constructor(type: FXBadgeType) {
    this.type = type;
  }

  /**
   * 显示徽章
   * @param configuration 徽章配置
   * @param fxViewId FXView ID（可选）
   * @returns 徽章控制器，失败返回null
   */
  show(configuration: T, fxViewId?: string): FXBadgeController | null {
    logger.info("[FXBadgeTypeBuilder] show", fxViewId, configuration);
    try {
      // 提取回调函数和其他配置
      const { didShow, didClose, ...restConfig } = configuration;
      
      // 创建徽章显示配置
      const entry: FXBadgeShowEntry = {
        fxViewId: fxViewId,
        didShow: didShow,
        didClose: didClose,
        animationController: restConfig.animationController,
        badgeProps: {
          ...restConfig,
          type: this.type,
          close: (closeType?: FXBadgeCloseType) => {
            this.close(closeType);
          }
        },
      };

      // 显示徽章
      const showItem = FXBadgeManager.getInstance().show(entry);
      this.showItem = showItem || null;

      // 检查show操作是否成功
      if (!showItem) {
        logger.error(
          "[FXBadge] Failed to show badge: FXBadgeManager.show() returned null",
        );
        return null;
      }

      // 返回徽章控制器
      return {
        close: (closeType?: FXBadgeCloseType) => this.close(closeType),
        fxViewId: () => this.showItem?.fxViewId || "",
      };
    } catch (error) {
      logger.error("[FXBadge] Failed to show badge", error);
      return null;
    }
  }

  /**
   * 关闭徽章
   * @param closeType 关闭类型
   */
  close(closeType?: FXBadgeCloseType) {
    logger.log("[FXBadgeTypeBuilder] close", closeType);
    FXBadgeManager.getInstance().close(this.showItem || undefined, closeType);
  }
}

/**
 * 圆点徽章构建器
 * 用于创建和显示圆点类型的徽章
 */
class FXBadgeDotBuilder extends FXBadgeTypeBuilder<FXBadgeDotConfiguration> {
  /**
   * 构造函数
   */
  constructor() {
    super(FXBadgeType.Dot);
  }
}

/**
 * 文本徽章构建器
 * 用于创建和显示文本类型的徽章
 */
class FXBadgeTextBuilder extends FXBadgeTypeBuilder<FXBadgeTextConfiguration> {
  /**
   * 构造函数
   */
  constructor() {
    super(FXBadgeType.Text);
  }
}

/**
 * 自定义徽章构建器
 * 用于创建和显示自定义类型的徽章
 */
class FXBadgeCustomBuilder extends FXBadgeTypeBuilder<FXBadgeCustomConfiguration> {
  /**
   * 构造函数
   */
  constructor() {
    super(FXBadgeType.Custom);
  }
}

/**
 * Badge 主类
 * 提供创建和管理徽章的静态方法
 */
export default class FXBadge {
  /**
   * 构造函数
   */
  constructor() {
    // 空构造函数
  }

  /**
   * 获取圆点徽章构建器
   * @returns 圆点徽章构建器
   */
  static dot(): FXBadgeDotBuilder {
    return new FXBadgeDotBuilder();
  }

  /**
   * 获取文本徽章构建器
   * @returns 文本徽章构建器
   */
  static text(): FXBadgeTextBuilder {
    return new FXBadgeTextBuilder();
  }

  /**
   * 获取自定义徽章构建器
   * @returns 自定义徽章构建器
   */
  static custom(): FXBadgeCustomBuilder {
    return new FXBadgeCustomBuilder();
  }

  /**
   * 静态函数关闭徽章，关闭的是最近展示出来的那个。触发关闭徽章，并不是关闭完成。转发给 FXBadgeManager
   * @param fxViewId 可选，指定要关闭的徽章的 fxViewId
   */
  static close(fxViewId?: string, closeType?: FXBadgeCloseType) {
    try {
      logger.log("[FXBadge] static close", fxViewId);
      FXBadgeManager.getInstance().close(
        fxViewId,
        closeType || FXBadgeCloseSystemType.Custom,
      );
    } catch (error) {
      logger.error("[FXBadge] Failed to close badge", error);
    }
  }

  /**
   * 关闭所有徽章
   * @param fxViewId 指定要关闭的徽章的 fxViewId
   */
  static clearAll(fxViewId: string): void {
    try {
      logger.log("[FXBadge] clearAll", fxViewId);
      FXBadgeManager.getInstance().clearViewController(fxViewId);
    } catch (error) {
      logger.error("[FXBadge] Failed to clear badges", error);
    }
  }
}