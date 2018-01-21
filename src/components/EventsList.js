import React from 'react';
import Event from './Event';
import { Table } from 'react-bootstrap'

const NAME = 'http://schema.org/name'

const EventsList = ({ events = [], propNames = {}, handleShowModal }) => {

    const name = propNames[NAME]
    const eventsToRender = events.map((elm, index) =>
                <Event key={index} name={elm[name]} url={elm['@id']} 
                    handleShowModal={ (e) => handleShowModal(elm['@id']) }/>)

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