const routes = module.exports = require('next-routes')();

routes
    .add({name: 'jobs', pattern: '/:geo(uk|us|ca|za)/jobs/(.*)', page: 'seo-jobs'});