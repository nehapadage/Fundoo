import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';

class Reminder extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {

        };

    }

    render() {
        return (
            
                <IconButton>
                    <img src={require('../Assets/remind.svg')} alt="Logo" />
                </IconButton>

                
            
        )
    }
}
export default Reminder