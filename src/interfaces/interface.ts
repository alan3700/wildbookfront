export interface IUpvoteProps {
  id: number;
  skill: ISkillProps;
  upvotes: IUpvoteProps[];
  upvote: number;
}

export interface ISkillProps {
  id: number;
  name: string;
}

export interface IWilderProps {
  id: number;
  name: string;
  city: string;
  upvotes: IUpvoteProps[];
}

export interface IAddSkillToWilder {
  dataWilders: IWilderProps[];
  dataSkills: ISkillProps[];
}
