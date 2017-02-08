'use strict';

const app = require('./index');

// Start the server
app.listen(app.get('port'), function () {
    console.log('App listening on port ' + app.get('port'));
});