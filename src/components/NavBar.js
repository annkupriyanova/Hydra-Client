import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap'

const NavBar = ({onClickMusic, onClickSports}) => {
    return (
        <ButtonGroup>
            <Button bsStyle="link" onClick={ onClickMusic }>Music</Button>
            <Button bsStyle="link" onClick={ onClickSports }>Sport</Button>
        </ButtonGroup>
    )
}

export default NavBar