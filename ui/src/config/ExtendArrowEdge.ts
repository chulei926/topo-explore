import G6 from '@antv/g6';

export default class ExtendArrowEdge {

    static init() {
        G6.registerEdge('arrow-edge', {
            labelAutoRotate:true,
            options: {

            }
        }, 'basic-event-edge');
    }

}