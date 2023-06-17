import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ModalFormDialog = ({
  isOpen,
  onClose,
  children,
  title,
  onSubmit,
  isLoad = false,
  size = "5xl",
}) => {
  return (
    <Modal
      size={size}
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onSubmit} variant={"solid"} colorScheme="blue">
            {!isLoad ? (
              <>Save</>
            ) : (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            )}
          </Button>
          <Button marginLeft={"5"} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalFormDialog;
