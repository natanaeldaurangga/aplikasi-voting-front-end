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
  Select,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Dashboard from "../../../views/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faInfo,
  faPlus,
  faRegistered,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLoaderData } from "react-router-dom";
import DataTable from "../../datatable/DataTable";
import ProdiService, { VoterService } from "../../../services/api.service";
import VotersDetail from "./VotersDetail";
import ModalDialog from "../../utility/ModalDialog";
import UnregisteredVotersChildren from "./UnregisteredVotersChildren";
import ModalFormDialog from "../../utility/ModalFormDialog";
import { useFormik } from "formik";
import AddVoters from "./AddVoters";

const VotersMenu = () => {
  const modalForm = useDisclosure();

  return (
    <>
      <Dashboard>
        <Card className="m-2 w-full min-h-48">
          <CardHeader className="text-gray-500 rounded-t-md">
            <Heading size={"xl"} className="mb-3">
              Pemilih
            </Heading>
            <Button
              leftIcon={<FontAwesomeIcon icon={faPlus} />}
              variant={"solid"}
              colorScheme="blue"
              onClick={() => {
                modalForm.onOpen();
              }}
            >
              Tambah Pemilih Baru
            </Button>
          </CardHeader>
          <CardBody>
            <DataTable
              apiFunction={VoterService.getVoters(false)}
              childRowComponent={<VotersDetail />}
              hideColumn={["secure_id", "id", "event_id", "role_name"]}
            />
          </CardBody>
        </Card>
      </Dashboard>
      <AddVoters isOpen={modalForm.isOpen} onClose={modalForm.onClose} />
    </>
  );
};

export default VotersMenu;
