"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';

import axios from '@/axios';
import { Button } from '@/components/ui/Button';
import { getFromLocalStorage } from '@/lib/utils';

const Results = dynamic(() => import("@/components/Results"));

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

const Page = ({ params }: pageProps) => {
  const [result, setResult] = useState<TA | FR | WT | null>(null);
  const user = getFromLocalStorage("user", true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        `/survey/${params.surveyId}/${params.userType}/responses/answers/${params.userId}?sendUser=true`
      );

      console.log(data);
      setResult(data);
    };

    if (params.surveyId && params.userType && params.userId) fetch();
  }, [params.userType, params.surveyId, params.userId]);

  const handleGoBack = () => {
    window.location.href = "/";
  };

  // if (user.name?.length === 0 || user.type.length === 0)
  //   return (window.location.href = "/");

  return (
    <div>
      <Button className="m-4" onClick={handleGoBack}>
        <BsChevronLeft />
        All Surveys
      </Button>
      {result ? (
        <Results
          user={{
            ...(result.user ?? user),
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
