import HLSServer from 'hls-server';
import http from 'http';
import httpAttach from 'http-attach';

let server;

export function startHlsServer(port) {
  server = http.createServer()

  let hls = new HLSServer(server, {
    path: '/streams',
    dir: '/tmp/hls',
  })

  function yourMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next()
  }

  httpAttach(server, yourMiddleware)

  server.listen(port)
}

export function registerStream(name) {
  // server.addStream(name, `/tmp/hls/${name}/index.m3u8`);
}

export function unregisterStream(name) {
  // server.stopStream(name);
}