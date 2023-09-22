import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from 'react';
import { set } from 'react-hook-form';

import { UserState } from '../context/User';
import { Button } from './ui/Button';

const FRResults = dynamic(() => import("@/components/FRResults"));
const TAResults = dynamic(() => import("@/components/TAResults"));
const UserData = dynamic(() => import("@/components/UserData"));
const WTResults = dynamic(() => import("@/components/WTResults"));

interface ResultsProps {
  type: "TA" | "FR" | "WT";
  responses: any;
  user?: UserState | any;
  submittedAt: string;
  refetch: ({ skipCache }: { skipCache?: boolean | undefined }) => any;
}

const Results: FC<ResultsProps> = ({
  type,
  responses,
  user,
  submittedAt,
  refetch,
}) => {
  const [refetching, setRefetching] = useState<boolean>(false);

  useEffect(() => {
    setRefetching(false);
  }, [responses]);

  return (
    <div>
      {user ? <UserData {...user} {...{ submittedAt: submittedAt }} /> : null}
      <h1 className="mx-3 my-3 text-lg font-semibold">Results</h1>
      <div className="flex flex-row items-center justify-center mb-4 space-x-2">
        <p className="p-2 mx-4 text-sm font-bold bg-red-100 rounded">
          Note: Results might be incomplete due to processing delay! Please
          refresh if the result is incomplete.
        </p>
        <Button
          isLoading={refetching}
          onClick={() => {
            setRefetching(true);
            // refetch({
            //   skipCache: true,
            // });
            window.location.reload();
          }}
        >
          Refresh
        </Button>
      </div>
      {type === "TA" && <TAResults responses={responses} refetch={refetch} />}
      {type === "FR" && <FRResults responses={responses} refetch={refetch} />}
      {type === "WT" && <WTResults responses={responses} refetch={refetch} />}
    </div>
  );
};

export default Results;
