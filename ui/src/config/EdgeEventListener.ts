/**
 * 配置基础事件。
 * 参考：https://g6.antv.antgroup.com/api/event
 * @param graph graph
 */
export function edgeEventListenerStart(graph: any) {

    graph.on('node:click', (evt: any) => {
        const {item, target} = evt;
        console.log('获取了节点单击事件！ item:', item, 'target:', target)

    });
    graph.on('node:drag', (evt: any) => {
        const {item, target} = evt;
        console.log('获取了节点拖拽事件！ item:', item, 'target:', target, target, '(x,y)',`(${evt.x}, ${evt.y})`)
    });

    graph.on('node:dragstart', (evt: any) => {
        const {item, target} = evt;
        console.log('获取了节点拖拽开始事件！ item:', item, 'target:', target, '(x,y)',`(${evt.x}, ${evt.y})`)
    });
    graph.on('node:dragend', (evt: any) => {
        const {item, target} = evt;
        console.log('获取了节点拖拽结束事件！ item:', item, 'target:', target)
    });

    // 点击时选中，再点击时取消
    graph.on('edge:click', (ev: any) => {
        const edge: any = ev.item;
        graph.setItemState(edge, 'selected', !edge.hasState('selected')); // 切换选中
        console.log('获取了连线单击事件！ edge:', edge)
    });

    graph.on('edge:mouseenter', (ev: any) => {
        const edge: any = ev.item;
        graph.setItemState(edge, 'active', true);
    });

    graph.on('edge:mouseleave', (ev: any) => {
        const edge: any = ev.item;
        graph.setItemState(edge, 'active', false);
    });

    graph.on('combo:mouseenter', (evt: any) => {
        const {item} = evt;
        graph.setItemState(item, 'active', true);
    });

    graph.on('combo:mouseleave', (evt: any) => {
        const {item} = evt;
        graph.setItemState(item, 'active', false);
    });
    graph.on('combo:click', (evt: any) => {
        const {item} = evt;
        graph.setItemState(item, 'selected', true);
    });

    graph.on('canvas:click', (evt: any) => {
        graph.getCombos().forEach((combo: any) => {
            graph.clearItemStates(combo);
        });
    });
}
