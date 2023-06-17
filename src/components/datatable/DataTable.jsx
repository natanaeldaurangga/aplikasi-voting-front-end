import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  Select,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSortAsc,
  faSortDesc,
} from "@fortawesome/free-solid-svg-icons";
import Paginate from "./Paginate";
import RowTable from "./RowTable";
import { useDispatch, useSelector } from "react-redux";

const DataTable = ({ apiFunction, hideColumn, childRowComponent }) => {
  const [data, setData] = useState([]);
  const [column, setColumn] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(true);
  const [orderBy, setOrderBy] = useState("name");
  const [keyword, setKeyword] = useState("");
  const [tempKeyword, setTempKeyword] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const rerender = useSelector((state) => state.tableRender.rerender);

  useEffect(() => {
    setData([]);
    setIsLoading(true);
    apiFunction(
      perPage,
      currentPage,
      orderBy,
      direction ? "asc" : "desc",
      keyword
    )
      .then((res) => {
        setData(res.data.data.data);
        setTotalData(res.data.data.total);
        setTotalPage(res.data.data.last_page);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [perPage, currentPage, orderBy, direction, keyword, rerender]);
  // FIXME: Kenapa requestnya bisa kebanyak, si laravelnya ngasih 429 http code
  // TODO: Lanjut bikin crud untuk polling
  useEffect(() => {
    if (data.length > 0) {
      setColumn(Object.keys(data[0]));
      setTableHeader(
        Object.keys(data[0]).filter((col) => !hideColumn.includes(col))
      );
    }
  }, [data]);

  // TODO: buat layer untuk loading ketika table di reload
  const calcIndexNum = (key) => {
    return key + (perPage * (currentPage - 1) + 1);
  };

  // Ketika entries berubah maka halaman balik lagi ke 1
  const onEntriesChange = (e) => {
    setPerPage(e.target.value);
    setCurrentPage(1);
  };

  const onSearchKeyword = (e) => {
    e.preventDefault();
    setKeyword(tempKeyword);
  };

  const onHeaderSorted = (colName) => {
    if (colName !== orderBy) {
      // TAH BENER SIGA KIEU LOGICNA
      setOrderBy(colName);
      setDirection(true);
    } else {
      setDirection(!direction);
    }
  };

  const directionLogo = (colName) => {
    // jika nama kolom sama dengan orderedBy dan direction Asc maka return true
    // jika nama kolom sama dengan orderedBy dan direction Desc maka return false
    // jika nama kolom berbeda apapun directionnya maka return true
    if (colName !== orderBy) return false;
    if (colName === orderBy) return direction;
  };

  const LoadingTable = () => {
    return (
      <>
        <Table variant={"simple"} colorScheme="blue">
          <Thead>
            <Tr>
              <Th>
                <Skeleton height={"30px"} />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {[...Array(5)].map((x, i) => (
              <Tr key={i}>
                <Th>
                  <Skeleton height={"20px"} />
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    );
  };

  const MainTable = () => {
    return (
      <>
        <Table variant={"simple"} colorScheme="blue">
          <Thead>
            <Tr>
              <Th>#</Th>
              {tableHeader.map((col, key) => (
                <Th
                  key={key}
                  className="cursor-pointer"
                  onClick={() => onHeaderSorted(col)}
                >
                  <Button size={"xs"} marginRight={"2"}>
                    <FontAwesomeIcon
                      icon={directionLogo(col) ? faSortAsc : faSortDesc}
                    />
                  </Button>
                  {col.replace("_", " ")}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Array.from(data).map((d, key) => (
              <Fragment key={key}>
                <RowTable
                  indexNum={calcIndexNum(key)}
                  data={d}
                  columns={column}
                  hideColumn={hideColumn || []}
                  orderedColumn={orderBy}
                >
                  {React.cloneElement(childRowComponent, { ...d })}
                </RowTable>
              </Fragment>
            ))}
          </Tbody>
        </Table>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between border min-h-[80px] p-2">
        <div className="flex h-20 items-center ml-3 gap-3">
          <span>Show</span>
          <Select value={perPage || 5} onChange={onEntriesChange}>
            <option value="5" defaultValue={true}>
              5
            </option>
            <option value="10">10</option>
            <option value="50">50</option>
          </Select>
          <span>entries</span>
        </div>
        <form onSubmit={onSearchKeyword}>
          <FormControl className="flex items-center justify-center gap-4 mr-3">
            <Input
              className="ml-3"
              type="text"
              colorScheme="blue"
              outlineColor={"blue.400"}
              value={tempKeyword}
              onChange={(e) => setTempKeyword(e.target.value)}
            />
            <Button type="submit" variant={"outline"} colorScheme="blue">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </FormControl>
        </form>
      </div>
      <TableContainer>
        {isLoading ? <LoadingTable /> : <MainTable />}
      </TableContainer>

      <div className="flex justify-center">
        <Paginate
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DataTable;
