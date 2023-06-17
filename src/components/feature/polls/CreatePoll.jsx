import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Dashboard from "../../../views/Dashboard";
import { useFormik } from "formik";
import AppFormControll from "../../form/AppFormControll";
import { PollService } from "../../../services/api.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const CreatePoll = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldError, setFieldError] = useState({
    name: false,
    start_date: false,
    end_date: false,
    description: false,
  });

  const toast = useToast();

  const callToast = () => {
    toast({
      title: "Fail",
      description: "Gagal menambahkan data polling baru",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const pollForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      start_date: "",
      end_date: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      console.log(values);
      const result = await PollService.createPoll(values);
      if (result.status === 201) {
        setTimeout(() => {
          window.location.href = "/polls";
        }, 1000);
        // TODO: Lanjut bikin update, delete, getResult dari poll event
      } else {
        const error = result.response.data.data;
        setFieldError({ ...fieldError, ...error });
        callToast();
      }
      resetForm();
      setIsLoading(false);
    },
  });

  return (
    <Dashboard>
      <Card className="m-2 w-full min-h-48">
        <CardHeader className="text-gray-500 rounded-t-md">
          <Heading size={"xl"} className="mb-3">
            Create Poll Form
          </Heading>
        </CardHeader>
        <CardBody className="flex flex-col gap-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              pollForm.handleSubmit(e);
            }}
          >
            <Stack gap={3}>
              <AppFormControll
                label={"Nama Acara"}
                fieldError={fieldError.name}
              >
                <Input
                  variant={"outline"}
                  id="nameInput"
                  type="text"
                  name="name"
                  placeholder="name"
                  onChange={(e) => pollForm.handleChange(e)}
                  value={pollForm.values.name}
                />
              </AppFormControll>
              <AppFormControll
                label={"Keterangan"}
                fieldError={fieldError.description}
              >
                <Textarea
                  name="description"
                  placeholder="Detail about the polls"
                  onChange={(e) => pollForm.handleChange(e)}
                  value={pollForm.values.description}
                />
              </AppFormControll>
              <AppFormControll
                label={"Tanggal Mulai"}
                fieldError={fieldError.start_date}
              >
                <Input
                  name="start_date"
                  type="datetime-local"
                  onChange={(e) => pollForm.handleChange(e)}
                  value={pollForm.values.start_date}
                />
              </AppFormControll>
              <AppFormControll
                label={"Tanggal Berakhir"}
                fieldError={fieldError.end_date}
              >
                <Input
                  name="end_date"
                  type="datetime-local"
                  onChange={(e) => pollForm.handleChange(e)}
                  value={pollForm.values.end_date}
                />
              </AppFormControll>
              <FormControl maxWidth={"3xl"}>
                <Button
                  className="w-full"
                  type="submit"
                  variant={"solid"}
                  colorScheme="blue"
                >
                  {!isLoading ? (
                    <>Submit</>
                  ) : (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                  )}
                </Button>
              </FormControl>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Dashboard>
  );
};

export default CreatePoll;
