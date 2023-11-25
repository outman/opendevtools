import React from "react";
import {Card, CardHeader,Image} from "@nextui-org/react";
import { XFunctionIcon } from "./IconWrapper";

export function Logo() {
  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex gap-3">
          <span className="inline-flex items-center justify-center p-2 bg-black rounded-md shadow-lg h-[40px] w-[40px]">
            <XFunctionIcon className="w-6 h-6" />
          </span>
          <div className="flex flex-col">
            <p className="text-md">: prompt</p>
            <p className="text-small text-default-500"> {">"} Get inspired</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
