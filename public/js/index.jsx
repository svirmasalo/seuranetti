import React from 'react';
import ReactDOM from 'react-dom';

function usrAjax(endpoint){
	return new Promise((resolve,reject) => {
		const usr_xhr = new XMLHttpRequest();
		usr_xhr.open('GET',endpoint);
		usr_xhr.onload = () => resolve(usr_xhr.responseText);
		usr_xhr.onerror = () => reject(usr_xhr.statusText);
		usr_xhr.send();
	});
}

class AppFrame extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="appFrame">
				<CPanel />
				<main>
					<NavControlPanel />
					<div className="card contents">
						{this.props.content}
					</div>
				</main>
				<footer></footer>
			</div>
		)
	}
}

class NavControlPanel extends React.Component{
	constructor(props){
		super(props);

	}
	render(){
		return(
			<div className="card">
				<Navlink title="Linkki" />
				<Navlink title="Linkki" />
				<Navlink title="Linkki" />
			</div>
		)
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
		this.handleLogin('./sample-data/wp-user-sample.json');
	}
	componentWillUnmount(){

	}
	handleLogin(endpoint){
		usrAjax(endpoint).then((response) => {
			this.setState({
				user:JSON.parse(response)
			});
			setTimeout(() => {this.setState({restriction:false})},2000);
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
			active : false
		}
		this.navEvent = this.navEvent.bind(this);
	}
	componentDidMount(){
		// code
	}
	componentWillUnmount(){
		// code
	}
	navEvent(e){
	    this.setState(prevState => ({
			active: !prevState.active
    	}));
	}
	render(){
		return(
			<a className="navlink" href="#" title="">{this.props.title}</a>
		)
	}

}
/*
class RComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			active : false
		}
		this.rEvent = this.rEvent.bind(this);
	}
	componentDidMount(){
		// code
	}
	componentWillUnmount(){
		// code
	}
	rEvent(e){
	    this.setState(prevState => ({
			active: !prevState.active
    	}));
	}
	render(){
		return(
			<div className="" />
		)
	}

}
*/

ReactDOM.render(
  <AppFrame />,
  document.getElementById('root')
);

