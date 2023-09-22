"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';

import axios from '@/axios';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/use-toast';
import { getFromLocalStorage } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';

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

const resetResponses = async (data: {
  surveyId: string;
  userId: string;
  type: string;
}) => {
  await axios.post(
    `/response/delete?surveyId=${data.surveyId}&userId=${data.userId}&type=${data.type}`
  );
};

const Page = ({ params }: pageProps) => {
  const [result, setResult] = useState<TA | FR | WT | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);

  const { toast } = useToast();
  const user = getFromLocalStorage("user", true);

  const { mutate: restartSurvey } = useMutation({
    mutationFn: resetResponses,
    onError: (e) => {
      console.log(e);
      setResetting(false);

      toast({
        title: "Error",
        description: "Something went wrong while restarting the survey",
        variant: "destructive",
        duration: 3000,
      });
    },
    onSuccess: () => {
      setResetting(false);
      window.location.href = `/employee/survey/${params.surveyId}`;
    },
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        `/survey/${params.surveyId}/${params.userType}/responses/answers/${params.userId}?sendUser=true`
      );

      setResult(data);
    };

    if (params.surveyId && params.userType && params.userId) fetch();
  }, [params.userType, params.surveyId, params.userId]);

  const handleGoBack = () => {
    window.location.href = "/";
  };

  const handleRestart = () => {
    setResetting(true);
    restartSurvey({
      surveyId: params.surveyId,
      userId: params.userId,
      type: params.userType,
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  // if (user.name?.length === 0 || user.type.length === 0)
  //   return (window.location.href = "/");

  return (
    <div>
      {modalVisible ? (
        <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full min-h-screen bg-gray-100/20 backdrop-blur-sm">
          <div className="w-[400px] bg-white p-4 rounded-xl shadow-xl border border-gray-200 flex flex-col space-y-2 items-center justify-center">
            <h1 className="text-2xl font-semibold">Restart Survey</h1>
            <p className="text-sm font-semibold text-center">
              You have already taken this survey. Do you want to restart the
              survey? This will delete your previous responses.
            </p>
            <div className="flex flex-row items-center justify-center">
              <Button
                className="flex flex-row m-4 space-x-3"
                onClick={handleCancel}
                variant="outline"
              >
                <span>Cancel</span>
              </Button>
              <Button
                className="flex flex-row m-4 space-x-3"
                onClick={handleRestart}
                variant="destructive"
                isLoading={resetting}
              >
                <span>Restart</span>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      {result ? (
        <>
          <div className="flex flex-row space-x-1">
            <Button
              className="flex flex-row m-4 space-x-3"
              onClick={handleGoBack}
            >
              <BsChevronLeft />
              <span>All Surveys</span>
            </Button>
            <Button
              className="flex flex-row m-4 space-x-3"
              onClick={() => setModalVisible(!modalVisible)}
            >
              <AiOutlineReload />
              <span>Restart</span>
            </Button>
          </div>
          <Results
            user={{
              ...(result.user ?? user),
              type: params.userType,
            }}
            submittedAt={result.submittedAt}
            type={getSurveyType(params.surveyId)}
            responses={result}
          />
        </>
      ) : null}
    </div>
  );
};

export default Page;
