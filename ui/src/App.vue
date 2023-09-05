<template>
	<div id="mountNode" style="background-color: #02192d"></div>
</template>

<script lang="ts" setup>
import {nextTick, ref} from 'vue'
import G6 from '@antv/g6';
import data from "./test/TopoDatas";
import customEventEdge from './config/ExtendBasicEventEdge';
import defaultNodeCfg from "./config/DefaultNodeConfig";
import defaultEdgeCfg from "./config/DefaultEdgeConfig";
import defaultNodeStateStyles from "./config/DefaultNodeStateStyles";

import multipleLabelsEdge from './config/ExtendMultipleLabelsEdge'
import {edgeEventListenerStart} from "./config/EdgeEventListener";
import defaultComboCfg from "./config/DefaultComboConfig";
import ExtendBorderImageNode from "./config/ExtendBorderImageNode";

customEventEdge.init();
multipleLabelsEdge.init();
ExtendBorderImageNode.init();

const globalGraph: any = ref(null);

nextTick(() => {
	// let muiltLines: any = [];
	// for (let i = 0; i < data.edges.length; i++) {
	// 	if (data.edges[i].target === 'CP4') {
	// 		muiltLines.push(data.edges[i])
	// 	}
	// }
	//
	// G6.Util.processParallelEdges(muiltLines);

	// const grid = new G6.Grid();
	// const minimap = new G6.Minimap();
	const toolbar = new G6.ToolBar({
		position: {x: 10, y: 10},
	});

	const w: number = document.body.clientWidth - 10;
	const h: number = document.documentElement.clientHeight - 10;
	const container = document.getElementById('mountNode');
	const graph = new G6.Graph({
		container: 'mountNode',
		width: w,
		height: h,
		animate: true,
		defaultNode: defaultNodeCfg,
		defaultEdge: defaultEdgeCfg,
		modes: {
			default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select', 'brush-select', 'hover-node'],
			custom: ['click-node', 'click-canvas']
		},
		nodeStateStyles: defaultNodeStateStyles,
		defaultCombo: defaultComboCfg,
		plugins: [toolbar], // 配置 Grid 插件和 Minimap 插件
		minZoom: 0.5,
		maxZoom: 1.5,
	});
	edgeEventListenerStart(graph);

	graph.data(data);
	graph.render();

	globalGraph.value = graph;


	if (typeof window !== 'undefined') {
		window.onresize = () => {
			if (!graph || graph.get('destroyed')) return;
			if (!container || !container.scrollWidth || !container.scrollHeight) return;
			graph.changeSize(container.scrollWidth, container.scrollHeight);
		};
	}

})

</script>

<style lang="scss" scoped>

</style>
