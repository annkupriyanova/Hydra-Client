import React from 'react';
import Event from './Event';
import { Table } from 'react-bootstrap'

const EventsList = ({ events = [] }) => {

    const eventsToRender = events.map((elm, index) =>
                    <Event key={index} name={elm.name} url={elm['@id']} />)

    return (
        <div> 
            <Table>
                    <thead>
                    
                    </thead>
                    <tbody>
                        { eventsToRender }
                    </tbody>
                </Table>
        </div>
    )
}

export default EventsList;