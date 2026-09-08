const http = require('http');
const app = require('./index');

function get(path) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server.listen(0, () => {
      const port = server.address().port;
      http
        .get({ host: '127.0.0.1', port, path }, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            server.close();
            resolve({ status: res.statusCode, body: data });
          });
        })
        .on('error', (err) => {
          server.close();
          reject(err);
        });
    });
  });
}

describe('chunk-demo app', () => {
  test('GET /health returns ok', async () => {
    const res = await get('/health');
    expect(res.status).toBe(200);
    expect(JSON.parse(res.body)).toEqual({ status: 'ok' });
  });

  test('GET / returns greeting', async () => {
    const res = await get('/');
    expect(res.status).toBe(200);
    expect(res.body).toBe('Hello, chunk-demo!');
  });
});
