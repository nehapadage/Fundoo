
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Checkbox from '@material-ui/core/Checkbox';
import { updateNoteStatus, addLabelOnNote, deleteLabelFromNote } from '../services/services'

const styles = theme => ({
    typography: {
        margin: theme.spacing(2),
    },
});
export default withStyles(styles)(
    class MoreButton extends React.Component {
        state = {
            anchorEl: null,
            open: false,
            openLabelMenu: false,
            noteLabels: []
        };

        componentWillReceiveProps(nextProps) {
            this.setState({
                noteLabels: nextProps.noteProps.label
            })
        }

        componentDidMount() {
            this.setState({
                noteLabels: this.props.noteProps.label
            })
        }

        /**
        * @description : handle anchorEl
        * notesArray: set anchorEl state with current event
        */
        handleClick = event => {
            this.setState({
                anchorEl: event.currentTarget, open: true
            });
        };

        /**
        * @description : handle anchorEl
        * notesArray: set anchorEl state with null
        */
        handleClose = () => {
            this.setState({ anchorEl: null, open: false, openLabelMenu: false });
        };

        /**
        * @description : handle delete note api
        */
        handleDeleteNote = () => {
            this.setState({ open: false, openLabelMenu: false });
            let noteData = {
                "noteId": this.props.noteProps._id,
                "isTrash": true
            }
            updateNoteStatus(noteData).then((data) => {
                console.log(data);
                this.props.refresh()
            }).catch((err) => {
                console.log(err);

            })

        }

        handleAddLabelMenu = () => {
            this.setState({ open: false, openLabelMenu: true });
        }

        handleChange = (event) => {
            const item = event.target.name;
            const isChecked = event.target.checked;
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        }

        checkedEvent = (event, labelObject) => {
            if (event.target.checked) {
                this.setState({ open: false });
                let noteData = {
                    "noteId": this.props.noteProps._id,
                    "labelId": labelObject._id
                }
                addLabelOnNote(noteData).then((data) => {
                    console.log(data);
                    this.props.refresh()
                }).catch((err) => {
                    console.log(err);

                })

            } else {
                for (let i = 0; i < this.state.noteLabels.length; i++) {

                    if (this.state.noteLabels[i]._id === labelObject._id) {
                        this.state.noteLabels.splice(i, 1)
                    }
                }
                this.setState({ noteLabels: this.state.noteLabels });
                let requestObject = {
                    noteId: this.props.noteProps._id,
                    labelId: labelObject._id
                }
                deleteLabelFromNote(requestObject).then((data) => {
                    console.log("label deleted", data);
                    this.props.refresh()
                })
            }

        }
        render() {
            const { anchorEl } = this.state;
            return (
                <div align="center">
                    <Button
                        onClick={this.handleClick}
                    >
                        <MoreVertIcon />
                    </Button>

                    <Popover
                        open={this.state.open}
                        anchorEl={anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        style={{ width: '12%' }}
                    >
                        <MenuList>
                            <MenuItem onClick={this.handleDeleteNote}>Delete note</MenuItem>
                            <MenuItem onClick={this.handleAddLabelMenu}>Add label</MenuItem>
                        </MenuList>
                    </Popover>

                    <Popover
                        open={this.state.openLabelMenu}
                        anchorEl={anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        style={{ width: '50%' }}
                    >
                        <MenuList>
                            {this.props.labelArray.map((labelObject, index) => (
                                <div className="labelPopover" key={index}>
                                    <Checkbox
                                        checked={this.state.noteLabels.find((choice) => choice._id === labelObject._id)}
                                        onClick={(event) => this.checkedEvent(event, labelObject)}
                                    />
                                    <label className="labelNameStyle" >{labelObject.labelName}</label>
                                </div>
                            ))}
                        </MenuList>
                    </Popover>
                </div>
            );
        }
    }
)