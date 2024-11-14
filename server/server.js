const WebSocket = require('ws');

const PORT = 8080;

const wss = new WebSocket.Server({ port: PORT });

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

function broadcast(data) {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  wss.on('connection', ws => {
    console.log('New client connected');
  
    ws.on('message', message => {
      const parsedMessage = JSON.parse(message);
      const { type, data } = parsedMessage;
  
      switch (type) {
        case 'newDrawData':
          broadcast({ type, data });
          break;
  
        default:
          console.log('Unknown message type:', type);
      }
    });
  
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });