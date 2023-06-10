//import * as http from 'http';
//import * as fs from 'fs';
//import * as path from 'path';
//import {countWords, justifyText, generateToken} from './utils/utils'

//const PORT: number = 3333;

//const server: http.Server = http.createServer(
//  (req: http.IncomingMessage, res: http.ServerResponse) => {
//    console.log('Server request');

//    res.setHeader('Content-Type', 'text/html');

//    const createPath = (page: string): string =>
//      path.resolve(__dirname, '.', 'pages', `${page}.html`);

//    let basePath: string = '';

//    switch (req.url) {
//      case '/':
//      case '/home':
//      case '/index.html':
//        basePath = createPath('index');
//        res.statusCode = 200;
//        break;
//      case '/justify':
//        basePath = createPath('justify');
//        res.statusCode = 200;
//        break;
//      default:
//        basePath = createPath('error');
//        res.statusCode = 404;
//        break;
//    }

//    fs.readFile(basePath, (err: NodeJS.ErrnoException | null, data: Buffer) => {
//      if (err) {
//        console.log(err);
//        res.statusCode = 500;
//        res.end();
//      } else {
//        res.write(data);
//        res.end();
//      }
//    });
//  }
//);

//server.listen(PORT, () => {
//  console.log(`listening port ${PORT}`);
//});

import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { countWords, justifyText, generateToken } from './utils/utils';
import multer from 'multer';

const PORT: number = 3333;
const upload = multer({ dest: 'uploads/' });

const server: http.Server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    console.log('Server request');

    res.setHeader('Content-Type', 'text/html');

    const createPath = (page: string): string =>
      path.resolve(__dirname, '.', 'pages', `${page}.html`);

    const handleJustify = (req: any, res: any) => {
      upload.single('file')(req, res, (err: any) => {
        if (err) {
          res.statusCode = 400;
          res.end('File upload failed');
          return;
        }

        // Read the content of the file
        const fileContent = fs.readFileSync(req.file.path, 'utf8');

        // Process the file content
        const justifiedText = justifyText(fileContent);
        console.log(justifiedText)

        // Prepare the HTML response
        const responseHTML = `
          <html>
            <head>
              <title>Justified Text</title>
              <style>
              </style>
            </head>
            <body>
              <h1>Justified Text</h1>
              <pre>${justifiedText}</pre>
              <button onclick="proceedToHome()">Home</button>
              <script>
                const proceedToHome = () => {
                  window.location.href = '/';
                };
              </script>
            </body>
          </html>
        `;

        res.statusCode = 200;
        res.end(responseHTML);
      });
    };

    let basePath: string = '';

    switch (req.url) {
      case '/':
      case '/home':
      case '/index.html':
        basePath = createPath('index');
        res.statusCode = 200;
        break;
      case '/api/justify':
        if (req.method === 'POST') {
          handleJustify(req, res);
          return;
        } else {
          basePath = createPath('justify');
          res.statusCode = 200;
        }
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
  }
);

server.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
