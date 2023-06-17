import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "../../../views/Dashboard";
import DataTable from "../../datatable/DataTable";
import { PollService } from "../../../services/api.service";
import PollChildrow from "./PollChildrow";

const PollMenu = () => {
  return (
    <Dashboard>
      <Card className="m-2 w-full min-h-48">
        <CardHeader className="text-gray-500 rounded-t-md">
          <Heading size={"xl"} className="mb-3">
            Poll
          </Heading>
          <Button
            as={Link}
            to={"/createPoll"}
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
            variant={"outline"}
            colorScheme="blue"
          >
            Buat Poll
          </Button>
        </CardHeader>
        <CardBody>
          <DataTable
            apiFunction={PollService.getPoll}
            hideColumn={[
              "created_at",
              "updated_at",
              "deleted_at",
              "secure_id",
              "description",
            ]}
            childRowComponent={<PollChildrow />}
          />
        </CardBody>
      </Card>
    </Dashboard>
  );
};

export default PollMenu;
