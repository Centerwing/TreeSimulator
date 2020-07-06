import React from 'react';
import {
    Entity,
} from 'aframe-react';
import { connect } from 'react-redux';

class Plane extends React.Component {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <Entity
                id="plane"
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
                position={{ x: 0, y: 0, z: 0 }}
                rotation={{ x: -90, y: 0, z: 0 }}
            />
        );
    }
}

export default Plane;
