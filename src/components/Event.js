import React from 'react'
import { Button } from 'react-bootstrap'

const Event = ({ name, url, handleShowModal }) => (
    <tr>
        <td>
            <Button bsStyle="link" onClick={ handleShowModal }>{ name }</Button>
        </td>
    </tr>
)

export default Event;

