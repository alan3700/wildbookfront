import { useEffect, useState } from "react";
import "./App.css";
import { ISkillProps } from "./interfaces/interface";
import { IWilderProps } from "./interfaces/interface";
import Wilder from "./components/Wilder";
import AddWilder from "./components/AddWilder";
import AddSkill from "./components/AddSkill";
import AddSkillToWilder from "./components/AddSkillToWilder";
import { useQuery, gql } from "@apollo/client";

const GET_WILDERS = gql`
  query GetWilders {
    wilders {
      id
      name
      city
      upvotes {
        upvote
        skill {
          name
        }
      }
    }
  }
`;
const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      name
      upvotes {
        upvote
        skill {
          name
        }
      }
    }
  }
`;
function App() {
  const {
    loading: wilderLoading,
    data: wilderData,
    refetch: wilderRefetch,
  } = useQuery(GET_WILDERS);
  const {
    loading: skillLoading,
    data: skillData,
    refetch: skillRefetch,
  } = useQuery(GET_SKILLS);

  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container flex-container">
        <div className="wilderList">
          <h2>Wilders</h2>
          <section className="card-row">
            {wilderLoading && "Chargement..."}
            {wilderData?.wilders.map((element: any) => (
              <Wilder
                onWilderDeleted={() => wilderRefetch()}
                id={element.id}
                key={element.id}
                name={element.name}
                city={element.city}
                upvotes={element.upvotes}
              />
            ))}
          </section>
        </div>
        <div className="formAdd">
          <AddWilder onWilderCreated={() => wilderRefetch()} />
          <hr></hr>
          <AddSkill onSkillCreated={() => skillRefetch()} />
          {skillLoading && "Chargement..."}
          {skillData?.skills.map((element: any) => (
            <li>{element.name}</li>
          ))}
          <hr></hr>
          <AddSkillToWilder
            onSkillToWilder={() => wilderRefetch()}
            dataWilders={wilderData?.wilders}
            dataSkills={skillData?.skills}
          />
        </div>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
