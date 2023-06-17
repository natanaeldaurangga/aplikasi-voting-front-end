import {
  Button,
  FormControl,
  FormLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { faEdit, faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { VoterService } from "../../../services/api.service";
import AppAlertDialog from "../../utility/AlertDialog";
import VotersEdit from "./VotersEdit";

const VotersDetail = ({ username, name, role_name, prodi_name }) => {
  const alertSrv = useDisclosure();
  const editSrv = useDisclosure();

  const deleteVoter = async () => {
    const result = await VoterService.deleteVoter(username);
    if (result.status === 200) {
      alertSrv.onClose();
      window.location.reload();
    } else {
      console.log(result);
    }
  };

  // TODO: Lanjut untuk edit data
  return (
    <>
      <div className="m-2">
        <div className="flex gap-5 p-2">
          <span className="font-bold mr-5 min-w-[75px]">Name</span>
          <span>{name}</span>
        </div>
        <div className="flex gap-5 p-2">
          <span className="font-bold mr-5 min-w-[75px]">Username</span>
          <span>{username}</span>
        </div>
        <div className="flex gap-5 p-2">
          <span className="font-bold mr-5 min-w-[75px]">Prodi</span>
          <span>{prodi_name}</span>
        </div>
        <div className="flex gap-5 p-2">
          <span className="font-bold mr-5 min-w-[75px]">Role</span>
          <span>{role_name}</span>
        </div>
        <div className="flex gap-5 p-2">
          <Button
            variant={"solid"}
            colorScheme="orange"
            onClick={editSrv.onOpen}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button onClick={alertSrv.onOpen} variant={"solid"} colorScheme="red">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </div>
      <AppAlertDialog
        onClose={alertSrv.onClose}
        isOpen={alertSrv.isOpen}
        action={deleteVoter}
        variant="delete"
      />
      <VotersEdit
        isOpen={editSrv.isOpen}
        onClose={editSrv.onClose}
        username={username}
      />
    </>
  );
};

export default VotersDetail;
