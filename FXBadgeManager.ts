import { FXManager, logger } from "react-native-fxview";
import { FXBadgeViewController } from "./FXBadgeViewController";
import {
  FXBadgeCloseType,
  FXBadgeShowEntry,
  FXBadgeShowItem,
} from "./types";
/**
 * Badge 管理器
 * 负责管理徽章的显示、关闭和清理
 * 使用单例模式，确保全局只有一个实例
 */
class FXBadgeManager {
  /**
   * 单例实例
   */
  private static instance: FXBadgeManager;
  
  /**
   * ViewController映射，存储FXView ID和对应的ViewController
   */
  private viewControllerMap: Map<string, FXBadgeViewController> = new Map();
  
  /**
   * 获取单例实例
   * @returns FXBadgeManager实例
   */
  static getInstance(): FXBadgeManager {
    if (!FXBadgeManager.instance) {
      FXBadgeManager.instance = new FXBadgeManager();
    }
    return FXBadgeManager.instance;
  }

  /**
   * 显示徽章
   * @param entry 徽章显示配置
   * @returns 徽章显示项，失败返回null
   */
  show(entry: FXBadgeShowEntry): FXBadgeShowItem | null {
    try {
      let fxViewId = entry.fxViewId || FXManager.getLatestFXViewId();
      if (!fxViewId) {
        logger.warn("[FXBadgeManager] No available FXView");
        return null;
      }
      entry.fxViewId = fxViewId;
      const viewController = this.getOrCreateViewController(fxViewId);
      return viewController.show(entry);
    } catch (error) {
      logger.error("[FXBadgeManager] Failed to show badge", error);
      return null;
    }
  }

  /**
   * 关闭徽章
   * @param param FXView ID 或徽章显示项
   * @param closeType 关闭类型
   */
  close(param?: string | FXBadgeShowItem, closeType?: FXBadgeCloseType): void {
    try {
      let fxViewId: string | null = null;
      let showItem: FXBadgeShowItem | undefined;
      if (!param || typeof param === "string") {
        fxViewId = param ||  FXManager.getLatestFXViewId();
      } else {
        fxViewId = param.fxViewId;
        showItem = param;
      }
      if (!fxViewId) {
        logger.warn("[FXBadgeManager] No available FXView");
        return;
      }
      const viewController = this.viewControllerMap.get(fxViewId);
      if (!viewController) {
        logger.warn(
          `[FXBadgeManager] No viewController found for fxViewId: ${fxViewId}`,
        );
        return;
      }
      viewController.close(showItem, closeType);
    } catch (error) {
      logger.error("[FXBadgeManager] Failed to close badge", error);
    }
  }

  /**
   * 清理指定FXView的ViewController
   * @param fxViewId FXView ID
   */
  clearViewController(fxViewId: string): void {
    try {
      if (!fxViewId) {
        logger.warn("[FXBadgeManager] No available FXView");
        return;
      }
      
      const viewController = this.viewControllerMap.get(fxViewId);
      viewController?.clear();
      this.viewControllerMap.delete(fxViewId);
    } catch (error) {
      logger.error("[FXBadgeManager] Failed to clear badges", error);
    }
  }

  /**
   * 获取或创建ViewController
   * @param fxViewId FXView ID
   * @returns ViewController
   */
  private getOrCreateViewController(fxViewId: string): FXBadgeViewController {
    let viewController = this.viewControllerMap.get(fxViewId);

    if (!viewController) {
      viewController = new FXBadgeViewController(fxViewId);
      this.viewControllerMap.set(fxViewId, viewController);
    }

    return viewController;
  }
}

export default FXBadgeManager;