var path = require('path'),
    root = path.normalize(__dirname + '/../..');

module.exports = {
    root: root,
    port: process.env.PORT || 4004,
    secret: 'downfallsecret',

    defaultController: 'index',
    defaultControllerMethod: 'render',

    db: process.env.MONGOHQ_URL,
    auth: {
    }
};
