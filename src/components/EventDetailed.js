import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

const NAME = 'http://schema.org/name'

class EventDetailed extends Component {
    
    render() {
        
        const { showModal, onHide, currentEvent, propNames} = this.props
        const name = propNames[NAME]

        return (
            <Modal show={ showModal } onHide={ onHide }>
                <Modal.Header>
                    <Modal.Title>{ currentEvent[name] }</Modal.Title>
                    
                    <Modal.Body>
                        <p>This is event!</p>
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