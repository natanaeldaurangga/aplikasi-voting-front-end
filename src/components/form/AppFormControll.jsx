import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import React from "react";

const AppFormControll = ({ label, fieldError, children }) => {
  const normalizeMsg = (str) => {
    let tmp = str.replace("validation.", "");
    return tmp[0].toUpperCase() + tmp.substring(1);
  };

  return (
    <FormControl isInvalid={fieldError}>
      <FormLabel>{label}</FormLabel>
      {children}
      {fieldError &&
        Array.from(fieldError).map((msg, key) => (
          <FormErrorMessage key={key}>{normalizeMsg(msg)}</FormErrorMessage>
        ))}
    </FormControl>
  );
};

export default AppFormControll;
