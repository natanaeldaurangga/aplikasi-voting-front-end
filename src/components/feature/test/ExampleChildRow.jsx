import { List, ListItem } from "@chakra-ui/react";
import React from "react";

const ExampleChildRow = ({ name, username, role_name, prodi_name }) => {
  return (
    <div className="flex flex-row w-full">
      <List>
        <ListItem>
          <span className="font-bold">Nama: </span>
          {name}
        </ListItem>
        <ListItem>
          <span className="font-bold">Username: </span>
          {username}
        </ListItem>
        <ListItem>
          <span className="font-bold">Role: </span>
          {role_name}
        </ListItem>
        <ListItem>
          <span className="font-bold">Prodi: </span>
          {prodi_name}
        </ListItem>
      </List>
    </div>
  );
};

export default ExampleChildRow;
