/**
* ARCHIVE
*/

import React from 'react';
import ReactDOM from 'react-dom';

import {wpapi_enpoint_post} from '../endpoints.js';

const ArchiveSingle = function(props){
	const id = props.postObject.id
	const title = props.postObject.title.rendered;
	const date = props.postObject.date; // !GMT
	const endpoint = wpapi_enpoint_post(id)

	console.log( endpoint );

	return (
		<div className="card archive-single">
			<h3>{title + ' - ' + id} </h3>
			<p className="archive-single--meta">
				<span data-content="date">Julkaistu: {date}</span>
				<span data-content="author">Julkaisija: --- </span>
			</p>
			<a className="btn round" href="#" title="avaa artikkeli" onClick={(e) => { props.handleClick(title, props.postObject) } } > L </a>
		</div>
	)
}

class Archive extends React.Component{
	constructor(props){
		super(props);
		this.state = {
		}
		this._handleCategoryData = this._handleCategoryData.bind(this);
	}
	componentDidMount(){
		console.log('Archive mounted');
		console.log('Data passed: ', this.props.data);
	}
	_handleCategoryData(title, singCon){
		/**
		* Data model
		* Key = Post object
		*  - Title = Key.title.rendered
		*  - Endpoint = wpapi_endpoint_post(key.id)
		*/ 
		console.log('single clicked');
		this.props.viewSingluar(title, singCon);
	}
	render(){
		const dataArray = this.props.data;
		const posts = dataArray.map((post) => {
			return (
				<ArchiveSingle key={post.id} postObject={post} handleClick={this._handleCategoryData}/>
			);
		});
		return(
			<div className="view-wrapper archive card">
				<h2>Arkisto: {this.props.name} </h2>
				{posts}
			</div>
		)
	}
}

export {Archive};

