import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import { useLoaderData } from "react-router-dom";
import ModalFormDialog from "../../utility/ModalFormDialog";
import ProdiService, { CandidateService } from "../../../services/api.service";
import { img_url } from "../../../constants/url";
import { useDispatch } from "react-redux";
import { reRender } from "../../../feature/tableRender";
import AppFormControll from "../../form/AppFormControll";
import App from "../../../App";

const CandidateEdit = ({ isOpen, onClose, secure_id }) => {
  const params = useLoaderData();
  const [vision, setVision] = useState("");
  const [misi, setMisi] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prodiList, setProdiList] = useState([]);
  const [processing, setProcessing] = useState(false);
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

  const dispatch = useDispatch();

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
      if (imgFile) formData.append("image", imgFile);
      formData.append("event_secure_id", values.event_secure_id);
      formData.append("name", values.name);
      formData.append("birth_date", values.birth_date);
      formData.append("no_urut", values.no_urut);
      formData.append("vision", vision);
      formData.append("mission", misi);
      formData.append("prodi", values.prodi);
      const result = await CandidateService.updateCandidate(
        formData,
        secure_id
      );
      console.log(result);
      if (result.status === 201) {
        dispatch(reRender());
        resetForm();
        onClose();
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

    const objectUrl = URL.createObjectURL(imgFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imgFile]);

  useEffect(() => {
    setProcessing(true);
    CandidateService.showCandidate(secure_id)
      .then((res) => {
        const result = res.data.data;
        candForm.setFieldValue("name", result.name);
        candForm.setFieldValue("no_urut", result.no_urut);
        candForm.setFieldValue("birth_date", result.birth_date + "T00:00:00");
        candForm.setFieldValue("prodi", result.prodi_id);
        setVision(result.candidate_details[0].val);
        setMisi(result.candidate_details[1].val);
        setPreview(img_url(result.image));
      })
      .catch(console.log)
      .finally(() => {
        setProcessing(false);
      });
  }, [isOpen]);
  return (
    <ModalFormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={<h1>Form Data Pemilih</h1>}
      onSubmit={() => {
        candForm.handleSubmit();
      }}
      isLoad={isLoading}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          candForm.handleSubmit(e);
        }}
      >
        {processing && (
          <Stack gap={3}>
            {[...Array(7)].map((x, i) => (
              <Skeleton height="20px" key={i} />
            ))}
          </Stack>
        )}
        {!processing && (
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
            <AppFormControll label={"No Urut"} fieldError={fieldError.no_urut}>
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
              <ReactQuill theme="snow" value={vision} onChange={setVision} />
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
        )}
      </form>
    </ModalFormDialog>
  );
};

export default CandidateEdit;
