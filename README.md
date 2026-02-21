# react-native-fxbadge

一个灵活的React Native徽章组件，类似于fxdialog，支持圆点、文本和自定义样式，带有动画效果。

## 安装

```bash
npm install react-native-fxbadge
# 或
yarn add react-native-fxbadge
```

## 依赖

- react-native
- react-native-fxview

## 使用示例

### 导入

```typescript
import FXBadge, { FXBadgePosition } from 'react-native-fxbadge';
```

### 显示圆点徽章

```typescript
// 基本用法
const dotBadgeController = FXBadge.dot().show({
  color: '#FF3B30',
  size: 10,
  position: FXBadgePosition.TopRight,
});

// 带回调
FXBadge.dot().show({
  color: '#FF3B30',
  size: 10,
  position: FXBadgePosition.TopRight,
  didShow: () => console.log('圆点徽章显示了'),
  didClose: () => console.log('圆点徽章关闭了'),
}, 'fxViewId');
```

### 显示文本徽章

```typescript
// 默认样式
FXBadge.text().show({
  text: '99+',
  position: FXBadgePosition.BottomRight,
});

// 自定义样式
FXBadge.text().show({
  text: 'New',
  containerStyle: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  position: FXBadgePosition.TopLeft,
});
```

### 显示自定义徽章

```typescript
FXBadge.custom().show({
  custom: (
    <View style={{
      backgroundColor: '#FF3B30',
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={{
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
      }}>3</Text>
    </View>
  ),
  position: FXBadgePosition.TopRight,
});
```

### 显示可点击关闭的徽章

```typescript
FXBadge.text().show({
  text: 'Click',
  clickClose: true, // 启用点击关闭
  containerStyle: {
    backgroundColor: '#5856D6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  position: FXBadgePosition.BottomLeft,
});
```

### 显示带偏移的徽章

```typescript
// 直接偏移
FXBadge.dot().show({
  color: '#34C759',
  size: 12,
  position: FXBadgePosition.TopRight,
  offset: { x: 20, y: 20 },
});

// 比例偏移
FXBadge.dot().show({
  color: '#007AFF',
  size: 10,
  position: FXBadgePosition.TopLeft,
  ratioOffset: { x: 0.5, y: 0.5 },
});
```

### 显示中心位置的徽章

```typescript
FXBadge.text().show({
  text: 'Center',
  containerStyle: {
    backgroundColor: '#FF2D55',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  position: FXBadgePosition.Center,
});
```

### 关闭徽章

```typescript
// 关闭指定徽章
dotBadgeController?.close();

// 关闭所有徽章
FXBadge.hideAll('fxViewId');
```

## API

### FXBadge

- `static dot(): FXBadgeDotBuilder` - 获取圆点徽章构建器
- `static text(): FXBadgeTextBuilder` - 获取文本徽章构建器
- `static custom(): FXBadgeCustomBuilder` - 获取自定义徽章构建器
- `static hideAll(fxViewId: string): void` - 关闭所有徽章

### FXBadgeTypeBuilder

- `show(configuration: FXBadgeConfiguration, fxViewId?: string): FXBadgeController | null` - 显示徽章
  - `configuration`: 徽章配置
  - `fxViewId`: FXView ID (可选，不传则使用默认值)
- `close(closeType?: FXBadgeCloseType): void` - 关闭徽章

### FXBadgeController

- `close(closeType?: FXBadgeCloseType): void` - 关闭徽章
- `fxViewId(): string | undefined` - 获取FXView ID

## 配置项

### 基础配置 (FXBadgeBaseConfiguration)

- `position?: FXBadgePosition` - 徽章位置
- `offset?: { x: number; y: number }` - 直接偏移量
- `ratioOffset?: { x: number; y: number }` - 比例偏移量
- `clickClose?: boolean` - 是否可点击关闭
- `animationController?: FXBadgeAnimationController` - 动画控制器
- `didShow?: () => void` - 显示完成回调
- `didClose?: (closeType?: FXBadgeCloseType) => void` - 关闭完成回调

### 圆点配置 (FXBadgeDotConfiguration)

- 继承自基础配置
- `color?: string` - 圆点颜色
- `size?: number` - 圆点大小
- `containerStyle?: ViewStyle` - 容器样式

### 文本配置 (FXBadgeTextConfiguration)

- 继承自基础配置
- `text: string` - 文本内容
- `textStyle?: TextStyle` - 文本样式
- `containerStyle?: ViewStyle` - 容器样式

### 自定义配置 (FXBadgeCustomConfiguration)

- 继承自基础配置
- `custom: React.ReactNode` - 自定义内容
- `containerStyle?: ViewStyle` - 容器样式

## 徽章位置

```typescript
enum FXBadgePosition {
  TopRight = "topRight",     // 右上角
  TopLeft = "topLeft",       // 左上角
  BottomRight = "bottomRight", // 右下角
  BottomLeft = "bottomLeft",  // 左下角
  Center = "center"           // 中心
}
```

## 默认样式

### 圆点徽章
- 背景颜色: #FF3B30
- 大小: 8x8px
- 边框半径: 4px

### 文本徽章
- 容器: 背景颜色 #FF3B30, 水平内边距 8px, 垂直内边距 2px, 边框半径 12px, 最小宽度 20px
- 文本: 颜色 #FFFFFF, 字体大小 12px, 字体粗细 bold

## 运行示例

```bash
cd demo
npm install
npm start
```

## 构建

```bash
npm run build
```

## 许可证

MIT
# react-native-fxbadge