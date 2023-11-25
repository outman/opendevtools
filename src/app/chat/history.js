import { Modal, Button, ModalContent, ModalHeader, ModalBody, ModalFooter, Divider } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useContext } from "react";
import { UniqId } from "@/util/uniq";
import { FormatTimestampToDate } from "@/util/time";
import { ChatContext } from "@/hooks/context";

export function History(props) {
    let { isOpen, onClose, sessions, handleMessage } = props;
    let { setSessionId } = useContext(ChatContext);
    const renderDate = (timestamp) => {
        let formatDate = FormatTimestampToDate(timestamp);
        return <span>{formatDate}</span>
    }
    const renderButton = (messages) => {
        return (
            <Button
                color="default"
                size="sm"
                onPress={() => {
                    onClose();
                    setSessionId(UniqId());
                    handleMessage(messages);
                }}
            >
                Apply
            </Button>
        )
    }
    return (
        <Modal
            isOpen={isOpen}
            scrollBehavior="inside"
            onClose={onClose}
            size="4xl"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Session history
                        </ModalHeader>
                        <ModalBody>
                            <Table isStriped aria-label="Session history list.">
                                <TableHeader>
                                    <TableColumn>Topic</TableColumn>
                                    <TableColumn width={"160px"}>Time</TableColumn>
                                    <TableColumn width={"80px"}></TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {sessions.map(item =>
                                    (
                                        <TableRow key={`row-${item.sessionId}`}>
                                            <TableCell>{item.topic}</TableCell>
                                            <TableCell>{renderDate(item.tt)}</TableCell>
                                            <TableCell>{renderButton(item.messages)}</TableCell>
                                        </TableRow>
                                    )
                                    )}
                                </TableBody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
