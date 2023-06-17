import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Dashboard from "../../../views/Dashboard";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import { useLoaderData } from "react-router-dom";
import ProdiService, { CandidateService } from "../../../services/api.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import AppFormControll from "../../form/AppFormControll";

const AddCandidate = () => {
  const params = useLoaderData();
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prodiList, setProdiList] = useState([]);
  const [fieldError, setFieldError] = useState({
    name: false,
    no_urut: false,
    birth_date: false,
    prodi: false,
    vision: false,
    misi: false,
    image: false,
  });

  const toast = useToast();

  const callToast = () => {
    toast({
      title: "Fail",
      description: "Gagal menambahkan data kandidat baru",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const inputImage = useRef();
  const candForm = useFormik({
    initialValues: {
      event_secure_id: params.eventId,
      name: "",
      no_urut: 0,
      birth_date: "",
      prodi: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", imgFile);
      formData.append("event_secure_id", values.event_secure_id);
      formData.append("name", values.name);
      formData.append("birth_date", values.birth_date);
      formData.append("no_urut", values.no_urut);
      formData.append("vision", visi);
      formData.append("mission", misi);
      formData.append("prodi", values.prodi);
      const result = await CandidateService.createCandidate(formData);
      if (result.status === 201) {
        setTimeout(() => {
          window.location.href = "/event/" + params.eventId + "/candidates";
        }, 1000);
      } else {
        const error = result.response.data.data;
        setFieldError({ ...fieldError, ...error });
        callToast();
      }
      setIsLoading(false);
    },
  });

  const onImageChange = (e) => {
    if (e.target.files) {
      setImgFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    ProdiService.getProdis()
      .then((result) => {
        setProdiList(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!imgFile) {
      setPreview(undefined);
      return;
    }
    // TODO: Lanjut untuk restore soft delete
    const objectUrl = URL.createObjectURL(imgFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imgFile]);

  return (
    <Dashboard>
      <Card className="m-2 w-full min-h-48">
        <CardHeader className="text-gray-500 rounded-t-md">
          <Heading size={"xl"} className="mb-3">
            Tambah Kandidat
          </Heading>
        </CardHeader>
        <CardBody className="flex flex-col gap-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              candForm.handleSubmit(e);
            }}
          >
            <Stack gap={3}>
              {/* Full Name */}
              <AppFormControll label={"Full Name"} fieldError={fieldError.name}>
                <Input
                  variant={"outline"}
                  type="text"
                  name="name"
                  placeholder="Title"
                  onChange={(e) => candForm.handleChange(e)}
                  value={candForm.values.name}
                />
              </AppFormControll>
              {/* No Urut */}
              <AppFormControll
                label={"No Urut"}
                fieldError={fieldError.no_urut}
              >
                <Input
                  variant={"outline"}
                  type="number"
                  name="no_urut"
                  placeholder="No Urut"
                  onChange={(e) => candForm.handleChange(e)}
                  value={candForm.values.no_urut}
                />
              </AppFormControll>
              {/* Birth Date */}
              <AppFormControll
                label={"Birth Date"}
                fieldError={fieldError.birth_date}
              >
                <Input
                  name="birth_date"
                  type="datetime-local"
                  onChange={(e) => candForm.handleChange(e)}
                  value={candForm.values.birth_date}
                />
              </AppFormControll>
              {/* Visi */}
              <AppFormControll label={"Visi"} fieldError={fieldError.vision}>
                <ReactQuill theme="snow" value={visi} onChange={setVisi} />
              </AppFormControll>
              {/* Misi */}
              <AppFormControll label={"Misi"} fieldError={fieldError.misi}>
                <ReactQuill theme="snow" value={misi} onChange={setMisi} />
              </AppFormControll>
              <AppFormControll label={"Foto"} fieldError={fieldError.image}>
                <Flex direction={"column"}>
                  {preview && <Image src={preview} width={"28"} />}
                  <Input
                    ref={inputImage}
                    onChange={onImageChange}
                    padding={"1"}
                    type="file"
                  />
                </Flex>
              </AppFormControll>
              <AppFormControll
                label={"Program Studi"}
                fieldError={fieldError.prodi}
              >
                <Select
                  placeholder="Select option"
                  onChange={candForm.handleChange}
                  name="prodi"
                  value={candForm.values.prodi}
                >
                  {prodiList.map((prodi, key) => (
                    <option key={key} value={`${prodi.id}`}>
                      {prodi.name}
                    </option>
                  ))}
                </Select>
              </AppFormControll>
            </Stack>
            <FormControl>
              <Button
                className="w-full"
                type="submit"
                variant={"solid"}
                colorScheme="blue"
              >
                {!isLoading ? (
                  <>Submit</>
                ) : (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                )}
              </Button>
            </FormControl>
          </form>
        </CardBody>
      </Card>
    </Dashboard>
  );
};

export default AddCandidate;
