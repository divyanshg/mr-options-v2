import dynamic from 'next/dynamic';
import { FC } from 'react';

import { UserState } from '../context/User';

const FRResults = dynamic(() => import("@/components/FRResults"));
const TAResults = dynamic(() => import("@/components/TAResults"));
const UserData = dynamic(() => import("@/components/UserData"));
const WTResults = dynamic(() => import("@/components/WTResults"));

interface ResultsProps {
  type: "TA" | "FR" | "WT";
  responses: any;
  user?: UserState | any;
  submittedAt: string;
}

const Results: FC<ResultsProps> = ({ type, responses, user, submittedAt }) => {
  return (
    <div>
      {user ? <UserData {...user} {...{ submittedAt: submittedAt }} /> : null}
      <h1 className="mx-3 my-3 text-lg font-semibold">Results</h1>
      {type === "TA" && <TAResults responses={responses} />}
      {type === "FR" && <FRResults responses={responses} />}
      {type === "WT" && <WTResults responses={responses} />}
    </div>
  );
};

export default Results;
