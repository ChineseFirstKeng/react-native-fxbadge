import { TextStyle, ViewStyle } from "react-native";

/**
 * 徽章默认样式
 */
export const styles = {
  // 文本徽章默认样式
  text: {
    container: {
      backgroundColor: '#FF3B30',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
      minWidth: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      height: "100%",
    } as ViewStyle,
    text: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'bold',
    } as TextStyle,
  },
  // 自定义徽章默认样式
  custom: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
  },
};