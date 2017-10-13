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

export { Home };

