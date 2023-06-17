import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { faEdit, faEraser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { PollService } from "../../../services/api.service";
import AppAlertDialog from "../../utility/AlertDialog";

const PollChildrow = ({
  secure_id,
  name,
  start_date,
  end_date,
  description,
  created_at,
}) => {
  const deleteSrv = useDisclosure();

  const toast = useToast();

  const callToast = () => {
    toast({
      title: "Fail",
      description: "Gagal menghapus event",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
    // TODO: Lanjut bikin halaman voting untuk role user
  };

  const deletePoll = async () => {
    const result = await PollService.deletePoll(secure_id);
    if (result.status === 200) {
      deleteSrv.onClose();
      window.location.reload();
    } else {
      callToast();
    }
  };

  return (
    <>
      <div className="m-2">
        <div className="flex p-2">
          <span className="font-bold mr-3 min-w-[75px]">Secure ID</span>
          <span>{secure_id}</span>
        </div>
        <div className="flex p-2">
          <span className="font-bold mr-3 min-w-[75px]">Nama acara</span>
          <span>{name}</span>
        </div>
        <div className="flex p-2">
          <span className="font-bold mr-3 min-w-[75px]">Tanggal Mulai</span>
          <span>{start_date}</span>
        </div>
        <div className="flex p-2">
          <span className="font-bold mr-3 min-w-[75px]">Tanggal Berakhir</span>
          <span>{end_date}</span>
        </div>
        <div className="flex p-2">
          <span className="font-bold mr-3 min-w-[75px]">Created At</span>
          <span>{created_at}</span>
        </div>
        <div className="flex p-2">
          <span className="font-bold mr-3 min-w-[75px]">Description</span>
          <span>{description}</span>
        </div>
        <div className="flex p-2 gap-3">
          <Button
            leftIcon={<FontAwesomeIcon icon={faUsers} />}
            as={Link}
            to={`/event/${secure_id}/voters`}
            variant={"solid"}
            colorScheme="blue"
          >
            Voters
          </Button>
          <Button
            leftIcon={<FontAwesomeIcon icon={faEdit} />}
            as={Link}
            to={`/polls/${secure_id}/edit`}
            variant={"solid"}
            colorScheme="orange"
          >
            Edit
          </Button>
          <Button
            leftIcon={<FontAwesomeIcon icon={faEraser} />}
            onClick={deleteSrv.onOpen}
            variant={"solid"}
            colorScheme="red"
          >
            Hapus
          </Button>
        </div>
      </div>
      {deleteSrv.isOpen && (
        <AppAlertDialog
          onClose={deleteSrv.onClose}
          isOpen={deleteSrv.isOpen}
          action={deletePoll}
          variant="delete"
        />
      )}
    </>
  );
};

export default PollChildrow;
