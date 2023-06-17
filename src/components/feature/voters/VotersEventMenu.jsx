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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
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
import { VoterService } from "../../../services/api.service";
import VotersDetail from "./VotersDetail";
import ModalDialog from "../../utility/ModalDialog";
import UnregisteredVotersChildren from "./UnregisteredVotersChildren";
import ModalFormDialog from "../../utility/ModalFormDialog";
import VotersDetailPoll from "./VotersDetailPoll";

const VotersEventMenu = () => {
  const params = useLoaderData();

  const modalOpt = useDisclosure();

  return (
    <Dashboard>
      <Card className="m-2 w-full min-h-48">
        <CardHeader className="text-gray-500 rounded-t-md">
          <Heading size={"xl"} className="mb-3">
            Pemilih
          </Heading>
          <Button
            leftIcon={<FontAwesomeIcon icon={faCheck} />}
            variant={"outline"}
            colorScheme="blue"
            className="ml-3"
            onClick={modalOpt.onOpen}
          >
            Daftarkan pemilih pada event ini
          </Button>
        </CardHeader>
        <CardBody>
          <DataTable
            apiFunction={VoterService.getVoters(params.eventId)}
            childRowComponent={<VotersDetailPoll />}
            hideColumn={["secure_id", "id", "event_id", "role_name"]}
          />
        </CardBody>
      </Card>
      <ModalDialog
        isOpen={modalOpt.isOpen}
        onClose={modalOpt.onClose}
        title={<h1>Unregistered Voter</h1>}
      >
        <DataTable
          apiFunction={VoterService.getUnregisteredVoters(params.eventId)}
          childRowComponent={
            <UnregisteredVotersChildren event_id={params.eventId} />
          }
          hideColumn={["id", "role_name"]}
        />
      </ModalDialog>
    </Dashboard>
  );
};

export default VotersEventMenu;
