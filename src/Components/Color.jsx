import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';

class Color extends Component {

    constructor(props) {
        super(props);
        // console.log("Props are====>",this.props);

        this.state = {

        };

    }

    render() {
        return (
            
                <IconButton>
                    <img src={require('../Assets/color.svg')} alt="Logo" />
                </IconButton>

                
            
        )
    }
}
export default Color