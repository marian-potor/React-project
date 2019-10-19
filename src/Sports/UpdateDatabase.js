import React from 'react';
import Axios from 'axios';

function UpdateDatabase (props) {
    const lastSelection = props.lastSelection;
    Axios.post('http://localhost:3003/lastSelection', lastSelection);
    return <p></p>
}

export default UpdateDatabase