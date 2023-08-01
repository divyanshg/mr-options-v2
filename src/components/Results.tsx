import { FC } from 'react';

import { UserState } from '../context/User';
import FRResults from './FRResults';
import TAResults from './TAResults';
import UserData from './UserData';
import WTResults from './WTResults';

interface ResultsProps {
  type: "TA" | "FR" | "WT";
  responses: any;
  user: UserState;
}

const Results: FC<ResultsProps> = ({ type, responses, user }) => {
  return (
    <div>
      <UserData {...user} />
      <h1 className="mx-3 my-3 text-lg font-semibold">Results</h1>
      {type === "TA" && <TAResults data={[responses]} />}
      {type === "FR" && <FRResults responses={responses} />}
      {type === "WT" && <WTResults responses={responses} />}
    </div>
  );
};

export default Results;
