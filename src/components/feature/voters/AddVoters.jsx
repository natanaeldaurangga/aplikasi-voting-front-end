import React, { useEffect, useState } from "react";
import { Input, Select, Stack, useTimeout, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import ProdiService, { VoterService } from "../../../services/api.service";
import { useDispatch } from "react-redux";
import AppFormControll from "../../form/AppFormControll";
import { reRender } from "../../../feature/tableRender";
import ModalFormDialog from "../../utility/ModalFormDialog";

const AddVoters = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [prodiList, setProdiList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const field = {
    name: false,
    username: false,
    password: false,
    c_password: false,
    birth_date: false,
    prodi_id: false,
  };
  const [fieldError, setFieldError] = useState(field);

  const toast = useToast();

  const callToast = () => {
    toast({
      title: "Voter berhasil didaftarkan.",
      description: "Data voter berhasil disimpan pada database.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const errorToast = () => {
    toast({
      title: "Gagal menambahkan data voter",
      description: "Periksa kembali input anda",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
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

  const voterForm = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      c_password: "",
      tglLahir: "",
      prodi_id: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      let {
        name: name,
        username,
        password,
        c_password: c_password,
        prodi_id: prodi_id,
      } = values;
      let payload = {
        name,
        username,
        password,
        c_password,
        prodi_id,
      };
      console.log(payload);

      const result = await VoterService.createVoter(payload);
      console.log(result);
      if (result.status === 200) {
        callToast();
        dispatch(reRender());
        setFieldError(field);
        resetForm();
        onClose();
      } else {
        const error = result.response.data.data;
        setFieldError({ ...fieldError, ...error });
        errorToast();
      }

      setIsLoading(false);
    },
  });

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
      <Stack gap={3}>
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
        <AppFormControll label={"Username"} fieldError={fieldError.username}>
          <Input
            variant={"outline"}
            id="usernameInput"
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="new-username"
            value={voterForm.values.username}
            onChange={voterForm.handleChange}
          />
        </AppFormControll>
        <AppFormControll label={"Password"} fieldError={fieldError.password}>
          <Input
            variant={"outline"}
            id="passwordInput"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            value={voterForm.values.password}
            onChange={voterForm.handleChange}
          />
        </AppFormControll>
        <AppFormControll
          label={"Repeat Password"}
          fieldError={fieldError.c_password}
        >
          <Input
            variant={"outline"}
            id="c_passwordInput"
            type="password"
            name="c_password"
            placeholder="Repeat Password"
            autoComplete="false"
            value={voterForm.values.c_password}
            onChange={voterForm.handleChange}
          />
        </AppFormControll>
        <AppFormControll label={"Prodi"} fieldError={fieldError.prodi_id}>
          <Select
            placeholder="Select option"
            onChange={voterForm.handleChange}
            name="prodi_id"
            value={voterForm.values.prodi_id}
          >
            {prodiList.map((prodi, key) => (
              <option key={key} value={`${prodi.id}`}>
                {prodi.name}
              </option>
            ))}
          </Select>
        </AppFormControll>
      </Stack>
    </ModalFormDialog>
  );
};

export default AddVoters;
