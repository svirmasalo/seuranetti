/**
* REDOM
*/
import {mount, router} from 'redom';

/**
* VIEWS
*/
import { Home} from './views/main-view'; 
import { Card, About, Me } from './views/list-view';

/**
* ROUTER
*/ 
const app = router('#app',{
	home:Home,
	about:About,
	me:Me
},this);

export {app};

mount(document.getElementById('router'), app);

app.update('home', 'Etusivu');

console.log('app:',app);


