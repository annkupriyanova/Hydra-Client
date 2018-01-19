export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE'

const musicServiceAddress = 'http://localhost:8080';
const sportsServiceAddress = 'http://localhost:8081';

//const context = '/context';
//const entry_point = '/entry-point.json';
//const vocab = '/vocab.json';


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

export const fetchMusicEvents = () => {
    return fetchEvents(musicServiceAddress)
}

export const fetchSportsEvents = () => {
    return fetchEvents(sportsServiceAddress)
}

const fetchEvents = (service_address) => {
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
                            var docName = entryPoint['@context'].EntryPoint.split(':')[0]
                            return fetch(entryPoint['@context'][docName])
                                .then(res => res.json())
                                .then(vocab => {
                                    // 4. функция разбора словаря (Ваня) => массив с лейблами
                                    return get_labels(vocab);
                                });
                            
                        })
                        .then(labels => {
                            if (labels) {
                                for (var label of labels) {
                                    //5. возвращаемся на локалхост entrypoint и переходим по найденному лейблу
                                    fetch(service_address + json[label])
                                        .then(res => res.json())
                                        .then(eventjson => dispatch(fetchEventsSuccess(eventjson.members)))
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

function get_labels(vocab) {
	var labels = []
	var supportedClassProp = vocab.supportedClass;
	for (var el of supportedClassProp)
		// и смотрим что лежит у ентрипоинт-"EntryPoint": "vocab:EntryPoint"
		if (el['@id'] === 'vocab:EntryPoint') {
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
			          && elem["collectionItemsType"] === "http://schema.org/Event"){
			          	labels.push(property.property.label)
			        }
			      }
					}
				}
			}
			return labels
		}
}