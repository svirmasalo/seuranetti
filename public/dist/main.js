'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var aHome = document.querySelector('a[title="Home"]');
var aAbout = document.querySelector('a[title="About"]');
var aMe = document.querySelector('a[title="Me"]');

var Card = function () {
	function Card() {
		_classCallCheck(this, Card);

		this.el = el('section.card', el('h2'));
	}

	_createClass(Card, [{
		key: 'update',
		value: function update(heading, el) {
			this.el.firstChild.innerText = heading;
			this.el.appendChild(el);
		}
	}]);

	return Card;
}();

var Home = function () {
	function Home() {
		_classCallCheck(this, Home);

		this.el = el('main#home', el('section.card', el('h2')));
	}

	_createClass(Home, [{
		key: 'update',
		value: function update(data) {
			this.el.querySelector('h2').innerText = data;
		}
	}]);

	return Home;
}();

var About = function () {
	function About() {
		_classCallCheck(this, About);

		this.el = el('main#about', el('section.card', el('h2')));
	}

	_createClass(About, [{
		key: 'update',
		value: function update(data) {
			this.el.querySelector('h2').innerText = data;
		}
	}]);

	return About;
}();

var Me = function () {
	function Me() {
		_classCallCheck(this, Me);

		this.el = el('main#me', el('section.card', el('h2')));
	}

	_createClass(Me, [{
		key: 'update',
		value: function update(data) {
			this.el.querySelector('h2').innerText = data;
		}
	}]);

	return Me;
}();

var app = router('#app', {
	home: Home,
	about: About,
	me: Me
});
mount(document.getElementById('router'), app);
app.update('home', 'Etusivu');

aHome.addEventListener('click', function () {
	app.update('home', 'Etusivu');
});
aAbout.addEventListener('click', function () {
	app.update('about', 'Tietoja');
});
aMe.addEventListener('click', function () {
	app.update('me', 'Oma tili');
});