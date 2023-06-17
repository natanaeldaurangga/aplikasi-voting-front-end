import React, { useMemo, useState } from "react";
import { Button } from "@chakra-ui/react";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Paginate = ({ totalPage, currentPage, setCurrentPage }) => {
  const radius = 1;

  // const [pageArr, setPageArr] = useState([]);
  let pageArr = [];

  const setPagination = () => {
    let pages = [];
    let head = currentPage - radius;
    head = head >= 1 ? head : 1;
    let tail = currentPage + radius;
    tail = tail <= totalPage ? tail : totalPage;

    for (let i = head; i <= tail; i++) {
      pages.push(i);
    }

    if (head - 1 > 1) pages.unshift(undefined);
    if (pages[0] !== 1) pages.unshift(1);
    if (tail < totalPage - 1) pages.push(undefined);
    if (pages[pages.length - 1] !== totalPage) pages.push(totalPage);

    return pages;
  };

  // useState(() => {
  //   setPagination();
  // }, [totalPage, currentPage]);

  pageArr = useMemo(() => {
    return setPagination();
  }, [totalPage, currentPage]);

  // TODO: buat pagination kayak di website meownime

  return (
    <div className="flex lg:flex-row md:flex-row flex-col items-center gap-2 rounded-md p-2">
      {currentPage > 1 && (
        <Button
          variant={"outline"}
          onClick={() =>
            setCurrentPage(currentPage == 1 ? currentPage : currentPage - 1)
          }
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </Button>
      )}

      {Array.from(pageArr).map((num, key) => (
        <Button
          key={key}
          variant={num === currentPage ? "solid" : "outlined"}
          isDisabled={num ? false : true}
          onClick={() => setCurrentPage(num)}
          cursor={"pointer"}
          colorScheme="teal"
        >
          {num || "..."}
        </Button>
      ))}

      {currentPage < totalPage && (
        <Button
          variant={"outline"}
          onClick={() =>
            setCurrentPage(
              currentPage == totalPage ? currentPage : currentPage + 1
            )
          }
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </Button>
      )}
    </div>
  );
};

export default Paginate;
