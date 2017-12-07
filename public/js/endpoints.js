/**
* Ajax calls
*/
const wpapi_url = 'https://dev.svirmasalo.fi/vconnect/wp-json/';

const wpapi_enpoint_categories = function(){
	return wpapi_url + 'wp/v2/categories';
}
const wpapi_enpoint_posts = function(){
	return wpapi_url + 'wp/v2/posts';
}
const wpapi_enpoint_category = function(id){
	return wpapi_enpoint_posts() + '/?categories=' + id;
}
const wpapi_enpoint_post = function(id){
	return wpapi_url + 'wp/v2/posts/' + id;
}

export {
	wpapi_enpoint_categories,
	wpapi_enpoint_category,
	wpapi_enpoint_posts,
	wpapi_enpoint_post
};





