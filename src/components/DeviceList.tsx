"use client"

import { useEffect, useState } from 'react';
import DeviceCard from './DeviceCard';

interface Device {
  ip: string;
  mac: string;
  hostname: string;
  status: 'online' | 'offline';
}

const DeviceList = () => {
  const [devices, setDevices] = useState<Device[]>([
    { ip: '192.168.1.1', mac: '00:1A:2B:3C:4D:5E', hostname: 'Router', status: 'online' },
    { ip: '192.168.1.2', mac: '00:A1:B2:C3:D4:E5', hostname: 'MyPC', status: 'online' },
    { ip: '192.168.1.3', mac: '00:22:33:44:55:66', hostname: 'Printer', status: 'offline' },
  ]);

  useEffect(() => {
    // Simulate device discovery (replace with actual network scanning logic)
    // This is a placeholder - implement real device discovery using a library or backend service.
    const discoverDevices = async () => {
        // In a real application, this would involve scanning the network
        // and updating the device list.
        // For now, we'll just simulate a delay.
        await new Promise(resolve => setTimeout(resolve, 1000));
        // After "scanning", simulate a device changing status
        setDevices(prevDevices => {
            const updatedDevices = prevDevices.map(device => {
                if (device.hostname === 'Printer') {
                    return { ...device, status: 'online' as 'online' };
                }
                return device;
            });
            return updatedDevices;
        });
    };

    discoverDevices();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {devices.map((device, index) => (
        <DeviceCard key={index} device={device} />
      ))}
    </div>
  );
};

export default DeviceList;
