import React from 'react'
import { Link } from 'react-router-dom'

const Event = ({ name, url }) => (
    <tr>
        <td>
            <a href={url}>{ name }</a>
        </td>
        <td>
            
        </td>
    </tr>
)

export default Event;

//<Link to={ url }>{ name }</Link>