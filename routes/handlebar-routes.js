var indexRoutes = require('./index-routes.js');
var commentRoutes = require('./comment-routes.js');
var articleRoutes = require('./article-routes.js');

module.exports = function(app) {
	app.use('/', indexRoutes);
	app.use('/articles', articleRoutes);
	app.use('/comments', commentRoutes);
};