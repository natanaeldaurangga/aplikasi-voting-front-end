import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Skeleton,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Dashboard from "../../../views/Dashboard";
import { useFormik } from "formik";
import { useLoaderData } from "react-router-dom";
import { PollService } from "../../../services/api.service";
import AppFormControll from "../../form/AppFormControll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const PollEdit = () => {
  const params = useLoaderData();

  const field = {
    name: false,
    description: false,
    start_date: false,
    end_date: false,
  };
  // TODO: Lanjut bikin form untuk update data polls
  const [fieldError, setFieldError] = useState(field);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const toast = useToast();

  const callToast = (message) => {
    toast({
      title: "Fail",
      description: message,
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
      const result = await PollService.updatePoll(values, params.pollId);
      if (result.status === 201) {
        window.location.href = "/polls";
      } else {
        const error = result.response.data.data;
        setFieldError({ ...fieldError, ...error });
        callToast("Gagal mengupdate data polling");
      }
      setIsLoading(false);
    },
  });

  useEffect(() => {
    setIsProcessing(true);
    PollService.showPoll(params.pollId)
      .then((res) => {
        const result = res.data.data;
        pollForm.setFieldValue("name", result.name);
        pollForm.setFieldValue("description", result.description);
        pollForm.setFieldValue("start_date", result.start_date);
        pollForm.setFieldValue("end_date", result.end_date);
      })
      .catch((err) => {
        callToast();
      }) // TODO: Lanjut buat delete
      .finally(() => setIsProcessing(false));
  }, []);

  return (
    <Dashboard>
      <Card className="m-2 w-full min-h-48">
        <CardHeader className="text-gray-500 rounded-t-md">
          <Heading size={"xl"} className="mb-3">
            Edit Poll Form
          </Heading>
        </CardHeader>
        <CardBody className="flex flex-col gap-5">
          {isProcessing && (
            <Stack gap={3}>
              {[...Array(5)].map((x, i) => (
                <Skeleton height="20px" key={i} />
              ))}
            </Stack>
          )}
          {!isProcessing && (
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
                  label={"Deskripsi"}
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
          )}
        </CardBody>
      </Card>
    </Dashboard>
  );
};

export default PollEdit;
