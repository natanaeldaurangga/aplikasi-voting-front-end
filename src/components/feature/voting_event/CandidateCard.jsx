import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const CandidateCard = () => {
  return (
    <Card className="w-96">
      <CardHeader>[Nama]</CardHeader>
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack>
          <Text>
            [Deskripsi] Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dolorem nostrum, maiores porro facere est totam, sunt sit quos
            veniam eligendi ipsum ipsam dolore ut. Illo itaque et laborum
            asperiores modi.
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup>
          <Button variant={"solid"} colorScheme="blue">
            Pilih
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
