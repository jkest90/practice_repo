var bugCtrl = require('/bugs');

module.exports = (app) => {
    // add a get route
    app.get('/api/bugs', bugCtrl.get);

    // add a get specific bug route
    app.get('/api/bugs/:id', bugCtrl.get);
    
    // add a post route
    app.post('/api/bugs', bugCtrl.upsert);
}