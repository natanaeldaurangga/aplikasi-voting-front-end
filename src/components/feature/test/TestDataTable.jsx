import { Button, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import Dashboard from "../../../views/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DataTable from "../../datatable/DataTable";
import { CandidateService, VoterService } from "../../../services/api.service";
import ExampleChildRow from "./ExampleChildRow";

const TestDataTable = () => {
  return (
    <Dashboard>
      <Card className="m-2 w-full min-h-48">
        <CardHeader className="text-gray-500 rounded-t-md">
          <Heading size={"xl"} className="mb-3">
            Test Datatable
          </Heading>
          <Button
            as={Link}
            to={"/addCandidate"}
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
            variant={"outline"}
            colorScheme="blue"
          >
            Tambah Kandidat
          </Button>
        </CardHeader>
        <CardBody>
          <DataTable
            apiFunction={VoterService.getVoters}
            hideColumn={["id", "role_name"]}
            childRowComponent={<ExampleChildRow />}
          />
        </CardBody>
      </Card>
    </Dashboard>
  );
};

export default TestDataTable;
