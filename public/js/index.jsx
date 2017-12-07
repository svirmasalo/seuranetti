//const WPAPI = require( 'wpapi' );

import React from 'react';
import ReactDOM from 'react-dom';

/*STORE*/
import store from 'store';
console.log(store);

import axios from 'axios';

/*IMPORT VIEWS*/
import {Archive} from './views/_view_archive.jsx';
import {Single} from './views/_view_single.jsx';

/*IMPORT COMPONENTS*/
import {Wait} from './helps.jsx';
import {Status} from './status.jsx';
import {wpapi_enpoint_categories,wpapi_enpoint_category, wpapi_enpoint_posts, wpapi_enpoint_post} from './endpoints.js';


const wpapi_url = 'https://dev.svirmasalo.fi/vconnect/wp-json/';
const wpapi_endpoints = {
	me:'wp/v2/users/me/',
	categories:'wp/v2/categories/',
	posts:'wp/v2/posts/'
};



const DefaultView = function(){
	return (
		<div className="card contents">
			<header>
				<h1>Tervetuloa seuranettiin </h1>
			</header>
			<p> Tämä on olteusnäkymä. Klikkaa jotain valikon kohdista päästäksesi haluamaasi paikkaan</p>
		</div>
	);
}

const News = function(){
	
	return (
		<div className="card contents">
			<header>
				<h1>Seuran uutiset </h1>
			</header>
			<p> Täältä löydät kaikki seuran uutiset</p>
		</div>
	);
}

function wpapi_endpoint(enpoint_name){
	return wpapi_url + wpapi_endpoints[enpoint_name]
}

function uniAjax(endpoint){
	return new Promise((resolve,reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET',endpoint);
		xhr.onload = () => resolve(xhr.responseText);
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send();
	});		
}


class AppFrame extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			view: 'dashboard',
			category: '',
			viewContent: null,
		}
		this._view = this._view.bind(this);
		this._viewSingular = this._viewSingular.bind(this);
		this._clearCache = this._clearCache.bind(this);

	}
	componentDidMount(){
		
	}

	_view(cat, catCon){
		//console.log('vcon', vcon);
		this.setState({ view:'archive', category:cat, viewContent:catCon });
	}
	_viewSingular(title, singCon){
		this.setState({ view:'single', category:title, viewContent:singCon });
	}
	_clearCache(){
		store.each(function(value, key) {
			console.log('clearing this store: ', key);
			store.remove(key);
		});
	}

	render(){
		
		const {view, category,viewContent} = this.state;
		
		let mainContent;

		if(view == "archive"){
			/**
			* Pass singular view handler to archive
			*/ 
			mainContent = <Archive name={category} data={viewContent} viewSingluar={this._viewSingular}/>;
		}else if( view == "single" ){
			mainContent = <Single name={category} data={viewContent} />;
		}else{
			mainContent = <div><h2>Tervetuloa!</h2></div>
		}

		return(
			<div className="appFrame">
				<div className="wrapper">
					<aside>
						<NavLinks viewHandler={this._view} />
					</aside>
					<main>
						{mainContent}
					</main>
					<aside>
						<Status />
					</aside>
				</div>
				<footer id="site-footer">
					<button disabled onClick={this._clearCache}>Clear cache</button>
				</footer>
			</div>
		)
	}
}

class categoryView extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			ready : false,
		}
	}
	componentDidMount(){
		// Käsittele dynaaminen data
	}
	render(){
		return('<h2>Moi</h2>');
	}
}

class NavLinks extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			ready:false,
			categories:''
		}
	}
	componentDidMount(){
		
			axios.get( wpapi_enpoint_categories() )
			.then((response) => {
				this.setState({
					categories : response.data,
					ready: true,
				})
				console.log("response got from NavLinks");
			})
			.catch((error) => { console.log('error:', error) });
	}
	render(){
		const {ready,categories} = this.state;

		if(ready){
			return(
				<div className="card">
			          {categories.map(item => (
			            <Navlink key={item.id} id={item.id} title={item.name} viewHandler={ this.props.viewHandler }/>
			          ))}
				</div>
			)
		}else{
			return( <h2>Loading...</h2>)
		}
	}
}

class CPanel extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			restriction:true,
			user:{
				username:'-',
			}
			
		}
		this.handleLogin = this.handleLogin.bind(this);
	}
	componentDidMount(){
		//this.handleLogin('./sample-data/wp-user-sample.json');
		this.handleLogin(wpapi_endpoint('posts'));
	}
	componentWillUnmount(){

	}
	handleLogin(endpoint){
		uniAjax(endpoint).then((response) => {
			this.setState({
				user:JSON.parse(response)
			});
			setTimeout(() => {this.setState({restriction:false}); },2000);
		}).catch((error) => {
			console.log(error);
		});
	}
	render(){
		if(this.state.restriction){
			return ( 
				<header id="cpanel">
					<h1 id="site-title">Seurahuone</h1>
					<figure className="user">
						<img id="prof-pic" src="./images/blank-user.svg" alt="User profile picture" />
						<figcaption>Vierailija</figcaption>
					</figure>
				</header>
			)
		}else{
			return ( 
				<header id="cpanel">
					<h1 id="site-title">Seurahuone</h1>
					<figure className="user">
						<img id="prof-pic" src="./images/blank-user.svg" alt="User profile picture" />
						<figcaption>{this.state.user.username}</figcaption>
					</figure>
				</header>
			)
		}
	}
}

/**
* Last childs
*/
class Navlink extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			ready:false,
			categoryContent : null
		}
		this.navEvent = this.navEvent.bind(this);
	}

	componentDidMount(){
		const storeKey = 'singleCategory'+this.props.id;
		this.setState({ready:true});
	}

	navEvent(event){
		event.preventDefault();
		axios.get( wpapi_enpoint_category(this.props.id) )
		.then((response) => {
			this.setState({categoryContent:response.data});
			this.props.viewHandler(this.props.title, this.state.categoryContent);
		})
		.catch((error) => { console.log('error:', error) });
	}

	render(){
		const {ready, categoryContent} = this.state;
		if(ready){
			return(
				<a className="navlink" href="#" onClick={this.navEvent} title="">{this.props.title}</a>
			)
		}else{
			return(
				<a className="navlink loading" href="#" title="">Ladataan...</a>
			)
		}
	}

}


ReactDOM.render(
  <AppFrame />,
  document.getElementById('root')
);

