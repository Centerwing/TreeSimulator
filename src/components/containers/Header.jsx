import autobind from 'autobind-decorator';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import {
    AppBar,
    IconButton,
    Drawer,
    List,
    ListItem,
    Avatar,
    Dialog,
    FlatButton,
} from 'material-ui';
import {
    grey800,
    brown500,
} from 'material-ui/styles/colors';
import ActionInfo from 'material-ui/svg-icons/action/info';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import CallMadeIcon from 'material-ui/svg-icons/communication/call-made';
import GiftCard from 'material-ui/svg-icons/action/card-giftcard';
import CallReceivedIcon from 'material-ui/svg-icons/communication/call-received';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import SaveIcon from 'material-ui/svg-icons/content/save';
import Menu from 'material-ui/svg-icons/navigation/menu';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { OBJECTS3D } from '../../constants';
import SAMPLE from '../../constants/sample';
import {
    getLevel,
    getObjects,
} from '../../reducers/editor';
import {
    createObject,
    levelUp,
    levelDown,
} from '../../actions/editor';


type Props = {
    objects: Array<Object>,
    createObject: (string) => void,
    level: number,
    levelUp: () => void,
    levelDown: () => void,
};

injectTapEventPlugin();

@connect(
    store => ({
        level: getLevel(store),
        objects: getObjects(store),
    }),
    {
        createObject,
        levelUp,
        levelDown,
    }
)
class Header extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
            modal: false,
            isSaving: false,
        };
    }
    @autobind
    onClick3dObject(type) {
        this.props.createObject(OBJECTS3D[type]);
        this.closeDrawner();
    }

    @autobind
    openDrawner() {
        this.setState({
            open: true,
        });
    }

    @autobind
    toViewer() {
        window.location = "/viewer"
    }

    @autobind
    saveToLocalStorage() {
        const objects = this.props.objects.toJS();
        localStorage.setItem('objects', JSON.stringify(objects));
        this.setState({
            modal: true,
            isSaving: true,
        });
    }

    @autobind
    saveSampleToLocalStorage() {
        localStorage.setItem('objects', JSON.stringify(SAMPLE));
        this.setState({
            modal: true,
        });
    }

    @autobind
    resetLocalStorage() {
        localStorage.setItem('objects', JSON.stringify([]));
        this.setState({
            modal: true,
        });
    }

    @autobind
    closeSaveModal() {
        if (!this.state.isSaving) {
            location.reload();
        } else {
            this.setState({
                modal: false,
                isSaving: false,
            });
        }
    }

    @autobind
    closeDrawner() {
        this.setState({
            open: false,
        });
    }

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                primary
                onTouchTap={this.closeSaveModal}
            />,
        ];
        return (
            <div>
                <Dialog
                    actions={actions}
                    open={this.state.modal}
                    onRequestClose={this.closeSaveModal}
                    repositionOnUpdate
                >
                    Local storage updated!
                </Dialog>
                <AppBar
                    style={{
                        backgroundColor: grey800,
                    }}
                    iconElementRight={
                        <div>
                            <IconButton
                                tooltip="Load Sample"
                                tooltipPosition="bottom-center"
                                style={{
                                    width: '32px',
                                    padding: '12px 6px',
                                    marginRight: '12px',
                                }}
                                onClick={this.saveSampleToLocalStorage}
                            >
                                <GiftCard
                                    color="#ffffff"
                                />
                            </IconButton>
                            <IconButton
                                tooltip="See by viewer"
                                tooltipPosition="bottom-center"
                                style={{
                                    width: '32px',
                                    padding: '12px 6px',
                                    marginRight: '12px',
                                    color: 'white',
                                }}
                                onClick={this.toViewer}
                            >
                                <VisibilityIcon
                                    color='white'
                                />
                            </IconButton>
                            <IconButton
                                tooltip="Save to local storage"
                                tooltipPosition="bottom-center"
                                style={{
                                    width: '32px',
                                    padding: '12px 6px',
                                    marginRight: '12px',
                                }}
                                onClick={this.saveToLocalStorage}
                            >
                                <SaveIcon
                                    color="#ffffff"
                                />
                            </IconButton>
                            <IconButton
                                tooltip="reset local storage"
                                tooltipPosition="bottom-center"
                                style={{
                                    width: '32px',
                                    padding: '12px 6px',
                                    marginRight: '12px',
                                }}
                                onClick={this.resetLocalStorage}
                            >
                                <DeleteIcon
                                    color="#ffffff"
                                />
                            </IconButton>
                            <IconButton
                                tooltip="Level up"
                                tooltipPosition="bottom-center"
                                style={{
                                    width: '32px',
                                    padding: '12px 0px',
                                }}
                                onClick={this.props.levelUp}
                            >
                                <CallMadeIcon
                                    color="#ffffff"
                                />
                            </IconButton>
                            <IconButton
                                tooltip="Level Down"
                                tooltipPosition="bottom-center"
                                style={{
                                    width: '32px',
                                    padding: '12px 0px',
                                }}
                                onClick={this.props.levelDown}
                            >
                                <CallReceivedIcon
                                    color="#ffffff"
                                />
                            </IconButton>
                            <span
                                style={{
                                    verticalAlign: 'middle',
                                    display: 'inline-block',
                                    height: '32px',
                                    color: '#ffffff',
                                }}
                            >
                                {this.props.level}
                            </span>
                        </div>

                    }
                    iconElementLeft={
                        <IconButton onClick={this.openDrawner} >
                            <Menu color="#ffffff" />
                        </IconButton>
                    }
                />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={this.closeDrawner}
                >
                    <List>
                        <ListItem
                            onClick={() => {
                                this.onClick3dObject('WALL');
                            }}
                            leftAvatar={
                                <Avatar
                                    icon={
                                        <FontAwesome
                                            name="cube"
                                            size="2x"
                                        />
                                    }
                                    backgroundColor={brown500}
                                />
                            }
                            primaryText="Wall"
                            secondaryText="Create a wall"
                        />
                        <ListItem
                            onClick={() => {
                                this.onClick3dObject('WINDOW');
                            }}
                            leftAvatar={
                                <Avatar
                                    icon={
                                        <FontAwesome
                                            name="cube"
                                            size="2x"
                                        />
                                    }
                                    backgroundColor={brown500}
                                />
                            }
                            primaryText="Window"
                            secondaryText="Create a Window"
                        />
                        <ListItem
                            onClick={() => {
                                this.onClick3dObject('FLOOR');
                            }}
                            leftAvatar={
                                <Avatar
                                    icon={
                                        <FontAwesome
                                            name="th"
                                            size="2x"
                                        />
                                    }
                                    backgroundColor={brown500}
                                />
                            }
                            primaryText="Floor"
                            secondaryText="Create a floor"
                        />
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default Header;
