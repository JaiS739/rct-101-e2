import React from "react";
import { useState, useReducer } from "react";
import styles from "./AddProduct.module.css";

const AddProduct = () => {
  // TODO: Remove below const and instead import them from chakra
  const Button = () => <div />;
  const Modal = () => <div />;
  const ModalBody = () => <div />;
  const Input = () => <div />;
  const Select = () => <div />;
  const RadioGroup = () => <div />;
  const Radio = () => <div />;

  const [form, setForm] = useState({
    title: "",
    category: "",
    gender: "",
    imageSrc: "https://picsum.photos/seed/picsum6/420/260",
    price: "",
  });

  const [saveData, setSaveData] = useState([]);
  const [ignored, forceUdate] = useReducer((x) => x + 1, 0);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      title: form.title,
      category: form.category,
      gender: form.gender,
      // imageSrc: form.,
      price: form.price,
    };

    let result = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    });
    let data = await result.json();
    setSaveData(data);
    forceUdate();
    setForm({
      title: "",
      category: "",
      gender: "",
      imageSrc: "https://picsum.photos/seed/picsum6/420/260",
      price: "",
    });
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className={styles.form1st}>
          <h2>Add New Product</h2>
          <div>
            <label htmlFor="">Title:</label>
            <input
              onChange={handleChange}
              type="text"
              value={form.title}
              name="title"
            />
          </div>
          <div>
            <label htmlFor="">Category:</label>
            <select
              name="category"
              id=""
              onChange={handleChange}
              value={form.category}
            >
              <option value="">Category</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Jeans">Jeans</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Gender:</label>
            <label htmlFor="">Male</label>
            <input
              onChange={handleChange}
              type="radio"
              name="gender"
              value={"male"}
            />
            <label htmlFor="">Female</label>
            <input
              onChange={handleChange}
              type="radio"
              name="gender"
              value={"female"}
            />
          </div>
          <div>
            <label htmlFor="">Price</label>
            <input
              onChange={handleChange}
              type="number"
              name="price"
              value={form.price}
            />
          </div>
          <div>
            <button>Create</button>
          </div>
        </div>
      </form>

      <Button my={4} data-cy="add-product-button"></Button>
      <Modal>
        <ModalBody pb={6}>
          <Input data-cy="add-product-title" />
          <Select data-cy="add-product-category">
            <option data-cy="add-product-category-shirt"></option>
            <option data-cy="add-product-category-pant"></option>
            <option data-cy="add-product-category-jeans"></option>
          </Select>
          <RadioGroup data-cy="add-product-gender">
            <Radio data-cy="add-product-gender-male"></Radio>
            <Radio data-cy="add-product-gender-female"></Radio>
            <Radio data-cy="add-product-gender-unisex"></Radio>
          </RadioGroup>
          <Input data-cy="add-product-price" />
          <Button data-cy="add-product-submit-button"></Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddProduct;
