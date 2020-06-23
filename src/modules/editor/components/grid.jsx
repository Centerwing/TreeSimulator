import React from 'react';
import {
    Entity,
} from 'aframe-react';
import { connect } from 'react-redux';

import {
    getLevel,
} from '../../../reducers/editor';

type Props = {
    level: number,
};

@connect(
    store => ({
        level: getLevel(store),
    })
)
class Grid extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            yPosition: this.props.level,
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.level !== this.props.level) {
            const yPosition = (nextProps.level > 0) ? nextProps.level * 21 : 0;
            this.setState({
                yPosition
            });
        }
    }
    render() {
        return (
            <Entity
                id="grid"
                geometry={{
                    primitive: 'plane',
                    width: 1500,
                    height: 1500,
                    segmentsWidth: 100,
                    segmentsHeight: 100,
                }}
                shadow={{
                    receive: false,
                    cast: false,
                }}
                material={{
                    opacity: 1,
                    transparent: false,
                    src: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1827426329,2848415270&fm=26&gp=0.jpg",
                    repeat: '100 100',
                    roughness: 1,
                    metalness: 0,
                    color: 0x696969,
                }}
                position={{ x: 0, y: this.state.yPosition, z: 0 }}
                rotation={{ x: -90, y: 0, z: 0 }}
            />
        );
    }
}

export default Grid;
