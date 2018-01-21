import React, { Component } from 'react';
import EventsList from './EventsList'
import EventDetailed from './EventDetailed'
import NavBar from './NavBar'
import logo from '../calendar-logo.png'

const MUSIC_SERVICE_ADDRESS = 'http://localhost:1234'
const SPORTS_SERVICE_ADDRESS = 'http://localhost:8080'

class StartPage extends Component {

    render() {
        const { events, 
                propNames, 
                showModal, 
                currentEvent, 
                serviceAddress,
                handleShowModal, 
                handleCloseModal, 
                fetchMusicEvents, 
                fetchSportsEvents} = this.props
        
        const displayStatus = status.split(' ')[0] === "Error"? 
                <p style={{color: 'red'}}>{status}</p> : <p>{status}</p>

        var displayHeader = <h3></h3>
        if (serviceAddress === MUSIC_SERVICE_ADDRESS)
            displayHeader = (<h3>Music Events</h3>)
        else if (serviceAddress === SPORTS_SERVICE_ADDRESS)
                displayHeader = (<h3>Sports Events</h3>)
            
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Event Manager</h2>
                </div>
                <div>
                    <NavBar onClickMusic={ fetchMusicEvents } onClickSports={fetchSportsEvents} />
                    { displayStatus }
                    { displayHeader }
                    <EventsList events={ events } propNames={ propNames } 
                        handleShowModal={ handleShowModal }/>
                    {
                        Object.keys(currentEvent).length !== 0 ?
                            <EventDetailed currentEvent={ currentEvent } propNames={ propNames } 
                                    showModal={ showModal } onHide={ handleCloseModal }/> :
                            <div></div>
                    }
                    
                </div>
            </div>
        );
    }
}

export default StartPage;