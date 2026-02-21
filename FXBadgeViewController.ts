import { FXManager, logger } from "react-native-fxview";
import React from "react";
import FXBadgeView from "./FXBadgeView";
import { FXBadgeCloseType, FXBadgeFXViewCategory, FXBadgeShowItem, FXBadgeShowEntry } from "./types";

/**
 * Badge 视图控制器
 * 负责单个FXView下的徽章管理，包括显示、关闭和清理
 */
export class FXBadgeViewController {
  /**
   * FXView ID
   */
  private fxViewId: string;
  
  /**
   * 活跃的徽章数组，按添加顺序存储
   */
  private activeBadges: FXBadgeShowItem[] = [];

  /**
   * 构造函数
   * @param fxViewId FXView ID
   */
  constructor(fxViewId: string) {
    this.fxViewId = fxViewId;
  }

  /**
   * 显示徽章
   * @param entry 徽章显示配置
   * @returns 徽章显示项，失败返回null
   */
  show(entry: FXBadgeShowEntry): FXBadgeShowItem | null {
    try {
      // 创建徽章显示项
      const showItem: FXBadgeShowItem = this.createShowItem(entry);
      
      // 添加到活跃徽章数组
      this.activeBadges.push(showItem);
      
      // 显示徽章
      showItem.controller?.show();
      
      // 执行显示动画
      showItem.animationController?.show().then(() => {
        logger.info("[FXBadgeViewController] Badge shown successfully");
        // 调用 didShow 回调
        showItem.didShow?.();
      });
      
      return showItem;
    } catch (error) {
      logger.error("[FXBadgeViewController] Failed to show badge", error);
      return null;
    }
  }

  /**
   * 关闭徽章
   * @param showItem 徽章显示项（可选），不传则关闭最后一个徽章
   * @param closeType 关闭类型
   */
  close(showItem?: FXBadgeShowItem, closeType?: FXBadgeCloseType): void {
    try {
      if (showItem) {
        // 关闭指定的徽章
        this.closeItem(showItem, closeType);
      } else {
        // 关闭数组里最后一个徽章
        if (this.activeBadges.length > 0) {
          const lastItem = this.activeBadges[this.activeBadges.length - 1];
          this.closeItem(lastItem, closeType);
        }
      }
    } catch (error) {
      logger.error("[FXBadgeViewController] Failed to close badge", error);
    }
  }

  /**
   * 清理所有徽章
   */
  clear(): void {
    try {
      // 倒序遍历，避免删除元素时影响索引
      for (let i = this.activeBadges.length - 1; i >= 0; i--) {
        this.closeItem(this.activeBadges[i]);
      }
      
      // 清空数组
      this.activeBadges = [];
    } catch (error) {
      logger.error("[FXBadgeViewController] Failed to clear badges", error);
    }
  }

  /**
   * 创建徽章显示项
   * @param entry 徽章显示配置
   * @returns 徽章显示项
   */
  private createShowItem(entry: FXBadgeShowEntry): FXBadgeShowItem {
    // 生成唯一的组件ID
    const componentId = `fxbadge_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    
    // 创建徽章显示项
    const showItem: FXBadgeShowItem = {
      ...entry,
      fxViewId: this.fxViewId,
    };
    
    // 创建徽章视图引用
    const badgeViewRef = React.createRef<FXBadgeView | null>();
    showItem.badgeViewRef = badgeViewRef;
    
    // 创建徽章视图
    showItem.badgeView = React.createElement(FXBadgeView as any, {
      ...entry.badgeProps,
      ref: badgeViewRef,
      close: (closeType?: string) => {
        this.close(showItem, closeType);
      },
    });

    // 构建控制器
    showItem.controller = FXManager.build(
      showItem.badgeView,
      this.fxViewId,
      FXBadgeFXViewCategory,
      componentId,
    );
    
    return showItem;
  }

  /**
   * 关闭单个徽章
   * @param item 徽章显示项
   * @param closeType 关闭类型
   */
  private closeItem(item: FXBadgeShowItem, closeType?: FXBadgeCloseType): void {
    // 执行关闭动画
    const animationPromise =
      item.animationController?.close() || Promise.resolve();
    
    animationPromise
      .then(() => {
        logger.info(`[FXBadgeViewController] Badge closed with closeType: ${closeType}`);
      })
      .catch((error) => {
        logger.error(
          "[FXBadgeViewController] Failed to close badge animation",
          error,
        );
      })
      .finally(() => {
        // 调用 didClose 回调
        item.didClose?.(closeType);
        
        // 移除控制器
        item.controller?.remove();
        
        // 从数组中移除
        const index = this.activeBadges.indexOf(item);
        if (index > -1) {
          this.activeBadges.splice(index, 1);
        }
      });
  }
}