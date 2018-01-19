import React, { Component } from 'react';
import EventsList from './EventsList'
import NavBar from './NavBar'
import ButtonFetchEvents from './ButtonFetchEvents'
import logo from '../calendar-logo.png'


class StartPage extends Component {

    render() {
        const { events, propNames, fetchMusicEvents, fetchSportsEvents} = this.props
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
                    <EventsList events={ events } propNames={ propNames } />
                </div>
            </div>
        );
    }
}

export default StartPage;

/*
const StartPage = (props) => {
    const { events, fetchEvents } = props

    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to Event Manager</h2>
            </div>
            <div>
                <ButtonFetchEvents onClick={ fetchEvents } />
                <EventsList events={ events } />
            </div>
      </div>        
    )
}

export default StartPage
*/