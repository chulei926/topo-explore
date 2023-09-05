import G6 from "@antv/g6";

/**
 * 带事件的边
 */
export default class ExtendBorderImageNode {
    static init() {
        // 基于 line 扩展出新的边
        G6.registerEdge('border-image-node', {

            // 响应状态变化
            setState(name, value, item:any) {
                const group = item.getContainer();
                const shape = group.get('children')[0]; // 顺序根据 draw 时确定
                if (name === 'selected') {
                    if (value) {
                        shape.attr('fill', 'red');
                    } else {
                        shape.attr('fill', 'white');
                    }
                }
            },
        });
    }
}