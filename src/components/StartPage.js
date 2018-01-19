import React, { Component } from 'react';
import EventsList from './EventsList'
import EventDetailed from './EventDetailed'
import NavBar from './NavBar'
import ButtonFetchEvents from './ButtonFetchEvents'
import logo from '../calendar-logo.png'


class StartPage extends Component {

    render() {
        const { events, propNames, showModal, currentEvent, handleShowModal, handleCloseModal, fetchMusicEvents, fetchSportsEvents} = this.props
        const displayStatus = status.split(' ')[0] === "Error"? 
                <p style={{color: 'red'}}>{status}</p> : <p>{status}</p>
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Event Manager</h2>
                </div>
                <div>
                    <NavBar onClickMusic={ fetchMusicEvents } onClickSports={fetchSportsEvents} />
                    { displayStatus }
                    <EventsList events={ events } propNames={ propNames } 
                        handleShowModal={ handleShowModal }/>
                    
                    <EventDetailed currentEvent={ currentEvent } propNames={ propNames } 
                                    showModal={ showModal } onHide={ handleCloseModal }/>
                </div>
            </div>
        );
    }
}

export default StartPage;