import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';

class EditNote extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {

        };

    }

    render() {
        return (

            <div>
                <IconButton>
                    <img src={require('../Assets/image.svg')} alt="Logo" />
                </IconButton>

            </div>



        )
    }
}
export default EditNote