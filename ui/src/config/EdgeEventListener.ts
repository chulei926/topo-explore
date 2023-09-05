import {Graph} from "@antv/g6";

import {v4 as uuidv4} from 'uuid';

/**
 * 配置基础事件。
 * 参考：https://g6.antv.antgroup.com/api/event
 * @param graph graph
 */

export function edgeEventListenerStart(graph: Graph) {

    graph.on('node:click', (evt: any) => {
        const {item, target} = evt;
        // debugger
        // const clickNodes = graph.findAllByState('node', 'selected');
        // console.log(clickNodes)
        // clickNodes.forEach(cn => {
        //     graph.setItemState(cn, 'selected', false);
        // });
        // graph.getNodes().forEach((node) => {
        //     graph.setItemState(node, 'selected', false);
        // });
        // const nodeItem = e.item;
        // graph.setItemState(item, 'selected', !item.hasState('selected'));
        // http://localhost:3000/public/icon/B-Leaf.svg
        // const newImg = 'http://localhost:3000/public/icon/Router.png'; // 新图片路径
        // item.update({ img: newImg });
        // console.log(target)
        // graph.setItemState(item, 'selected', true);


        // graph.update(item, {
        //     style: {
        //         background: {
        //             img: `/public/icon/Router.png`, // 背景图的路径
        //             width: 100,  // 背景图的宽度
        //             height: 100, // 背景图的高度
        //         },
        //     },
        // });

        // 获取节点的大小
        const bbox = item.getBBox();
        // 获取节点的group
        const group = item.getContainer();

        let nodeId: string = `background_${uuidv4()}`;
        const backgroundNode: any = group.addShape('node', {
            id: nodeId,
            type: 'image',
            img: `/public/icon/bg.svg`, // 背景图的路径
            size: [40, 40], // 背景图的尺寸
            zIndex: -1, // 将背景图节点置于底层
            style: {
                opacity: 0.5, // 背景图的透明度
            },
        });

        const {nodePosition} = item.getModel();
        console.log(nodePosition)
        graph.updateItem(backgroundNode, {
            position: nodePosition,
        });


        console.log('获取了节点单击事件！ item:', item, 'target:', target)
    });
    graph.on('node:drag', (evt: any) => {
        const {item, target} = evt;
        console.log('获取了节点拖拽事件！ item:', item, 'target:', target, target, '(x,y)', `(${evt.x}, ${evt.y})`)
    });

    graph.on('node:dragstart', (evt: any) => {
        const {item, target} = evt;
        console.log('获取了节点拖拽开始事件！ item:', item, 'target:', target, '(x,y)', `(${evt.x}, ${evt.y})`)
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
        // graph.setItemState(item, 'active', true);
    });

    graph.on('combo:mouseleave', (evt: any) => {
        const {item} = evt;
        // graph.setItemState(item, 'active', false);
    });
    graph.on('combo:click', (evt: any) => {
        const {item} = evt;
        // graph.setItemState(item, 'selected', true);
    });

    graph.on('canvas:click', (evt: any) => {
        graph.getCombos().forEach((combo: any) => {
            graph.clearItemStates(combo);
        });

        graph.getNodes().forEach((node) => {
            graph.setItemState(node, 'selected', false);
        });
    });
}
