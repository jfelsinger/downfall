var path = require('path'),
    root = path.normalize(__dirname + '/../..');

module.exports = {
    defaultController: 'index',
    defaultControllerMethod: 'render',
    secret: 'secretsecretsecret',
    root: root,
    port: process.env.PORT || 9910,
    db: process.env.MONGOHQ_URL,
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
        cookie: 'locale',
    },
    auth: {
    }
};
