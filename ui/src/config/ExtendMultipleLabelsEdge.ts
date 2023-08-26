import G6 from '@antv/g6';

export default class ExtendMultipleLabelsEdge {

    static init() {
        G6.registerEdge('multiple-labels-edge', {
            options: {
                style: {
                    stroke: '#000',
                },
            },
            labelAutoRotate: true,
            draw(cfg: any, group: any) {
                const startPoint: any = cfg.startPoint;
                const endPoint: any = cfg.endPoint;
                const stroke: any = (cfg.style && cfg.style.stroke) || this.options?.style?.stroke;

                const shape = group.addShape('path', {
                    attrs: {
                        stroke,
                        path: [
                            ['M', startPoint.x, startPoint.y],
                            ['L', endPoint.x, endPoint.y],
                        ],
                    },
                    name: 'path-shape',
                });
                if (cfg.label && cfg.label.length) {
                    // the left label
                    group.addShape('text', {
                        attrs: {
                            text: cfg.label[0],
                            fill: '#595959',
                            textAlign: 'start',
                            textBaseline: 'middle',
                            x: startPoint.x,
                            y: startPoint.y - 10,
                        },
                        name: 'left-text-shape',
                    });
                    if (cfg.label.length > 1) {
                        // the right label
                        group.addShape('text', {
                            attrs: {
                                text: cfg.label[1],
                                fill: '#595959',
                                textAlign: 'end',
                                textBaseline: 'middle',
                                x: endPoint.x,
                                y: endPoint.y - 10,
                            },
                            name: 'right-text-shape',
                        });
                    }
                }
                // return the keyShape
                return shape;
            },

        }, 'line');
    }

}