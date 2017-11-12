const WPAPI = require( 'wpapi' );
import React from 'react';
import ReactDOM from 'react-dom';

const wpapi_url = 'https://dev.svirmasalo.fi/vconnect/wp-json/';
const wpapi_endpoints = {
	me:'wp/v2/users/me/',
	categories:'wp/v2/categories/',
	posts:'wp/v2/posts/'
};

const Wait = function(){
	return <p className="loading">Loading...</p>
}
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
			view:'default',
			currentViewState : '',
			prevViewState: '',


		}
		this.viewHandler = this.viewHandler.bind(this);
		this.renderView = this.renderView.bind(this);

	}
	viewHandler(viewCode){
		this.setState({view:'uutiset'});
	}
	componentDidMount(){
		this.state.currentViewState = this.state.view;
	}
	renderView(){
		switch(this.state.view){
			case 'default' : 
				return <DefaultView />
				break;
			case 'uutiset' :
				return <News />
				break;
			default :
				return <DefaultView />
		}	
	}
	render(){
		return(
			<div className="appFrame">
				<CPanel />
				<main>
					<NavControlPanel navEvent={this.viewHandler}/>
					{this.renderView()}
				</main>
				<footer></footer>
			</div>
		)
	}
}

class NavControlPanel extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			ready: false,
			categories : [],
		}
		this.callCategories = this.callCategories.bind(this);
		this.renderCategories = this.renderCategories.bind(this);
		this.renderWait = this.renderWait.bind(this);
	}
	componentDidMount(){
		this.callCategories();
	}
	callCategories(){
		uniAjax(wpapi_endpoint('categories')).then((response) => {
			console.log(JSON.parse(response));
			this.setState({
				categories:JSON.parse(response),
				ready:true,
			})
		}).catch((error) => {
			console.log(error);
		});	
	}
	renderCategories(){
		return(			
			<div className="card">
				<Navlink eventHandler={this.props.navEvent} catId={this.state.categories[0].id} title={this.state.categories[0].name} />
				<Navlink eventHandler={this.props.navEvent} catId={this.state.categories[1].id} title={this.state.categories[1].name} />
				<Navlink eventHandler={this.props.navEvent} catId={this.state.categories[2].id} title={this.state.categories[2].name} />
			</div>
		)
	}
	renderWait(){
		return(
			<div className="card">
				<Wait />
			</div>
		)
	}
	render(){
		if (this.state.ready){
			return this.renderCategories();
		}else{
			return this.renderWait();
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
			console.log(JSON.parse(response));
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
			active : false,

		}
		this.navEvent = this.navEvent.bind(this);
	}
	componentDidMount(){
		// code
	}
	navEvent(){
		this.props.eventHandler(this.props.title);
	}
	render(){
		return(
			<a className="navlink"  onClick={this.navEvent} href="#" title="">{this.props.title}</a>
		)
	}

}


ReactDOM.render(
  <AppFrame />,
  document.getElementById('root')
);

