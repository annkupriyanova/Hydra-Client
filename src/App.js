import React, { Component } from 'react';
import './App.css';
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from './reducers/rootReducer'
import EventsList from './components/EventsList'
import { fetchMusicEvents, fetchSportsEvents, handleShowModal, handleCloseModal } from './actions/eventsActions'
import ButtonFetchEvents from './components/ButtonFetchEvents'
import StartPage from './components/StartPage'

/*
const service_address = 'http://localhost:8080';
const context = '/context';
const entry_point = '/entry-point.json';
const vocab = '/vocab.json';

class App extends Component {
  constructor(){
        super()
        this.state = { events : [] }
    }
  
  handleButtonFetchEventsClick = () => {
		// 1. запрос на локалхост
		fetch(service_address)
			.then(res => res.json())
			.then(json => {
				// 2. идем в контекст "@context": "/context/entry-point.json"
				fetch(service_address + json['@context'])
					.then(res => res.json())
					.then(entryPoint => {
						// 3. в новом объектк EntryPoint ищем "EntryPoint": "vocab:EntryPoint" и 
						//переходим по ссылке "vocab": "http://localhost:8080/context/vocab.json#"
						if (entryPoint['@context'].EntryPoint === 'vocab:EntryPoint') {
							return fetch(entryPoint['@context'].vocab)
								.then(res => res.json())
								.then(vocab => {
									// 4. функция разбора словаря (Ваня) => массив с лейблами
									return get_labels(vocab);
								});
						} else {
							return false;
						}
					})
					.then(labels => {
						if (labels) {
							var events = [];
							for (var label of labels) {
								//5. возвращаемся на локалхост entrypoint и переходим по найденному лейблу
								fetch(service_address + json[label])
									.then(res => res.json())
									.then(eventjson => { events = eventjson.members })
									.then(() => { this.setState({ events }); console.log(events)})
							}
						}
						else
							console.log('No labels found');
					})
					.catch(err => console.log(err));
			})
			.catch(() => console.log('No response from service'))
	}
  
  render() {
    return (
      <div>
        <ButtonFetchEvents onClick={ this.handleButtonFetchEventsClick }/>
        <EventsList events={ this.state.events }/>
      </div> 
    )
  }
}

function get_labels(vocab) {
	var labels = []
	var supportedClassProp = vocab.supportedClass;
	for (var el of supportedClassProp)
		// и смотрим что лежит у ентрипоинт-"EntryPoint": "vocab:EntryPoint"
		if (el['@id'] == 'vocab:EntryPoint') {
			//  Смотрим у него supportedProperty
			var prop_ids = []
			for (var property of el.supportedProperty) {
				// и в нем supportedOperation
				for (var operation of property.property.supportedOperation) {
					// ищем "method": "GET" и смотрим что он возвращает,т.е. на "returns": "vocab:EventCollection"
					if (operation.method == 'GET') {
						var idOfReturn = operation.returns
						// ищем vocab:EventCollection и смотрим там на "collectionItemsType": "http://schema.org/Event" 
						for (var elem of supportedClassProp) {
		          if (elem['@id'] == idOfReturn && elem.hasOwnProperty("collectionItemsType") 
			          && elem["collectionItemsType"] == "http://schema.org/Event"){
			          	labels.push(property.property.label)
			        }
			      }
					}
				}
			}
			return labels
		}
}

export default App;
*/

const mapStateToProps = state => ({
    events: state.events,
    status: state.status,
		serviceAddress: state.serviceAddress,
		propNames: state.propNames,
		showModal: state.showModal,
		currentEvent: state.currentEvent 
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

