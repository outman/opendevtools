import {
  SettingIcon,
  ListIcon,
  PlusIcon,
  PencilSquareIcon,
} from "@/components/IconWrapper";
import { useDisclosure, Button, Tooltip } from "@nextui-org/react";
import "./header.css";
import { Setting } from './setting';
import { History } from './history';
import { db } from '@/store/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Prompt } from "./prompt";

export function Header(props) {
  const { handleResetMessage, handleMessage, messages } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const { isOpen:isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();

  const sessions = useLiveQuery(
    () => db.sessions.orderBy("tt").reverse().toArray(),
  );
  const handleHistory = (e) => {
    onOpen1();
  }
  return (
    <div className="fixed right-6">
      <div className="flex bg-indion-100 space-x-2">
        <Tooltip content="Edit the system default prompt">
          <Button isIconOnly color="primary" size="sm" onClick={() => onOpen2()}
          isDisabled={ messages.length > 1 }>
            <PencilSquareIcon className="w-6 h-6"></PencilSquareIcon>
          </Button>
        </Tooltip>
        <Tooltip content="Session history">
          <Button isIconOnly color="primary" size="sm"
          onClick={ handleHistory }>
            <ListIcon className="w-6 h-6"></ListIcon>
          </Button>
        </Tooltip>
        <Tooltip content="Setting configs">
          <Button
            isIconOnly
            color="primary"
            size="sm"
            onClick={() => onOpen()}
          >
            <SettingIcon className="w-6 h-6"></SettingIcon>
          </Button>
        </Tooltip>
        <Tooltip content="Create a new session">
          <Button
            isIconOnly
            color="primary"
            size="sm"
            onClick={() => handleResetMessage()}
          >
            <PlusIcon className="w-6 h-6"></PlusIcon>
          </Button>
        </Tooltip>
      </div>
      <Setting isOpen={isOpen} onClose={onClose} />
      <History isOpen={isOpen1} onClose={onClose1} sessions={sessions} handleMessage={handleMessage} />
      <Prompt isOpen={isOpen2} onClose={onClose2} handleMessage={handleMessage} />
    </div>
  );
}
