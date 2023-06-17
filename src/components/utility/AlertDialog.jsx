import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

const AppAlertDialog = ({ isOpen, onClose, action, variant = "delete" }) => {
  const roleStyle = {
    delete: {
      color: "red",
      text: "Delete",
    },
    save: {
      color: "blue",
      text: "Save",
    },
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {roleStyle[variant].text} Data
          </AlertDialogHeader>
          <AlertDialogBody>Apakah anda yakin?</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              colorScheme={roleStyle[variant].color}
              onClick={action}
              ml={3}
            >
              {roleStyle[variant].text}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AppAlertDialog;
