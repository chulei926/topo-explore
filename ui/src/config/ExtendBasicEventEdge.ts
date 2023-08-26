import G6 from '@antv/g6';

/**
 * 带事件的边
 */
export default class ExtendBasicEventEdge {
    static init() {
        // 基于 line 扩展出新的边
        G6.registerEdge('basic-event-edge', {
                setState(name, value, item: any) {
                    const group = item.getContainer();
                    const shape = group.get('children')[0];
                    if (name === 'active') {
                        if (value) {
                            shape.attr('stroke', 'red');
                        } else {
                            shape.attr('stroke', '#195054');
                        }
                    }
                    if (name === 'selected') {
                        if (value) {
                            shape.attr('lineWidth', 5);
                        } else {
                            shape.attr('lineWidth', 2);
                        }
                    }
                },
            },
            'line',
        );
    }
}