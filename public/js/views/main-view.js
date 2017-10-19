import {el, text} from 'redom';

const ABOUT_URL = 'http://localhost:8080/public/sample-data/wp-json-sample.json'
function aboutContent(){
	return new Promise((resolve,reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", ABOUT_URL);
		xhr.onload = () => resolve(xhr.responseText);
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send();
	});
}

class Card {
	constructor(){
		this.el = 	el('section.card',
						el('h2'),
					);
	}
	update(heading, el) {
		this.el.firstChild.innerText = heading;
		this.el.appendChild(el);
	}
}

class Home{
	constructor(){
		this.el = 	el('main#home',
						el('.home-navigation',
							el('a.btn.block.default','Koti',{title:'Home'}),
							el('a.btn.block.default','Tietoa',{title:'About'}),
							el('a.btn.block.default','Oma tili',{title:'Me'}),
						),
						el('section.card',
							el('h2',),
						)
					)
	}
	update(data){
		this.el.querySelector('h2').innerText = data;
	}
}

//<a class="navlink" href="#" title="Home">Home</a>


class About{
	constructor(){
		this.el = 	el('main#about',
						el('section.card',
							el('h2',),
							el('.content',)
						)
					);
		this.content = aboutContent();
	}
	update(data){
		this.el.querySelector('h2').innerText = data;
		this.content.then( (resp) => {
			//console.log(JSON.parse(resp));
			const respJSON = JSON.parse(resp);
			this.el.querySelector('.content').innerHTML = respJSON.description;
		})
		.catch((error) =>{
			console.log(error);
		})
	}
}

class Me{
	constructor(){
		this.el = 	el('main#me',
						el('section.card',
							el('h2',)
						)
					)
	}
	update(data){
		this.el.querySelector('h2').innerText = data;
	}
}

export { Home, Card, About, Me };