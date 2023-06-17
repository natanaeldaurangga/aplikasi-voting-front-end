import { Button, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "../../../views/Dashboard";
import DataTable from "../../datatable/DataTable";
import { PollService } from "../../../services/api.service";

const PollOption = ({ detailComponent }) => {
  return (
    <Dashboard>
      <Card className="m-2 w-full min-h-48">
        <CardHeader className="text-gray-500 rounded-t-md">
          <Heading size={"lg"} className="mb-3">
            Pilih poll yang akan ditampilkan datanya
          </Heading>
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
            childRowComponent={detailComponent}
          />
        </CardBody>
      </Card>
    </Dashboard>
  );
};

export default PollOption;
