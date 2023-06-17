import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Text,
} from "@chakra-ui/react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axios, { checkAdmin, handleSubmit } from "../../auth";
import { Navigate, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState(false);
  const [loadSpin, setLoadSpin] = useState(false);

  const signInForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoadSpin(true);
      let result = await handleSubmit(values.username, values.password);
      if (result.status !== axios.HttpStatusCode.Ok) {
        values.username = "";
        values.password = "";
        setErr(true);
        setLoadSpin(false);
      } else {
        setTimeout(() => {
          setLoadSpin(false);
          if (checkAdmin()) {
            navigate("/", { replace: true });
          } else {
            navigate("/vote", { replace: true });
          }
        }, 1000);
      }
    },
  });
  // TODO: perbaiki lagi protected route pisahkan route untuk admin sama voter
  return (
    <Grid className="w-screen h-screen grid bg-gray-300 font-sans">
      <div className="flex flex-col gap-2 items-center w-[480px] min-h-[400px] pt-10 pb-5 px-5 rounded-md shadow-md shadow-black bg-white place-self-center">
        <h1 className="text-4xl text-gray-600 ">Login</h1>
        {err && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription>Username atau password salah</AlertDescription>
          </Alert>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signInForm.handleSubmit(e);
          }}
          className="w-full flex flex-col gap-7 mt-3"
        >
          <FormControl maxWidth={"xl"}>
            <FormLabel className="text-gray-500">
              <Text className="text-xl">Username</Text>
            </FormLabel>
            <Input
              variant={"outline"}
              name="username"
              placeholder="Username"
              onChange={(e) => signInForm.handleChange(e)}
              value={signInForm.values.username}
            />
          </FormControl>
          <FormControl maxWidth={"xl"}>
            <FormLabel className="text-gray-500">
              <Text className="text-xl">Password</Text>
            </FormLabel>
            <Input
              variant={"outline"}
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => signInForm.handleChange(e)}
              value={signInForm.values.password}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" variant={"solid"}>
            {loadSpin ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </Grid>
  );
};

export default Signin;
