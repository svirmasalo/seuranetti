/**
* Seuran status
*/
import React from 'react';
//import ReactDOM from 'react-dom';

class Status extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){

	}
	render(){
		return(
			<div className="card status">
				<header>
					<h1>Status</h1>
				</header>
				<div className="status-content">
					
				</div>
			</div>
		);
	}
}

export {Status};