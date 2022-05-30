import React from "react";
import axios from "axios";
import { useEffect } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({
  setData,
  setPage,
  page,
  setTotalCount,
  setLimit,
  limit,
  totalCount,
}) => {
  // TODO: Remove below const and instead import them from chakra
  const Button = () => <div />;
  const ButtonGroup = () => <div />;
  const Select = () => <div />;

  let getData = async () => {
    let result = await axios.get(
      `http://localhost:8080/products?_page=${page}&_limit=${limit}`
    );
    let data = await result.data;
    setData(data);
    setTotalCount(Number(result.headers["x-total-count"]));
  };

  useEffect(() => {
    getData();
  }, [page, limit]);

  return (
    <>
      <div className={styles.pageCenter}>
        <div>
          <button disabled={page <= 1} onClick={() => setPage(1)}>
            First
          </button>
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <select name="" id="" onChange={(e) => setLimit(e.target.value)}>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
          </select>
          <button
            disabled={totalCount < page * limit}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
          <button
            disabled={totalCount < page * limit}
            onClick={() => setPage(Math.ceil(totalCount / limit))}
          >
            Last
          </button>
        </div>
      </div>

      <ButtonGroup>
        <Button data-cy="pagination-first-button"></Button>
        <Button data-cy="pagination-previous-button"></Button>
        <Select data-cy="pagination-limit-select">
          <option data-cy="pagination-limit-3"></option>
          <option data-cy="pagination-limit-6"></option>
          <option data-cy="pagination-limit-9"></option>
        </Select>
        <Button data-cy="pagination-next-button"></Button>
        <Button data-cy="pagination-last-button"></Button>
      </ButtonGroup>
    </>
  );
};

export default Pagination;
