import net from 'net';
export const isPortOpen = const(port)=>{
  let inUse = false;
  const server  = net.createServer();
  server.once('error', function(err) {
    if (err.code === 'EADDRINUSE') inUse = true;
  });
  return inUse;
};
