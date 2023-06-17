import React, { useEffect, useState } from "react";
import ModalFormDialog from "../../utility/ModalFormDialog";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import ProdiService, { VoterService } from "../../../services/api.service";
import { useDispatch } from "react-redux";
import { reRender } from "../../../feature/tableRender";
import AppFormControll from "../../form/AppFormControll";

const VotersEdit = ({ isOpen, onClose, username }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [prodiList, setProdiList] = useState([]);
  const [processing, setProcessing] = useState(false);
  const field = {
    name: false,
    username: false,
    prodi: false,
  };
  const [fieldError, setFieldError] = useState(field);
  const dispatch = useDispatch();

  const toast = useToast();

  const callToast = () => {
    toast({
      title: "Voter berhasil didaftarkan.",
      description: "Data voter berhasil diperbaharui.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const errorToast = () => {
    toast({
      title: "Gagal menperbaharui data voter",
      description: "Periksa kembali input anda",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const voterForm = useFormik({
    initialValues: {
      name: "",
      username: "",
      prodi: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      let { name: name, username, prodi } = values;
      let payload = {
        name,
        username,
        prodi,
      };
      console.log(payload);
      // TODO: Kenap ini nggak bisa udpate
      const result = await VoterService.updateVoter(payload, username);
      console.log(result);
      if (result.status === 200) {
        setIsLoading(false);
        callToast();
        dispatch(reRender());
        onClose();
        resetForm();
        setFieldError(field);
      } else {
        const error = result.response.data.data;
        setFieldError({ ...fieldError, ...error });
        errorToast();
      }

      setIsLoading(false);
    },
  });

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
    setProcessing(true);
    if (isOpen) {
      VoterService.showVoter(username)
        .then((res) => {
          const result = res.data.data;
          voterForm.setFieldValue("name", result.name);
          voterForm.setFieldValue("username", result.username);
          voterForm.setFieldValue("prodi", result.prodi_id);
        })
        .catch(console.log)
        .finally(() => setProcessing(false));
    }
  }, [isOpen]);
  // TODO: Lanjut bikin update data candidate, sama bikin view untuk show only trashed
  return (
    <ModalFormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={<h1>Form Data Pemilih</h1>}
      onSubmit={() => {
        voterForm.handleSubmit();
      }}
      isLoad={isLoading}
    >
      {processing && (
        <Stack gap={3}>
          <Skeleton height={"20px"} />
          <Skeleton height={"20px"} />
          <Skeleton height={"20px"} />
        </Stack>
      )}
      {!processing && (
        <Stack gap={3}>
          <AppFormControll label={"Username"} fieldError={fieldError.username}>
            <Input
              variant={"outline"}
              id="usernameInput"
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="false"
              value={voterForm.values.username}
              onChange={voterForm.handleChange}
              readOnly
            />
          </AppFormControll>
          <AppFormControll label={"Nama Lengkap"} fieldError={fieldError.name}>
            <Input
              variant={"outline"}
              id="nameInput"
              type="text"
              name="name"
              placeholder="Nama lengkap"
              value={voterForm.values.name}
              onChange={voterForm.handleChange}
            />
          </AppFormControll>

          <AppFormControll label={"Prodi"} fieldError={fieldError.prodi}>
            <Select
              placeholder="Select option"
              onChange={voterForm.handleChange}
              name="prodi"
              value={voterForm.values.prodi}
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
    </ModalFormDialog>
  );
};

export default VotersEdit;
