// src/lib/websocket.ts
import { WebSocketServer } from 'ws';
import { arp } from 'node-arp';

interface DeviceInfo {
  mac: string;
  ip: string;
  vendor?: string;
}

const wss = new WebSocketServer({ port: 3001 });

let lastDeviceList: string | null = null;

async function scanNetwork(): Promise<DeviceInfo[]> {
  return new Promise((resolve, reject) => {
    const devices: DeviceInfo[] = [];
    arp.table(function(err: any, table: any) {
      if (err) {
        console.error("Error scanning network:", err);
        reject(err);
        return;
      }
      if(!table) {
          reject('Arp table is empty')
          return
      }
      for (const entry of table) {
        if (entry && entry.ip && entry.mac) {
          devices.push({ ip: entry.ip, mac: entry.mac });
        }
      }
      resolve(devices);
    });
  });
}

function broadcastDevices(devices: DeviceInfo[]) {
  const deviceList = JSON.stringify(devices);
  if (deviceList !== lastDeviceList) {
    wss.clients.forEach(client => {
      client.send(deviceList);
    });
    lastDeviceList = deviceList;
  }
}

async function startScanning() {
  try {
    const devices = await scanNetwork();
    broadcastDevices(devices);
  } catch (error) {
    console.error("Failed to scan network:", error);
  }
  setTimeout(startScanning, 5000); // Scan every 5 seconds
}

wss.on('connection', ws => {
  console.log('Client connected to WebSocket server');
});

// Only start scanning if not in production
if (process.env.NODE_ENV === 'development') {
  startScanning();
}

console.log('WebSocket server started on port 3001');

export default wss;
