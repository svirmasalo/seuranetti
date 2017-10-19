/**
* REDOM
*/
import {mount, router} from 'redom';

/**
* VIEWS
*/ 
import { Home, Card, About, Me } from './views/main-view';

/**
* ROUTER
*/ 
const app = router('#app',{
	home:Home,
	about:About,
	me:Me
});

mount(document.getElementById('router'), app);

app.update('home', 'Etusivu');

/**
* EVENTS
*/ 
import {Events} from './events.js';
Events(app);
