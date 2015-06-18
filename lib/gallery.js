'use strict';

var fs       = require('fs');
var path     = require('path');
var mustache = require('mustache');
var helpers  = require('./helpers');
var log      = require('./logger');
var mkdirp = require('mkdirp');
var connect  = require('connect');
var serveStatic = require('serve-static');
var open     = require('open');

module.exports.generate = function(dirs, compareList, outputDir, project, cb) {
	compareList = compareList.sort(helpers.sortByProp('sort'));
	var template = path.join(__dirname, '/../gallery.html');
	var twentytwentyJs = path.join(__dirname, '/../js/jquery.twentytwenty.js');
	var jqueryEventMoveJs = path.join(__dirname, '/../js/jquery.event.move.js');
	var twentytwentyCSS = path.join(__dirname, '/../css/twentytwenty.css');
	var view = {
		'images' : compareList,
		'dirs': dirs.sort(),
		'project': project,
		'resolve': function() {
			return function(text, render) {
				var rendered = render(text);
				return rendered.replace(/&#x2F;/g, '/').replace(outputDir, '').replace(/^\//, '');
			};
		},
		'contents': function() {
			return function(text, render) {
				var rendered = render(text);
				var output = fs.readFileSync(rendered.replace(/&#x2F;/g, '/').replace(/\/\//g,'/'),'utf8');
				return output ? output : 0;
			};
		}
	};
	// Add twentytwenty plugin to be used for images comparison
	mkdirp(path.join(outputDir,'/js/'), function(err) {
		fs.readFile(twentytwentyJs, function (err, data) {
			if (err) { throw err; }
			fs.writeFile(path.join(outputDir,'/js/jquery.twentytwenty.js'), data, function(err) {
				if(err) {
					log.error(err);
				}
			});
		});
		fs.readFile(jqueryEventMoveJs, function (err, data) {
			if (err) { throw err; }
			fs.writeFile(path.join(outputDir,'/js/jquery.event.move.js'), data, function(err) {
				if(err) { log.error(err); }
			});
		});
	});
	mkdirp(path.join(outputDir,'/css/'), function(err) {
		fs.readFile(twentytwentyCSS, function (err, data) {
			if (err) { throw err; }
			fs.writeFile(path.join(outputDir,'/css/twentytwenty.css'), data, function(err) {
				if(err) { log.error(err); }
			});
		});
	});

	fs.readFile(template, function (err, data) {
		if (err) { throw err; }
		var output = mustache.render(data.toString(), view);
		fs.writeFile(path.join(outputDir, 'gallery.html'), output, function(err) {
			if(err) {
				log.error(err);
			} else {
				log.success('Gallery generated');
				cb();
				connect().use(serveStatic(outputDir)).listen('9090', function(){
					open('http://localhost:9090/gallery.html');
					log.success('Server started on port 9090');
				});
			}
		});
	});
};
