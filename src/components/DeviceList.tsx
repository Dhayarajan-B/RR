"use client"

import { useEffect, useState } from 'react';
import DeviceCard from './DeviceCard';

interface Device {
  ip: string;
  mac: string;
  hostname: string;
  status: 'online' | 'offline';
  os?: string;
  manufacturer?: string;
  lastSeen?: string;
}

const DeviceList = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    let websocket: WebSocket | null = null;

    const connectWebSocket = () => {
      websocket = new WebSocket('ws://localhost:3001');

      websocket.onopen = () => {
        console.log('WebSocket connected');
      };

      websocket.onmessage = (event) => {
        try {
          const newDevices = JSON.parse(event.data);
          setDevices(newDevices);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      websocket.onclose = () => {
        console.log('WebSocket disconnected');
        // Attempt to reconnect after a delay
        setTimeout(() => {
          connectWebSocket();
        }, 3000); // Reconnect every 3 seconds
      };

      websocket.onerror = (error) => {
        if (error) {
          console.error('WebSocket error:', error);
        }
      };
    };

    connectWebSocket();

    return () => {
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.close();
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {devices.map((device, index) => (
        <DeviceCard key={index} device={device} />
      ))}
    </div>
  );
};

export default DeviceList;
