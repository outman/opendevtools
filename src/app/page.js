import { Link } from "@nextui-org/react";
import {
  ColorIcon,
  TimestampIcon,
  QrCodeIcon,
  CodeIcon,
} from "@/components/IconWrapper";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 text-sm">
      <div className="bg-white p-2 rounded-md">
        <Link href="/json" className="text-black w-full">
          <div className="flex flex-row space-x-4">
            <div className="flex items-center">
            <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
              <CodeIcon className="w-6 h-6 text-white" />
            </span>
            </div>
            <div className="flex flex-col">
              <div>Json</div>
              <div className="text-gray-400">json format</div>
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-white p-2 rounded-md">
        <Link href="/timestamp" className="text-black w-full">
          <div className="flex flex-row space-x-4">
            <div className="flex items-center">
            <span className="inline-flex items-center justify-center p-2 bg-purple-500 rounded-md shadow-lg">
              <TimestampIcon className="w-6 h-6 text-white" />
            </span>
            </div>
            <div className="flex flex-col">
              <div>Time Convert</div>
              <div className="text-gray-400">timestamp & date</div>
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-white p-2 rounded-md">
        <Link href="/qrcode" className="text-black w-full">
          <div className="flex flex-row space-x-4">
            <div className="flex items-center">
            <span className="inline-flex items-center justify-center p-2 bg-fuchsia-500 rounded-md shadow-lg">
              <QrCodeIcon className="w-6 h-6 text-white" />
            </span>
            </div>
            <div className="flex flex-col">
              <div>QR Code</div>
              <div className="text-gray-400">qr code generate</div>
            </div>
          </div>
        </Link>
      </div>

      <div className="bg-white p-2 rounded-md">
        <Link href="/color" className="text-black w-full">
          <div className="flex flex-row space-x-4">
            <div className="flex items-center">
            <span className="inline-flex items-center justify-center p-2 bg-violet-500 rounded-md shadow-lg">
              <ColorIcon className="w-6 h-6 text-white" />
            </span>
            </div>
            <div className="flex flex-col">
              <div>Color</div>
              <div className="text-gray-400">color convert</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
