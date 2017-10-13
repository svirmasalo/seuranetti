const aHome = document.querySelector('a[title="Home"]');
const aAbout = document.querySelector('a[title="About"]');
const aMe = document.querySelector('a[title="Me"]');

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
						el('section.card',
							el('h2',)
						)
					)
	}
	update(data){
		this.el.querySelector('h2').innerText = data;
	}
}

class About{
	constructor(){
		this.el = 	el('main#about',
						el('section.card',
							el('h2',)
						)
					)
	}
	update(data){
		this.el.querySelector('h2').innerText = data;
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

const app = router('#app',{
	home:Home,
	about:About,
	me:Me
});
mount(document.getElementById('router'), app);
app.update('home', 'Etusivu');


aHome.addEventListener('click', () => {
	app.update('home', 'Etusivu');
})
aAbout.addEventListener('click', () => {
	app.update('about', 'Tietoja');
})
aMe.addEventListener('click', () => {
	app.update('me', 'Oma tili');
})
