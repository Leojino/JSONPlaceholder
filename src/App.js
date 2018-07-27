import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

	state = {
		dataFetched: false,
		data: []
	}

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/posts/')
			.then(response => response.json())
			.then(json => {
				// console.log(json)
				this.setState({
					dataFetched: true,
					data: json
				})
			})
	}

	handleChange(e, val) {
		// console.log(e.currentTarget.value);
		console.log( JSON.stringify(val) );

		let url = `https://jsonplaceholder.typicode.com/posts/${val.id}`

		fetch(url, {
			method: 'PUT',
			body: JSON.stringify(val),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => console.log('Success:', response));
	}

	render() {
		return (
			<div className="App">
				{this.state.dataFetched &&
					<table>
						<thead>
							<tr>
								<th>Id</th>
								<th>User Id</th>
								<th>Title</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.data.map(val => (
									<tr key={val.id}>
										<td>{val.id}</td>
										<td>{val.userId}</td>
										<td> <input type="text" defaultValue={val.title} onChange={(e) => (this.handleChange(e, val))} />	</td>
										<td>
											<textarea
												name="desc"
												cols="30"
												rows="10"
												defaultValue={val.body}
												onChange={(e) => (this.handleChange(e, val))}
											></textarea>
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
				}
			</div>
		);
	}
}

export default App;
