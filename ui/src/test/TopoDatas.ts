import extendBoxLabelEdgeCfg from "../config/ExtendBoxLabelEdgeCfg";

const genNode = (name: string, startX: number, startY: number, incrX: number, incrY: number, count: number) => {
    let nodes: any = [];
    let x: number = startX, y: number = startY;
    for (let i = 0; i < count; i++) {
        nodes.push({
            id: `${name}${count == 1 ? '' : i + 1}`,
            x: x,
            y: y,
            img: `/public/icon/${name}.svg`,
            type: 'image',
            size: 30,
            label: `${name}${count == 1 ? '' : i + 1}`,
            comboId: `${name}_combo`,
        });
        x += incrX;
        y += incrY;
    }
    return nodes;
}


const genLine = (nodes1: [], nodes2: [], arrow: boolean = false) => {
    let lines: any = [];
    for (let i = 0; i < nodes1.length; i++) {
        let node1: any = nodes1[i];
        for (let j = 0; j < nodes2.length; j++) {
            let node2: any = nodes2[j];
            if (arrow) {
                lines.push({
                    source: node1.id, // 起始点 id
                    target: node2.id, // 目标点 id
                    type: 'line',
                    style: {
                        startArrow: false,
                        endArrow: true
                    },
                    labelCfg: extendBoxLabelEdgeCfg.labelCfg
                });
            } else {
                lines.push({
                    source: node1.id, // 起始点 id
                    target: node2.id, // 目标点 id
                    type: 'line',
                    label: '+3',
                    labelCfg: extendBoxLabelEdgeCfg.labelCfg
                });
            }

        }
    }
    return lines;
}


const genCombo = (id: string, parentId: string = '') => {
    let combo: any = {
        id: `${id}_combo`,
        padding: 15,
        style: {
            fill: '#253747',
            // shadowColor: '#253747',
            lineWidth: 0,
            opacity: 0.5,
            fillOpacity: 0.5,
            cursor: 'pointer',

        }
    };
    if (parentId && parentId.length > 0) {
        combo.parentId = parentId;
    }
    return combo;
}
////////////////////////////////////////////////////////////////////////////////////////////////
let CP = genNode('CP', 100, 200, 0, 50, 4);
let HOST = genNode('HOST', 200, 200, 0, 50, 4);
let TOR = genNode('TOR', 300, 50, 0, 50, 10);
let EOR = genNode('EOR', 400, 200, 0, 50, 4);
let DCGW = genNode('DCGW', 500, 200, 0, 50, 4);
let SLeaf = genNode('S-Leaf', 600, 200, 0, 50, 4);
let SuperSpine = genNode('Super-Spine', 700, 250, 50, 0, 2);

let BLeaf = genNode('B-Leaf', 830, 150, 50, 0, 2);
let _163 = genNode('163', 700, 50, 0, 0, 1);
let CN2 = genNode('CN2', 850, 50, 0, 0, 1);

let vBASE_pU = genNode('vBASE-pU', 400, 550, 0, 50, 4);
let Spine = genNode('Spine', 550, 600, 50, 0, 2);
let Region = genNode('Region', 500, 700, 50, 0, 4);

////////////////////////////////////////////////////////////////////////////////////////////////
let CP_HOST = genLine(CP, HOST, true);
let HOST_TOR = genLine(HOST, TOR);
let TOR_EOR = genLine(TOR, EOR);
let EOR_DCGW = genLine(EOR, DCGW);
let DCGW_SLeaf = genLine(DCGW, SLeaf);
let SLeaf_SuperSpine = genLine(SLeaf, SuperSpine);
let SuperSpine_Bleaf = genLine(SuperSpine, BLeaf);
let SuperSpine_163 = genLine(SuperSpine, _163);
let Bleaf_CN2 = genLine(BLeaf, CN2);

let vBASE_pU_Spine = genLine(vBASE_pU, Spine);
let Spine_Region = genLine(Spine, Region);

let SuperSpine_Spine = genLine(SuperSpine, Spine);

////////////////////////////////////////////////////////////////////////////////////////////////
let CP_COMBO = genCombo('CP');
let HOST_COMBO = genCombo('HOST');
let TOR_COMBO = genCombo('TOR');
let EOR_COMBO = genCombo('EOR');
let DCGW_COMBO = genCombo('DCGW');
let SLeaf_COMBO = genCombo('S-Leaf');
let SuperSpine_COMBO = genCombo('Super-Spine');
let BLEAF_COMBO = genCombo('B-Leaf');


let POD1_COMBO = genCombo('POD1');
let vBASE_pU_COMBO = genCombo('vBASE-pU', POD1_COMBO.id);
let Spine_COMBO = genCombo('Spine', POD1_COMBO.id);
let Region_COMBO = genCombo('Region', POD1_COMBO.id);


////////////////////////////////////////////////////////////////////////////////////////////////
const data: any = {
    nodes: [
        ...CP,
        ...HOST,
        ...TOR,
        ...EOR,
        ...DCGW,
        ...SLeaf,
        ...SuperSpine,
        ...BLeaf,
        ..._163,
        ...CN2,

        ...vBASE_pU,
        ...Spine,
        ...Region,
    ],
    // 边集
    edges: [
        ...CP_HOST,
        ...HOST_TOR,
        ...TOR_EOR,
        ...EOR_DCGW,
        ...DCGW_SLeaf,
        ...SLeaf_SuperSpine,
        ...SuperSpine_Bleaf,
        ...SuperSpine_163,
        ...Bleaf_CN2,

        ...vBASE_pU_Spine,
        ...Spine_Region,
        ...SuperSpine_Spine,

        // {
        //     source: 'CP1', // 起始点 id
        //     target: 'CP2', // 目标点 id
        //     type: 'basic-event-edge',
        //     label: '+100', // 边的文本
        //     style: {
        //         startArrow: false,
        //         endArrow: true
        //     },
        //     labelCfg: extendBoxLabelEdgeCfg.labelCfg
        // },
        // {
        //     source: 'CP2', // 起始点 id
        //     target: 'CP3', // 目标点 id
        //     type: 'line',
        //     label: '+200',
        //     labelCfg: extendBoxLabelEdgeCfg.labelCfg
        // },
        // {
        //     source: 'CP1', // 起始点 id
        //     target: 'CP3', // 目标点 id
        //     type: 'multiple-labels-edge',
        //     label: ['hello', 'world']
        // },
    ],
    combos: [
        CP_COMBO,
        HOST_COMBO,
        TOR_COMBO,
        EOR_COMBO,
        DCGW_COMBO,
        SLeaf_COMBO,
        SuperSpine_COMBO,
        BLEAF_COMBO,

        vBASE_pU_COMBO,
        Spine_COMBO,
        Region_COMBO,

        POD1_COMBO,

    ]

};

// for (let i = 0; i < 5; i++) {
//     data.edges.push({
//         source: 'CP2', // 起始点 id
//         target: 'CP4', // 目标点 id
//         type: 'line',
//         label: `${i}th edge of 2-4`,
//         labelCfg: {
//             autoRotate: true,
//             style: {
//                 fill: '#ffffff',
//                 fontSize: 14
//             },
//         },
//     });
// }

export default data;