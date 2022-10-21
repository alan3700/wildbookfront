import { useState } from "react";
import { IWilderProps } from "../interfaces/interface";
import styles from "./AddWilder.module.css";
import { useMutation, gql } from "@apollo/client";

const CREATE_WILDER = gql`
  mutation CreateWilder($city: String!, $name: String!) {
    createWilder(city: $city, name: $name) {
      name
      city
    }
  }
`;

const AddWilder = (props: { onWilderCreated: Function }) => {
  const [name, setName] = useState<IWilderProps["name"]>("");
  const [city, setCity] = useState<IWilderProps["city"]>("");
  const [doCreate, { loading, data }] = useMutation(CREATE_WILDER);
  return (
    <>
      <h3 className={styles.h3}>Ajouter un Wilder !</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await doCreate({ variables: { name: name, city: city } });
          // await axios.post("http://localhost:5000/api/wilders", { name, city });
          setName("");
          setCity("");
          props.onWilderCreated();
        }}
      >
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <label className={styles.label}>City</label>
        <input
          className={styles.input}
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <br />
        <button className={styles.button}>Add Wilder</button>
      </form>
    </>
  );
};

export default AddWilder;
