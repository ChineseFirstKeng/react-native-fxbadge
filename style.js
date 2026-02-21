"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
/**
 * 徽章默认样式
 */
exports.styles = {
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
        },
        text: {
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 'bold',
        },
    },
    // 自定义徽章默认样式
    custom: {
        container: {
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
};
