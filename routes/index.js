var React = require('react');
//var App = require('../views/index-prod');
require('babel/register');

var App = require('../app/js/app');
//var App = require('../views/app');
var fs = require('fs');

var html = fs.readFileSync('./dist/index-prod.html', {encoding:'utf8'});

exports.index = function(req, res){

  res.contentType = "text/html; charset=utf8";
  
  var markup = '';  

  try {
            
      markup += 
        React.renderToString(React.createElement(App, { bundle: 'bundle-prod.js' }));
      markup = html.replace('CONTENT', markup);
    } catch (e) {
      return cb(e);
    }

  res.send(markup);

  //res.render('index', { bundle: 'bundle-prod.js' });
};