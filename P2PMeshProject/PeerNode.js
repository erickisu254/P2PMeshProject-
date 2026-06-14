const WebSocket = require('ws');

const BrokerUrl = 'ws://localhost:8080';
const SocketConnection = new WebSocket(BrokerUrl);

SocketConnection.on('open', () => {
    console.log('[+] Connected to the local SignalingBroker container.');
    
    // Simulate sending a mock local SDP initialization handshake to the mesh
    const MockSdpPayload = {
        peerId: `Peer_${Math.floor(Math.random() * 1000)}`,
        type: 'offer',
        sdp: 'v=0\r\no=alice 2890844526 2890842807 IN IP4 host.any...'
    };
    
    console.log(`[->] Broadcasting mock SDP offer into the mesh network...`);
    SocketConnection.send(JSON.stringify(MockSdpPayload));
});

SocketConnection.on('message', (RawData) => {
    try {
        const ParsedPayload = JSON.parse(RawData);
        console.log(`\n[<-] Intercepted a transmission from the mesh!`);
        console.log(`[*] From Node: ${ParsedPayload.peerId}`);
        console.log(`[*] Payload Type: ${ParsedPayload.type}`);
        console.log(`[*] Data Block: ${ParsedPayload.sdp.substring(0, 40)}...`);
    } catch (ErrorParsing) {
        console.log('[!] Received unparseable data stream from broker.');
    }
});

SocketConnection.on('close', () => {
    console.log('[-] Disconnected from the signaling matrix.');
});
