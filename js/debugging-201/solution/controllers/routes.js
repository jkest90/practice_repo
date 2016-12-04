// BUG: leave off . in front of path to bugs.js
// MESSAGE: Error: Cannot find module '/bugs'... at Object.<anonymous> (/Users/steve/Google Drive/Projects/RefactorU/exercise-solutions/js/debugging/controllers/routes.js:1:77)
// FIX: require bugs.js using relative path starting with .
// var bugCtrl = require('/bugs');
var bugCtrl = require('./bugs');

module.exports = (app) => {
    // add a get route
    app.get('/api/bugs', bugCtrl.get);

    // add a get specific bug route
    app.get('/api/bugs/:id', bugCtrl.get);
    
    // add a post route
    app.post('/api/bugs', bugCtrl.upsert);
}