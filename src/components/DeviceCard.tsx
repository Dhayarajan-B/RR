"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Circle } from "lucide-react";

interface Device {
  ip: string;
  mac: string;
  hostname: string;
  status: 'online' | 'offline';
  os?: string;
  manufacturer?: string;
  lastSeen?: string;
}

interface DeviceCardProps {
  device: Device;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{device.hostname}</CardTitle>
        <CardDescription>
          <div className="flex items-center space-x-2">
            Status:
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
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground">IP:</span>
          <p>{device.ip}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground">MAC:</span>
          <p>{device.mac}</p>
        </div>
         {device.os && (
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">OS:</span>
            <p>{device.os}</p>
          </div>
        )}
        {device.manufacturer && (
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Manufacturer:</span>
            <p>{device.manufacturer}</p>
          </div>
        )}
        {device.lastSeen && (
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Last Seen:</span>
            <p>{device.lastSeen}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
