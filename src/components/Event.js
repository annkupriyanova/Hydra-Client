import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Event = ({ name, url, handleShowModal }) => (
    <tr>
        <td>
            <Button bsStyle="link" onClick={ handleShowModal }>{ name }</Button>
        </td>
    </tr>
)

export default Event;

//<Link to={ url }>{ name }</Link>
//<Button bsStyle="link" onClick={ handleShowModal }>{ name }</Button>
//<a href={ url } onClick={ handleShowModal }>{ name }</a>

