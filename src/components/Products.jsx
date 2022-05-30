import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AddProduct from "./AddProduct";
import Pagination from "./Pagination";
import { useReducer } from "react";
import styles from "./Products.module.css";

const Products = () => {
  // TODO: Remove below const and instead import them from chakra
  const Flex = () => <div />;
  const Grid = () => <div />;

  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  let getData = async () => {
    let result = await axios.get(
      `http://localhost:8080/products?_page=${page}&_limit=${limit}`
    );
    let data = await result.data;

    setTotalCount(Number(result.headers["x-total-count"]));

    setData(data);
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <>
      <AddProduct />
      <Flex>
        {/*  AddProduct */}
        <Grid>{/* List of Products */}</Grid>
        {/* Pagination */}
      </Flex>
      <div className={styles.flexy}>
        {data.map((e) => (
          <div key={e.id}>
            <img src="https://picsum.photos/seed/picsum4/422/262" alt="" />
            <div className={styles.content1}>
              <h3>{e.category}</h3>
              <h3 className={styles.content2h3}>{e.gender}</h3>
            </div>
            <div className={styles.content2}>
              <h2>{e.title}</h2>
              <h4>{e.price}/unit</h4>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        setPage={setPage}
        page={page}
        setTotalCount={setTotalCount}
        setLimit={setLimit}
        limit={limit}
        setData={setData}
        totalCount={totalCount}
      />
    </>
  );
};

export default Products;
