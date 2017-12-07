/**
* App settings
*/

const cat_timeout = 3600;

const addMinutes = function(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

export {cat_timeout, addMinutes};