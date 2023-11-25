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
import { FormatTimestampToDate } from "@/util/time";

export default function Timestamp() {
  const [timestamp, setTimestamp] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [orgDate, setOrgDate] = useState("");
  const [targetTimestamp, setTargetTimestamp] = useState("");

  const doTransform = () => {
    try {
      let t = 0;
      if (timestamp.includes('.') && timestamp.charAt(10) === '.') {
        t = Math.round(parseFloat(timestamp) * 1000);
      } else if (timestamp.length === 10) {
        t = parseInt(timestamp) * 1000;
      } else if (timestamp.length === 13) {
        t = parseInt(timestamp)
      } else {
        setTargetDate('');
        return;
      }
      setTargetDate(FormatTimestampToDate(t));
    } catch (e) {
      console.log(e);
    }
  };

  const doTransform1 = () => {
    if (orgDate) {
      let d = new Date(orgDate)
      setTargetTimestamp(d.getTime().toString());
    }
  };
  return (
    <div className="flex">
      <div className="flex-1 space-y-4">
        <Card>
          <CardHeader className="flex gap-1">
            <p className="text-md">Timestamp to Date</p>
          </CardHeader>
          <Divider></Divider>
          <CardBody className="space-y-2">
            <div className="flex flex-row space-x-2 items-center">
              <Input
                type="number"
                color="default"
                label="Timestamp"
                className="max-w-[200px]"
                value={timestamp}
                onChange={(e) => {
                  setTimestamp(e.target.value);
                }}
              />
              <div>=</div>
              <Input
                type="text"
                color="default"
                label="Local date"
                className="max-w-[200px]"
                value={targetDate}
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
            <p className="text-md">Date to Timestamp</p>
          </CardHeader>
          <Divider></Divider>
          <CardBody className="space-y-2">
            <div className="flex flex-row space-x-2 items-center">
              <Input
                type="text"
                color="default"
                label="Local date"
                className="max-w-[200px]"
                value={orgDate}
                onChange={(e) => {
                  setOrgDate(e.target.value);
                }}
              />
              <div>=</div>
              <Input
                type="number"
                color="default"
                label="Timestamp"
                className="max-w-[200px]"
                value={targetTimestamp}
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
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
