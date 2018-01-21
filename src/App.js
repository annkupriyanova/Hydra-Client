import React from 'react';
import './App.css';
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from './reducers/rootReducer'
import { fetchMusicEvents, fetchSportsEvents, handleShowModal, handleCloseModal } from './actions/eventsActions'
import StartPage from './components/StartPage'


const mapStateToProps = state => ({
    events: state.events,
    status: state.status,
		serviceAddress: state.serviceAddress,
		propNames: state.propNames,
		showModal: state.showModal,
		currentEvent: state.currentEvent,
})

const Container = connect(mapStateToProps, {
    fetchMusicEvents,
		fetchSportsEvents,
		handleShowModal,
		handleCloseModal
})(StartPage)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
};

