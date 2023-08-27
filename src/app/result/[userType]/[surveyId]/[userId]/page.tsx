"use client";
import axios from 'axios';
import { FC, useEffect, useState } from 'react';

import Results from '@/components/Results';

interface pageProps {
  params: {
    userType: "student" | "employee";
    surveyId: string;
    userId: string;
  };
}

type WithUser = {
  user: Record<any, any>;
};

interface TA extends WithUser {
  data: Record<string, number>[];
  sums: Record<string, number>;
  submittedAt: string;
}

interface FR extends WithUser {
  scores: Record<string, number>;
  totalScores: {
    row: Record<string, number>;
    cols: Record<string, number>;
    grandTotal: number;
  };
  submittedAt: string;
}

interface WT extends WithUser {
  counts: number[][];
  maxes: number[];
  sets: string[][];
  responses: Record<string, number>;
  submittedAt: string;
}

const getSurveyType = (survey: string) => {
  switch (survey) {
    case "transactional_analysis":
      return "TA";
    case "FIRO-B":
      return "FR";
    case "discovering_work_type":
      return "WT";
    default:
      return "TA";
  }
};

const Page: FC<pageProps> = ({ params }) => {
  const [result, setResult] = useState<TA | FR | WT | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/api/survey/${params.surveyId}/${params.userType}/responses/answers/${params.userId}?sendUser=true`
      );

      console.log(data);
      setResult(data);
    };

    if (params.surveyId && params.userType && params.userId) fetch();
  }, [params.userType, params.surveyId, params.userId]);

  // if (user.name?.length === 0 || user.type.length === 0)
  //   return (window.location.href = "/");

  return (
    <div>
      {result ? (
        <Results
          user={{
            ...result.user,
            type: params.userType,
          }}
          submittedAt={result.submittedAt}
          type={getSurveyType(params.surveyId)}
          responses={result}
        />
      ) : null}
    </div>
  );
};

export default Page;