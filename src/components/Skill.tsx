import Styles from "./Skill.module.css";
import axios from "axios";
import { ISkillProps } from "../interfaces/interface";

function Skill(props: ISkillProps & { onUpvote: Function; vote: number }) {
  return (
    <li>
      {props.name}
      <button
        className={Styles.button}
        onClick={async () => {
          console.log("click");
          await axios.put(
            "http://localhost:5000/api/upvotes/" + props.id + "/upvote"
          );
          props.onUpvote();
        }}
      >
        {props.vote}
      </button>
    </li>
  );
}
export default Skill;
