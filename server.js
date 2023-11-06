const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === '/hello') {
    const name = query.name || 'world';
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello, ${name}!`);
  } else if (pathname === '/add') {
    const num1 = parseFloat(query.num1);
    const num2 = parseFloat(query.num2);
    if (isNaN(num1) || isNaN(num2)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid input. Please provide valid numbers as query parameters.');
    } else {
      const sum = num1 + num2;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ result: sum }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
