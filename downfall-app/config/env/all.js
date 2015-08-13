require('../../root');

module.exports = {
    root: _root,
    port: process.env.PORT || 4004,
    secret: 'downfallsecret',

    defaultController: 'index',
    defaultControllerMethod: 'render',

    db: process.env.MONGOHQ_URL,
    auth: {
    }
};
