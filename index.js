const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

const port = process.env.PORT || 3000;
const app = express();
const proxy = httpProxy.createProxyServer({ changeOrigin: true });
const proxyUrl = 'http://gymia-shorty.herokuapp.com';

// serve static assets normally
app.use(express.static(path.resolve(__dirname, 'public')));

// Proxy all requests at /proxy to herokuapp
app.all('/proxy/*', (request, response) => {
  request.url = request.url.replace('proxy/', ''); // eslint-disable-line no-param-reassign
  proxy.web(request, response, { target: proxyUrl });
});

// Handles all routes so you do not get a not found error
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port);
