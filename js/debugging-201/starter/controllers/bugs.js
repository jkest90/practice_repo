var Bug = require('./bugs');

module.exports = {
    // get bugs from the database
    get: (req, res) => {
        // if id present, get one specific bug
        // /api/bugs/ijhfiu18268768f68d7fs
        // /api/bugs/:id
        if (req.params.id) {
            Bug.findOne({ _id: req.params.id }, (err, bug) => {
                res.json(bug);
            });
        }
        // get all bugs
        else {
            Bug.find({}, (err, bugs) => {
                res.json(bugs);
            });
        }
    },
    // this is how we will post new bugs to the database
    upsert: (req, res) => {

        var newBug = new Bug(req.body);
        // console.log("New Bug", newBug);
        newBug.save(function (err, data) {
            if (err) {
                res.json(err);
            } else {
                res.json(data);
            }
        });
    }