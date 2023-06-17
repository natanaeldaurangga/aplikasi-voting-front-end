import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import Dashboard from "../../../views/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useLoaderData } from "react-router-dom";
import DataTable from "../../datatable/DataTable";
import { CandidateService } from "../../../services/api.service";
import CandidateChildRow from "./CandidateChildRow";

const CandidateMenu = () => {
  const params = useLoaderData();

  return (
    <Dashboard>
      <Card className="m-2 w-full min-h-48">
        <CardHeader className="text-gray-500 rounded-t-md">
          <Heading size={"xl"} className="mb-3">
            Kandidat
          </Heading>
          <Button
            as={Link}
            to={`/candidate/${params.eventId}/create`}
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
            variant={"outline"}
            colorScheme="blue"
          >
            Tambah Kandidat
          </Button>
        </CardHeader>
        <CardBody>
          <DataTable
            apiFunction={CandidateService.getCandidates(params.eventId)}
            childRowComponent={<CandidateChildRow />}
            hideColumn={[
              "event_secure_id",
              "secure_id",
              "event_id",
              "image",
              "created_at",
              "updated_at",
            ]}
          />
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </Dashboard>
  );
};

export default CandidateMenu;
