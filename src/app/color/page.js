"use client";

import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { useState } from "react";
import { Colors } from "./colors";

export default function Color() {
  let textColors = [
      '#5C2223', '#5A191B', '#5A1216', '#541E24', '#4D1018', '#4C1F24', '#500A16', '#621624',
      '#2D0C13', '#36282B', '#30161C', '#63071C', '#33141E', '#310F1B', '#381924', '#382129',
      '#621D34', '#4B1E2F', '#62102E', '#461629', '#36292F', '#440E25', '#482936', '#411C35',
      '#1C0D1A', '#131124', '#22202E', '#35333C', '#1F2040', '#0F1423', '#131824', '#101F30',
      '#1C2938', '#142334', '#132C33', '#1F2623', '#141E1B', '#15231B', '#2B312C', '#373834',
      '#393733', '#363433', '#481E1C', '#483332', '#584717', '#1A3B32', '#21373D', '#1E131D',
      '#2B1216', '#2D2E36', '#2F2F35', '#302F4B', '#322F3B', '#3E3841', '#2E317C',
  ];
  const [red, setRed] = useState("");
  const [green, setGreen] = useState("");
  const [blue, setBlue] = useState("");
  const [color, setColor] = useState("#000000");
  const [red1, setRed1] = useState("");
  const [green1, setGreen1] = useState("");
  const [blue1, setBlue1] = useState("");
  const [color1, setColor1] = useState("#000000");

  const doTransform = () => {
    try {
      let [r, g, b] = [
        "0" + parseInt(red, 10).toString(16),
        "0" + parseInt(green, 10).toString(16),
        "0" + parseInt(blue, 10).toString(16),
      ];
      r = r.substring(r.length - 2);
      g = g.substring(g.length - 2);
      b = b.substring(b.length - 2);
      let result = `#${r}${g}${b}`.toUpperCase();
      if (result.includes("NAN")) {
        result = "#000000";
      }
      setColor(result);
    } catch (e) {
      console.log(e);
    }
  };

  const doTransform1 = () => {
    let r = "000000";
    if (color1.startsWith("#") && color1.length === 7) {
      r = color1.substring(1);
    } else if (color1.length === 6) {
      r = color1;
    }

    let blue = "0x" + r.substring(4);
    let green = "0x" + r.substring(2, 4);
    let red = "0x" + r.substring(0, 2);
    setRed1(parseInt(red, 16).toString(10));
    setGreen1(parseInt(green, 16).toString(10));
    setBlue1(parseInt(blue, 16).toString(10));
  };
  return (
    <div className="flex">
      <div className="basis-2/3 space-y-4">
        <Card>
          <CardHeader className="flex gap-1">
            <p className="text-md">RGB to Hex</p>
          </CardHeader>
          <Divider></Divider>
          <CardBody className="space-y-2">
            <div className="flex flex-row space-x-2 items-center">
              <Input
                type="number"
                color="danger"
                label="Red"
                className="max-w-[120px]"
                value={red}
                onChange={(e) => {
                  setRed(e.target.value);
                }}
              />
              <Input
                type="number"
                color="success"
                label="Green"
                className="max-w-[120px]"
                value={green}
                onChange={(e) => {
                  setGreen(e.target.value);
                }}
              />
              <Input
                type="number"
                color="primary"
                label="Blue"
                className="max-w-[120px]"
                value={blue}
                onChange={(e) => {
                  setBlue(e.target.value);
                }}
              />
              <div>=</div>
              <Input
                type="text"
                color="default"
                label="Hex"
                className="max-w-[120px]"
                value={color}
              />
            </div>
            <div className="flex flex-row space-x-2">
              <Button
                size="sm"
                color="primary"
                onClick={(e) => {
                  doTransform();
                }}
              >
                Transform
              </Button>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex gap-1">
            <p className="text-md">Hex to RGB</p>
          </CardHeader>
          <Divider></Divider>
          <CardBody className="space-y-2">
            <div className="flex flex-row space-x-2 items-center">
              <Input
                type="text"
                color="default"
                label="Hex"
                className="max-w-[120px]"
                value={color1}
                onChange={(e) => {
                  setColor1(e.target.value);
                }}
              />
              <div>=</div>
              <Input
                type="number"
                color="danger"
                label="Red"
                className="max-w-[120px]"
                value={red1}
              />
              <Input
                type="number"
                color="success"
                label="Green"
                className="max-w-[120px]"
                value={green1}
              />
              <Input
                type="number"
                color="primary"
                label="Blue"
                className="max-w-[120px]"
                value={blue1}
              />
            </div>
            <div className="flex flex-row space-x-2">
              <Button
                size="sm"
                color="primary"
                onClick={(e) => {
                  doTransform1();
                }}
              >
                Transform
              </Button>
            </div>
          </CardBody>
        </Card>
        <Divider></Divider>
        <h2>Example colors:</h2>
        <div className="grid grid-cols-4 gap-4 text-sm">
          {Colors().map((item, index) => {
            return <div key={`color_${index}`}
                        className={`p-2 rounded-md space-y-1` + (textColors.includes(item.hex) ? ' text-white' : '')}
                        style={{
              backgroundColor: `${item.hex}`
            }}>
              <div className="flex flex-row space-x-2">
                <div>{item.name}</div>
                <div>{item.hex}</div>
              </div>
              <div>
                <span>{item.rgb.toUpperCase()}</span>
              </div>
            </div>
          })}
        </div>
      </div>
      <div className="basis-1/3"></div>
    </div>
  );
}
