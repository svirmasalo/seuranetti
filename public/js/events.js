/**
* CONTROLS
*/ 
function Events(app){
	const aHome = document.querySelector('a[title="Home"]');
	const aAbout = document.querySelector('a[title="About"]');
	const aMe = document.querySelector('a[title="Me"]');

	aHome.addEventListener('click', () => {
		app.update('home', 'Etusivu');
	})
	aAbout.addEventListener('click', () => {
		app.update('about', 'Tietoja');
	})
	aMe.addEventListener('click', () => {
		app.update('me', 'Oma tili');
	})

}
export {Events};