"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";

interface Device {
  ip: string;
  mac: string;
  hostname: string;
  status: 'online' | 'offline';
}

interface DeviceCardProps {
  device: Device;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{device.hostname}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <span>IP:</span>
          <p>{device.ip}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span>MAC:</span>
          <p>{device.mac}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span>Status:</span>
          <p className="flex items-center">
            {device.status === 'online' ? (
              <>
                <Circle className="w-2 h-2 mr-1 text-green-500 fill-green-500" />
                Online
              </>
            ) : (
              <>
                <Circle className="w-2 h-2 mr-1 text-red-500 fill-red-500" />
                Offline
              </>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
