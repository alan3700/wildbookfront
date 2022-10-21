import { useState } from "react";
import Styles from "./Skill.module.css";
import { useMutation, gql } from "@apollo/client";

const CREATE_SKILL = gql`
  mutation createSkill($name: String!) {
    createSkill(name: $name) {
      id
      name
    }
  }
`;
const AddSkill = (props: { onSkillCreated: Function }) => {
  const [name, setName] = useState("");
  const [doCreate] = useMutation(CREATE_SKILL);
  return (
    <>
      <h3>Ajouter un Skill !</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await doCreate({ variables: { name: name } });
          // await axios.post("http://localhost:5000/api/skills", { name });
          setName("");
          props.onSkillCreated();
        }}
      >
        <label className={Styles.label}>Name</label>
        <input
          className={Styles.input}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <button className={Styles.button}>Add Skill</button>
      </form>
    </>
  );
};

export default AddSkill;
