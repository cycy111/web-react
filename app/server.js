// NODE
import http from 'http';
import fs from 'fs';
import path from 'path';

// EXPRESS
import express from 'express';
import favicon from 'serve-favicon';

// EXTERNALS
import _ from 'lodash';
import React from 'react';
import Router from 'react-router';

import routes from './routes';

let html = fs.readFileSync('./dist/index-prod.html', {encoding: 'utf8'});

let app = express();
app.use(favicon(path.join(__dirname, '/images/favicon.ico')));

app.set('port', process.env.PORT || 3000);
app.use(express.static('dist'));

app.get('*', (req, res, next) => {
  let markup = '';

  try {
    Router.run(routes, req.path, (Root, state) => {
      markup += React.renderToString(React.createElement(Root, { bundle: 'bundle-prod.js' }));
      markup = html.replace('CONTENT', markup);
      res.contentType = 'text/html; charset=utf8';
      let notFound = _.find(state.routes, {isNotFound: true});
      if (notFound !== undefined) {
        res.status(404);
      }
      res.send(markup);
    });

  } catch (e) {
    return next(e);
  }
});

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
