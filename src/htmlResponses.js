const fs = require('fs');

const index = fs.readFileSync('$(__dirname)/../client/client.html');
const styleCSS = fs.readFileSync('$(__dirname)/../client/style.css');

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(styleCSS);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
};
