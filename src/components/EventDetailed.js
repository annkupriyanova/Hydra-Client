import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

const NAME = 'http://schema.org/name'
const START_DATE = 'http://schema.org/startDate'
const END_DATE = 'http://schema.org/endDate'
const ACTOR = 'http://schema.org/actor'
const HOME_TEAM = 'http://schema.org/homeTeam'
const AWAY_TEAM = 'http://schema.org/awayTeam'


class EventDetailed extends Component {
    
    render() {
        
        const { showModal, onHide, currentEvent, propNames} = this.props
        const name = propNames[NAME]
        const startDate = propNames[START_DATE]
        const endDate = propNames[END_DATE]

        const actor = (propNames[ACTOR])? propNames[ACTOR]: false
        const homeTeam = (propNames[HOME_TEAM])? propNames[HOME_TEAM]: false
        const awayTeam = (propNames[AWAY_TEAM])? propNames[AWAY_TEAM]: false

        return (
            <Modal show={ showModal } onHide={ onHide }>
                <Modal.Header>
                    <Modal.Title>{ currentEvent[name] }</Modal.Title>
                    
                    <Modal.Body>
                        <ul>
                            <li>Start Date: { currentEvent[startDate] }</li>
                            <li>End Date: { currentEvent[endDate] }</li>
                            <li>
                                {
                                    actor ? `Actor: ${ currentEvent[actor] && currentEvent[actor][name] }` : 
                                            `Home vs. Away Teams: ${ currentEvent[homeTeam] } vs. ${ currentEvent[awayTeam] }`
                                }
                            </li>
                        </ul>
                    </Modal.Body>
                    
                    <Modal.Footer>
						<Button onClick={ onHide }>Close</Button>
					</Modal.Footer>
                </Modal.Header>
            </Modal>
        );
    }
}

export default EventDetailed;