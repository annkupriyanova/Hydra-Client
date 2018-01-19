import React, {Component} from 'react';

// consts
const service_address = 'http://localhost:8080';
const context = '/context';
const entry_point = '/entry-point.json';
const vocab = '/vocab.json';

class Button extends Component {
	constructor () {
		super();
		this.state = { events: [] };
	}

	onClick = () => {
		// 1. запрос на локалхост
		fetch(service_address)
			.then(res => res.json())
			.then(json => {
				// 2. идем в контекст "@context": "/context/entry-point.json"
				fetch(service_address + json['@context'])
					.then(res => res.json())
					.then(entryPoint => {
						console.log(entryPoint);
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
									.then(eventjson => events.push(eventjson))
									.then(() => { this.setState({events: events}); console.log(events)})
							}
						}
						else
							console.log('No labels found');
					})
					.catch(err => console.log(err));
			})
			.catch(() => console.log('No response from service'))
	}

	render () {
		return (
			<div>
				<button onClick={this.onClick}> Do stuff </button>
				<div>
					{
						this.state.events.map((event) => {
							var members = event.members.map((member) => {
								return <li key={event.members.indexOf(member)}>
									{member.name}
									</li>
							});
						// key = 1 - to remove react error 
						return <ol key='1'>{members}</ol>
					})
				}
				</div>
			</div>
		);
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
			          	console.log(property.property.label)
			          	labels.push(property.property.label)
			        }
			      }
					}
				}
			}
			return labels
		}
}

export default Button;