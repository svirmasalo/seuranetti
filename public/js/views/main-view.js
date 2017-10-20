import {el, text, router} from 'redom';
import {app} from '../index.js';

/*
function Events(app){
	const aHome = document.querySelector('a[title="Home"]');
	const aAbout = document.querySelector('a[title="About"]');
	const aMe = document.querySelector('a[title="Me"]');
	const bPrev = document.querySelector('#prev');

	aHome.addEventListener('click', () => {
		app.update('home', 'Etusivu');
	});
	aAbout.addEventListener('click', () => {
		app.update('about', 'Tietoja');
	});
	aMe.addEventListener('click', () => {
		app.update('me', 'Oma tili');
	});
	console.log(app);
	if(app.route != 'home'){
		bPrev.addEventListener('click',()=>{
			app.update('home', 'Etusivu');
		});
	}

}
*/

class Home{
	constructor(){
		this.el = 	el('main#home',
						el('.home-navigation',
							//el('a.btn.block.default','Koti',{title:'Home', value:'home'}),
							el('a.btn.block.default','Tietoa',{title:'About', target:'about'}),
							el('a.btn.block.default','Oma tili',{title:'Me', target:'me'}),
						),
						el('section.card',
							el('h2',),
						)
					)
	}
	update(data){
		console.log('this:', app);
		this.el.querySelector('h2').innerText = data;

		// Events
		for(let link of this.el.querySelectorAll('.home-navigation a.btn') ){
			console.log(link);
			link.addEventListener('click',()=>{
				app.update(link.target,link.innerText);
			});
		}

	}
}

export {Home};