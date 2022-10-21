import blank_profile from "../assets/blank_profile.png";
import Skill from "./Skill";
import { IWilderProps } from "../interfaces/interface";
import { useState } from "react";
import styles from "./Wilder.module.css";
import axios from "axios";
import useModal from "./useModal";
import Modal from "./modal";
import { useMutation, gql } from "@apollo/client";

const DELETE_WILDER = gql`
  mutation DeleteWilder($deleteWilderId: ID) {
    deleteWilder(id: $deleteWilderId) {
      name
      id
    }
  }
`;

function Wilder(props: IWilderProps & { onWilderDeleted: Function }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [deletedWilder] = useMutation(DELETE_WILDER);
  const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal();
  console.log(props);
  const {
    isShowing: isRegistrationFormShowed,
    toggle: toggleRegistrationForm,
  } = useModal();
  return (
    <article className={styles.card}>
      <img src={blank_profile} alt="Jane Doe Profile" />
      <h3 className={styles.h3}>{props.name}</h3>
      <h3 className={styles.h3}>{props.city}</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt .
      </p>
      <ul className={styles.skills}>
        {props.upvotes?.map((element) => (
          <Skill
            id={element.id}
            onUpvote={() => props.onWilderDeleted()}
            key={element.id}
            name={element.skill.name}
            vote={element.upvote}
          />
        ))}
      </ul>
      <button
        className={styles.button}
        onClick={async (e) => {
          e.preventDefault();
          await deletedWilder({ variables: { id: Number(props.id) } });
          props.onWilderDeleted();
        }}
      >
        Delete
      </button>
      <button className={styles.button} onClick={toggleLoginForm}>
        Modifier
      </button>
      <Modal
        isShowing={isLoginFormShowed}
        hide={toggleLoginForm}
        title={props.name}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await axios.put("http://localhost:5000/api/wilders/" + props.id, {
              name: name,
              city: city,
            });
            toggleLoginForm();
            props.onWilderDeleted();
          }}
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input className={styles.button} type="submit" value="submit" />
          </div>
        </form>
      </Modal>
    </article>
  );
}
export default Wilder;
