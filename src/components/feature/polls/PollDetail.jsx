import React, { useState } from "react";
import Dashboard from "../../../views/Dashboard";
import { Card, CardBody, CardHeader, Flex, Heading } from "@chakra-ui/react";
import PieChart from "../../chart/PieChart";

const PollDetail = () => {
  const data = [
    { name: "Group A", value: 73 },
    { name: "Group B", value: 38 },
  ];

  // NOTE: fix pake react chart js 2
  const [pollData, setPollData] = useState({
    labels: data.map((data) => data.name),
    datasets: [
      {
        label: "Voters: ",
        data: data.map((data) => data.value),
        backgroundColor: ["#3B82F6", "#ecf0f1"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <Dashboard>
      <Card className="m-2 w-full min-h-48">
        <CardHeader className="text-gray-500 rounded-t-md">
          <Heading size={"xl"}>Detail Poling</Heading>
        </CardHeader>
        <CardBody>
          <div className="flex lg:flex-row flex-col item-center justify-center gap-5 lg:h-96 md:h-72 h-56">
            <PieChart chartData={pollData} />
            <div className="border border-black w-96 p-1"></div>
          </div>
        </CardBody>
      </Card>
    </Dashboard>
  );
};

export default PollDetail;
