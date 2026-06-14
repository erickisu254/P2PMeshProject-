# P2PMeshProject

A parasitic WebRTC signaling broker and peer-to-peer mesh network. Designed to bypass traditional HTTP routing, centralized CDNs, and the financial ruin associated with scaling live broadcast infrastructure. 

## The Architecture
This repository contains the foundational switchboard for a decentralized live broadcasting utopia. It blindly brokers SDP offers and ICE candidates between disconnected local nodes via WebSockets, stepping out of the way before the actual heavy data channels are established.

## Environment Prerequisites
This architecture expects a strictly native Linux environment.
* Native Ubuntu 24.04 LTS (Do not attempt this on WSL or macOS. You will suffer.)
* Native Docker Engine
* Node.js (Managed via NVM)

## The Deployment Ritual
To ignite the signaling broker locally within an isolated container:

```bash
docker compose -f ComposeManifest.yaml up --build -d
