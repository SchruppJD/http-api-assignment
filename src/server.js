const http = require('http');
const url = require('url');
// const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');
// const textHandler = require('./textResponses.js');
// const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Redirects request
const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getCSS,
  '/success': responseHandler.getSuccess,
  '/badRequest': responseHandler.getBadRequest,
  '/unauthorized': responseHandler.getUnauthorized,
  '/forbidden': responseHandler.getForbidden,
  '/internal': responseHandler.getInternal,
  '/notImplemented': responseHandler.getNotImplemented,
  notFound: responseHandler.getNotFound,
};

const onRequest = (request, response) => {
  console.log(request.url);

  // Parse the url
  const parsedUrl = url.parse(request.url);

  // grab the 'accept' header
  const acceptedType = request.headers.accept;

  // Check URL and call function if applicable, else index

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedType, parsedUrl.search);
  } else {
    urlStruct.notFound(request, response, acceptedType);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
