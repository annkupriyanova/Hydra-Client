import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap'

const NavBar = ({onClickMusic, onClickSports}) => {
    return (
        <ButtonGroup>
            <Button className="Button" bsStyle="primary" onClick={ onClickMusic }>Music</Button>
            <Button className="Button" bsStyle="primary" onClick={ onClickSports }>Sport</Button>
        </ButtonGroup>
    )
}

export default NavBar