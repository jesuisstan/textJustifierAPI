import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const PORT: number = 3333;

const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log('Server request');

  res.setHeader('Content-Type', 'text/html');

  const createPath = (page: string): string => path.resolve(__dirname, '..', 'src', 'pages', `${page}.html`);

  let basePath: string = '';

  switch(req.url) {
    case '/':
    case '/home':
    case '/index.html':
      basePath = createPath('index');
      res.statusCode = 200;
      break;
    case '/api/justify':
      basePath = createPath('justify');
      res.statusCode = 200;
      break;
    default:
      basePath = createPath('error');
      res.statusCode = 404;
      break;
  }

  fs.readFile(basePath, (err: NodeJS.ErrnoException | null, data: Buffer) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
