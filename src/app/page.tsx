import DeviceList from '@/components/DeviceList';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Network Devices</h1>
      <DeviceList />
    </div>
  );
}
