import React from 'react';
import {
    Entity,
} from 'aframe-react';
import * as THREE from 'three';

type Props = {
    uuid: string,
    position: Object,
    rotation: Object,
    _onRef: () => void,
    notAllowed: boolean,
    isGhost: boolean,
    willSelected: boolean,
};

class Tree extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Entity
                uuid={this.props.uuid}
                type="TREE"
                position={this.props.position}
                rotation={this.props.rotation}
                _ref={this.props._onRef}
            >
                <Entity
                    uuid={this.props.uuid}
                    type="Tree"
                    geometry={{
                        primitive: 'box',
                        buffer: true,
                        width: 10,
                        height: 20,
                        depth: 1,
                    }}
                    shadow={{
                        receive: true,
                        cast: true,
                    }}
                    material={{
                        color: (this.props.notAllowed || this.props.willSelected) ? 0x0288d1 : 0x8d6e63,
                        transparent: this.props.isGhost,
                        opacity: (this.props.isGhost) ? 0.5 : 1,
                    }}
                    position={{
                        x: 0,
                        y: 0,
                        z: 5,
                    }}
                    // rotation={this.props.rotation}
                    _ref={this.props._onRef}
                />
            </Entity>
        );
    }
}

export default Tree;
