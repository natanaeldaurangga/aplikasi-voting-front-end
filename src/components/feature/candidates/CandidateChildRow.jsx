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
import { CandidateService } from "../../../services/api.service";
import AppAlertDialog from "../../utility/AlertDialog";
import CandidateEdit from "./CandidateEdit";

const CandidateChildRow = ({
  secure_id,
  name,
  birth_date,
  prodi_name,
  image,
}) => {
  const alertSrv = useDisclosure();
  const editSrv = useDisclosure();
  const deleteCandidate = async () => {
    const result = await CandidateService.deleteCandidate(secure_id);
    if (result.status === 200) {
      alertSrv.onClose();
      window.location.reload();
    } else {
      console.log(result);
    }
  };

  // TODO: Lanjut untuk bikin restore candidate sama update data candidate
  // berarti di bagian backendnya bikin endpoint untuk GET candidate yang only_trashed.
  return (
    <>
      <div className="m-2">
        <div className="flex p-2">
          <span className="font-bold mr-3 min-w-[75px]">Secure ID</span>
          <span>{secure_id}</span>
        </div>
        <div className="flex p-2">
          <span className="font-bold mr-3 min-w-[75px]">Name</span>
          <span>{name}</span>
        </div>
        <div className="flex p-2">
          <span className="font-bold mr-3 min-w-[75px]">Birth Date</span>
          <span>{birth_date}</span>
        </div>
        <div className="flex p-2">
          <span className="font-bold mr-3 min-w-[75px]">Prodi</span>
          <span>{prodi_name}</span>
        </div>
        <div className="flex gap-2 p-2">
          <Button
            onClick={editSrv.onOpen}
            variant={"solid"}
            colorScheme="orange"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button variant={"solid"} colorScheme="red" onClick={alertSrv.onOpen}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </div>
      {alertSrv.isOpen && (
        <AppAlertDialog
          onClose={alertSrv.onClose}
          isOpen={alertSrv.isOpen}
          action={deleteCandidate}
          variant="delete"
        />
      )}

      {editSrv.isOpen && (
        <CandidateEdit
          isOpen={editSrv.isOpen}
          onClose={editSrv.onClose}
          secure_id={secure_id}
        />
      )}
    </>
  );
};

export default CandidateChildRow;
