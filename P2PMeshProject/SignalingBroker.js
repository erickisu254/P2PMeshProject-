const WebSocket = require('ws');
const PortNumber = 8080;
const SocketServer = new WebSocket.Server({ port: PortNumber });

SocketServer.on('connection', (ClientSocket) => {
    console.log('[+] A rogue peer has connected to the mesh.');
    ClientSocket.on('message', (IncomingData) => {
        SocketServer.clients.forEach((ConnectedPeer) => {
            if (ConnectedPeer !== ClientSocket && ConnectedPeer.readyState === WebSocket.OPEN) {
                ConnectedPeer.send(IncomingData.toString());
            }
        });
    });
    ClientSocket.on('close', () => console.log('[-] A peer has vanished into the void.'));
});
console.log(`[!] SignalingBroker is listening on port ${PortNumber}...`);
