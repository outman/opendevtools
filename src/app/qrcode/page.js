"use client";

import {
  Select,
  SelectItem,
  Button,
  Card,
  CardBody,
  Textarea,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { useState } from "react";
import QRCode from "qrcode";

export default function QrCode() {
  const [errorCorrectLevels, setErrorCorrectLevels] = useState(new Set('M'));
  const [version, setVersion] = useState(new Set(['10']));
  const [data, setData] = useState("");
  const [imageData, setImageData] = useState("");


  const doGenerate = async () => {
    if (!data) {
      return;
    }

    try {
      let r = await QRCode.toDataURL(data, {
        errorCorrectionLevel: errorCorrectLevels.values().next().value,
        version: version.values().next().value,
      });
      setImageData(r);
    } catch (e) {
      console.log(e);
    }
  };

  let versions = new Map();
  for (let i = 1; i <= 40; i++) {
    versions.set(`${i}`, `Version ${i}`);
  }

  return (
    <div className="flex flex-row space-x-2">
      <div className="flex-1">
        <Card>
          <CardHeader className="space-x-2 px-3">
            <Select
              size="sm"
              label="Select error resistance"
              color="primary"
              onChange={(e) => {
                setErrorCorrectLevels(new Set(e.target.value.split(",")))
              }}
              selectionMode='single'
              selectedKeys={errorCorrectLevels}
            >
              <SelectItem key="L">
                Low (~7%)
              </SelectItem>
              <SelectItem key="M">
                Medium (~15%)
              </SelectItem>
              <SelectItem key="Q">
                Quartile (~25%)
              </SelectItem>
              <SelectItem key="H">
                High (~30%)
              </SelectItem>
            </Select>
            <Select
              size="sm"
              label="Select version"
              onChange={(e) => {
                setVersion(new Set(e.target.value.split(',')))
              }}
              selectedKeys={version}
              color="primary"
            >
              {[...versions.keys()].map((key) => {
                return (
                  <SelectItem key={key} value={key}>
                    {versions.get(key)}
                  </SelectItem>
                );
              })}
            </Select>
          </CardHeader>
          <Divider></Divider>
          <CardBody>
            <Textarea
              placeholder="Enter text to be qrcode"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </CardBody>
          <Divider />
          <CardFooter className="space-x-2">
            <Button
              color="primary"
              onClick={(e) => {
                doGenerate();
              }}
            >
              Generate
            </Button>
            {imageData && (
              <Button
                color="success"
                onClick={(e) => {
                  const a = document.createElement("a");
                  a.href = imageData;
                  a.download = "qrcode.png";
                  a.click();
                  a.remove();
                }}
              >
                Download
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      <div className="flex-1">
        <div>{imageData && <Image src={imageData} alt="qrcode" />}</div>
      </div>
    </div>
  );
}
