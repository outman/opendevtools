"use client";

import { Listbox, ListboxItem } from "@nextui-org/react";
import {
  HomeIcon,
  IconWrapper,
  ChatIcon,
} from "@/components/IconWrapper";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const MenuItems = ({ children }) => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState(["home"]);

  const matchRedirect = (key) => {
    setSelectedKeys([key]);
    if (key === "home") {
      router.replace("/");
    } else {
      router.replace(`/${key}`);
    }
  };
  return (
    <div className="w-full border-default-200 dark:border-default-100">
      <Listbox
        aria-label="Actions"
        onAction={(key) => {
          matchRedirect(key);
        }}
        className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small rounded-medium"
        itemClasses={{
          base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
        }}
      >
        <ListboxItem
          key="home"
          startContent={
            <IconWrapper>
              <HomeIcon className="text-lg " />
            </IconWrapper>
          }
          className={selectedKeys.includes("home") ? "bg-default-100/80" : ''}
        >
          Home
        </ListboxItem>

        <ListboxItem
          key="chat"
          startContent={
            <IconWrapper>
              <ChatIcon className="text-lg " />
            </IconWrapper>
          }
          className={selectedKeys.includes("chat") ? "bg-default-100/80" : ''}
        >
          Chat
        </ListboxItem>
      </Listbox>
    </div>
  );
};
