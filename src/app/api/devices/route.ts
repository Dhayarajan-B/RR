'use server';

import { arp } from 'node-arp';

interface DeviceInfo {
  mac: string;
  ip: string;
  vendor?: string;
}

export async function GET(): Promise<Response> {
  try {
    const networkDevices: DeviceInfo[] = await new Promise((resolve, reject) => {
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

    return new Response(JSON.stringify(networkDevices), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch devices' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
