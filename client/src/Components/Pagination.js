import React, { useEffect, useState, useMemo } from "react";
import './Styles/pagination.css';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

function Pagination ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange
}) {

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
      if (total > 0 && itemsPerPage > 0)
          setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

    const paginationItems = useMemo(() => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
              <li
                className="pagination-item"
                key={i}
                active={`${i === currentPage}`}
                onClick={() => onPageChange(i)}
                >
                {i}
              </li>
            );
        }

        if (pages.length <= 5) {
            return pages;
        }else {
            let neighbourPages;
            let lastPage = pages.slice(-1);

            if (currentPage === 1) {
              let firstPages = pages.slice(0, 3);
              return (<>
                {firstPages}
                 <li
                  className={`pagination-item pagination-item-icon ${(currentPage === totalPages) ? "disabledEvent" : ''}`}
                  onClick={() => onPageChange(currentPage + 1)}
                  >
                    <NavigateNextRoundedIcon />
                </li>
                {lastPage}
              </>)

            } else if (currentPage === pages.length) {
              let firstPage = pages[0];
              let firstPages = pages.slice(-3)
              return (<>
                {firstPage}
                <li
                  className={`pagination-item pagination-item-icon ${(currentPage === 1) ? "disabledEvent" : ''}`}
                  onClick={() => onPageChange(currentPage - 1)}
                  >
                  <NavigateBeforeRoundedIcon />
                </li>
                {firstPages}
              </>)

            } else {
              let firstPage = pages[0];
              let lastPage = pages.slice(-1);
              let firstPages = [pages[currentPage -2 ], pages[currentPage - 1], pages[currentPage]]
              return (<>
                {firstPage}
                <li
                  className={`pagination-item pagination-item-icon ${(currentPage === 1) ? "disabledEvent" : ''}`}
                  onClick={() => onPageChange(currentPage - 1)}
                  >
                  <NavigateBeforeRoundedIcon />
                </li>
                {firstPages}
                <li
                  className={`pagination-item pagination-item-icon ${(currentPage === totalPages) ? "disabledEvent" : ''}`}
                  onClick={() => onPageChange(currentPage + 1)}
                  >
                  <NavigateNextRoundedIcon />
                </li>
                {lastPage}
              </>)
            }
          }
  }, [totalPages, currentPage]);

  return (
    <ul className="pagination">
        {paginationItems}
    </ul>
  )
}

export default Pagination;
