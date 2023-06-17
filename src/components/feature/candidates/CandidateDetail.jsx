import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
} from "@chakra-ui/react";
import Dashboard from "../../../views/Dashboard";
import avatarPng from "../../../assets/avatar5.png";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CandidateDetail = () => {
  const dataLoader = useLoaderData();

  console.log(dataLoader.candidateId);

  return (
    <Dashboard>
      <Card className="w-full m-2 min-h-[200px]">
        <CardHeader className="text-gray-500 rounded-t-md">
          <Heading size={"xl"} className="mb-3">
            Kang Idat
          </Heading>
          <Button
            as={Link}
            to={"/candidate/fasdfasd98/edit"}
            leftIcon={<FontAwesomeIcon icon={faEdit} />}
            variant={"outline"}
            colorScheme="blue"
          >
            Edit
          </Button>
        </CardHeader>
        <CardBody>
          <Flex direction={"column"} gap={"10"} className="max-w-[500px]">
            {/* TODO: Lanjut untuk ngebuat detail kandidat dan voter */}
            <Image boxSize={"200px"} objectFit={"cover"} src={avatarPng} />
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 capitalize text-xs font-bold">
                NAMA LENGKAP
              </span>
              <span className="text-gray-500 text-lg">Kang Idat</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 capitalize text-xs font-bold">
                TANGGAL LAHIR
              </span>
              <span className="text-gray-500 text-lg">2001-10-08</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 capitalize text-xs font-bold">
                PROGRAM STUDI
              </span>
              <span className="text-gray-500 text-lg">D4-Akuntansi</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 capitalize text-xs font-bold">
                VISI
              </span>
              <div className="text-gray-500 break-words text-lg ml-5">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                  laboriosam, deserunt incidunt corrupti fuga illum fugit.
                  Numquam saepe libero debitis repellendus facere? Rerum sunt
                  repellendus ex dolores eaque nisi harum?
                </p>
              </div>
            </div>
            {/* TODO: Lanjut untukd detail voters */}
            <div className="flex flex-col gap-2">
              <span className="text-gray-600 capitalize text-xs font-bold">
                MISI
              </span>
              <div className="text-gray-500 text-lg ml-10">
                <ul className="list-decimal">
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </li>
                  <li>Lorem ipsum dolor sit amet consectetur.</li>
                </ul>
              </div>
            </div>
          </Flex>
        </CardBody>
      </Card>
    </Dashboard>
  );
};

export default CandidateDetail;
