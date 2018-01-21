export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE'
export const FETCH_PROP_NAMES_SUCCESS = 'FETCH_PROP_NAMES_SUCCESS'
export const SHOW_MODAL = 'SHOW_MODAL'

const MUSIC_SERVICE_ADDRESS = 'http://localhost:1234'
const SPORTS_SERVICE_ADDRESS = 'http://localhost:8080'
const SCHEMA_EVENT_TYPE = 'http://schema.org/Event'

const fetchEventsRequest = (serviceAddress) => ({
    type: FETCH_EVENTS_REQUEST,
    serviceAddress
})

const fetchEventsSuccess = (events) => ({
    type: FETCH_EVENTS_SUCCESS,
    events
})

const fetchEventsFailure = (error) => ({
    type: FETCH_EVENTS_FAILURE,
    error
})

const fetchPropNamesSuccess = (propNames) => ({
    type: FETCH_PROP_NAMES_SUCCESS,
    propNames
})

const showModal = (showModal, currentEvent) => ({
    type: SHOW_MODAL,
    showModal,
    currentEvent
})

export const handleShowModal = (id) => {
    /*return function(dispatch, getState){
        const state = getState()
        dispatch(showModal(true, state.events[index]))
    }*/
    return getEventDetails(id)
}

export const handleCloseModal = () => {
    return function(dispatch, getState){
        dispatch(showModal(false, {}))
    }
}

export const fetchMusicEvents = () => {
    return fetchEvents(MUSIC_SERVICE_ADDRESS)
}

export const fetchSportsEvents = () => {
    return fetchEvents(SPORTS_SERVICE_ADDRESS)
}

const fetchEvents = (service_address) => {
    var propNames = {}
    return function(dispatch, getState){
        //const state = getState()
        //const service_address = state.serviceAddress
        //console.log(state)
        dispatch(fetchEventsRequest(service_address))
        return fetch(service_address)
                .then(res => res.json())
                .then(json => {
                    // 2. идем в контекст "@context": "/context/entry-point.json"
                    fetch(service_address + json['@context'])
                        .then(res => res.json())
                        .then(entryPoint => {
                            // 3. в новом объектк EntryPoint ищем "EntryPoint": "vocab:EntryPoint" и 
                            //переходим по ссылке "vocab": "http://localhost:8080/context/vocab.json#"
                            var epName = entryPoint['@context'].EntryPoint
                            var docName = entryPoint['@context'].EntryPoint.split(':')[0]
                            return fetch(entryPoint['@context'][docName])
                                .then(res => res.json())
                                .then(vocab => {
                                    propNames = getPropNames(vocab)
                                    // 4. функция разбора словаря => массив с лейблами
                                    return getLabels(vocab, epName);
                                })                            
                        })
                        .then(labels => {
                            if (labels) {
                                for (var label of labels) {
                                    //5. возвращаемся на локалхост entrypoint и переходим по найденному лейблу
                                    fetch(service_address + json[label])
                                        .then(res => res.json())
                                        .then(eventjson => dispatch(fetchEventsSuccess(eventjson.members)))
                                        .then(() => dispatch(fetchPropNamesSuccess(propNames)))
                                }
                            }
                            else
                                console.log('No labels found');
                        })
                        .catch(error => dispatch(fetchEventsFailure(error)))
                })
                .catch(error => dispatch(fetchEventsFailure('No response from service' + error)))
    }
}

function getLabels(vocab, epName) {
	var labels = []
	var supportedClassProp = vocab.supportedClass;
	for (var el of supportedClassProp)
		// и смотрим что лежит у ентрипоинт-"EntryPoint": "vocab:EntryPoint"
		if (el['@id'] === epName) {
			//  Смотрим у него supportedProperty
			for (var property of el.supportedProperty) {
				// и в нем supportedOperation
				for (var operation of property.property.supportedOperation) {
					// ищем "method": "GET" и смотрим что он возвращает,т.е. на "returns": "vocab:EventCollection"
					if (operation.method === 'GET') {
						var idOfReturn = operation.returns
						// ищем vocab:EventCollection и смотрим там на "collectionItemsType": "http://schema.org/Event" 
						for (var elem of supportedClassProp) {
		          if (elem['@id'] === idOfReturn && elem.hasOwnProperty("collectionItemsType") 
			          && elem["collectionItemsType"] === SCHEMA_EVENT_TYPE){
			          	labels.push(property.property.label)
			        }
			      }
					}
				}
			}
			return labels
		}
}

function getPropNames(vocab) {
  const propNames={}
  const supportedClassProp = vocab.supportedClass;
  for (var el of supportedClassProp) {
    if (el['@id'] === SCHEMA_EVENT_TYPE) {
      for (var supportedProperty of el.supportedProperty) {
        propNames[supportedProperty.property] = supportedProperty['hydra:title']
      }
    }
  }
  return propNames
}

function getEventDetails(id) {
    var event = {}
    return function(dispatch, getState){
        const state = getState()
        return fetch(state.serviceAddress + id)
            .then(res => res.json())
            .then(eventObj => {
                event = eventObj
                return updateSpecificPropNames(state.serviceAddress + event['@context'])
            })
            .then(propNames => dispatch(fetchPropNamesSuccess(propNames)))
            .then(() => dispatch(showModal(true, event)))
        }
}

function updateSpecificPropNames(contextUrl) {
    var propNames = {}
    //return function(dispatch, getState) {
        return fetch(contextUrl)
                .then(res => res.json())
                .then(obj => {
                    if (obj['@context']){
                        for (let [key, value] of Object.entries(obj['@context'])){
                            propNames[value] = key
                        }
                    }
                    return propNames
                })
                //.then(() => dispatch(fetchPropNamesSuccess(propNames)))
    //}
}