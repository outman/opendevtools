import { Textarea } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { UniqId } from "@/util/uniq";
import { USER_ROLE } from "@/util/config";
import { useState } from "react";

export const Prompt = (props) => {
  let { isOpen, onClose, handleMessage } = props;
  const [promptText, setPromptText] = useState("");
  const handleUpdatePrompt = () => {
    if (!promptText) {
      return;
    }

    handleMessage([
      {
        id: UniqId(),
        role: USER_ROLE.SYSTEM,
        content: promptText,
      }
    ]);
    onClose();
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Session default system prompt
            </ModalHeader>
            <ModalBody>
              <Textarea placeholder="Enter your system prompt" value={promptText} onChange={(e) => setPromptText(e.target.value)}></Textarea>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleUpdatePrompt}>
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
