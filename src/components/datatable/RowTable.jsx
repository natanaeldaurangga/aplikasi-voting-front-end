import { Button, Td, Tr } from "@chakra-ui/react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const RowTable = ({
  key,
  indexNum,
  data,
  columns,
  hideColumn,
  orderedColumn,
  children,
}) => {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <>
      <Tr className="hover:bg-gray-100">
        <Td
          onClick={() => setDetailOpen(!detailOpen)}
          className="flex justify-between items-center cursor-pointer"
        >
          <Button
            size={"xs"}
            rounded={"full"}
            variant={"solid"}
            colorScheme="blue"
            textColor={"white"}
          >
            <FontAwesomeIcon icon={detailOpen ? faMinus : faPlus} size="xs" />
          </Button>
          {indexNum}
        </Td>
        {columns
          .filter((col) => !hideColumn.includes(col))
          .map((col, key) => (
            <Td
              className={`${col === orderedColumn && "bg-slate-100"}`}
              isNumeric={!isNaN(data[col])}
              key={key}
            >
              {data[col]}
            </Td>
          ))}
      </Tr>
      {/* TODO: Lanjut bikin child-th untuk datatable */}
      <Tr className={`${detailOpen || "hidden"}`} bgColor={"gray.100"}>
        <Td colSpan={Array.from(columns).length + 1}>{children}</Td>
      </Tr>
    </>
  );
};

export default RowTable;
