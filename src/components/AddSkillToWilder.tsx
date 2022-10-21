import { useState } from "react";
import { IAddSkillToWilder } from "../interfaces/interface";
import Styles from "./AddSkillToWilder.module.css";
import { useMutation, gql } from "@apollo/client";

const ADD_SKILL_WILDER = gql`
  mutation AddSkillToWilder($wilderId: Float!, $skillId: Float!) {
    skillToWilder(wilderId: $wilderId, skillId: $skillId) {
      id
    }
  }
`;

const AddSkillToWilder = (
  props: IAddSkillToWilder & { onSkillToWilder: Function }
) => {
  const [wilderId, setWilderId] = useState<number>();
  const [skillId, setSkillId] = useState<number>();
  const [addSkillWilder] = useMutation(ADD_SKILL_WILDER);
  return (
    <>
      <h3>Ajouter un skill a un Wilder!</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addSkillWilder({
            variables: { wilderId: wilderId, skillId: skillId },
          });
          // await axios.post("http://localhost:5000/api/upvote", {
          //   wilderId,
          //   skillId,
          // });
          props.onSkillToWilder();
        }}
      >
        <label className={Styles.label}>Wilders</label>
        <select
          className={Styles.input}
          onChange={(e) => {
            console.log(e.target.value);
            setWilderId(parseInt(e.target.value));
          }}
          name="wilders"
          id="wilder-select"
        >
          <option value="">--Choisir un Wilder--</option>
          {props.dataWilders?.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
        <label className={Styles.label}>Skills</label>
        <select
          className={Styles.input}
          onChange={(e) => {
            console.log(e.target.value);
            setSkillId(parseInt(e.target.value));
          }}
          name="wilders"
          id="wilder-select"
        >
          <option value="">--Choisir un Skill--</option>
          {props.dataSkills?.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
        <br />
        <button className={Styles.button}>Submit</button>
      </form>
    </>
  );
};

export default AddSkillToWilder;
