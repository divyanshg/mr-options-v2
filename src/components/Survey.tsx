import { FC, useEffect, useState } from 'react';

import axios from '@/axios';
import { Skeleton } from '@/components/ui/skeleton';
import useUser from '@/hooks/useUser';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useToast } from '../hooks/use-toast';
import Question from './Question';
import { Button } from './ui/Button';

interface StudentSurveyProps {
  id?: string;
}

const Survey: FC<StudentSurveyProps> = ({ id = "discovering_work_type" }) => {
  const { toast } = useToast();
  const { user } = useUser();

  const isGiven = async () => {
    const { data } = await axios.get(
      `/survey/given/${id}/${user?.type}/${user?.id}`
    );
    return data;
  };

  const fetchSurvey = async () => {
    const { data } = await axios.get(`/survey/${id}`);
    return data;
  };

  const fetchExistingResponses = async () => {
    if (!user) return;
    const { data } = await axios.get(
      `/response/existsing?userId=${user.id}&surveyId=${id}`
    );
    return data as Record<string, any>[];
  };

  const { data: isGivenSurvey } = useQuery(["isGiven", id], isGiven, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const {
    data: survey,
    error,
    isFetching,
    isLoading,
  } = useQuery(["survey", id], fetchSurvey, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const { data: existingResponses } = useQuery(
    ["existing_responses", id],
    fetchExistingResponses,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: saveResponses } = useMutation({
    mutationFn: async (data: any) => {
      return axios.post("/response/process", data);
    },
    onError: (e) => {
      console.log(e);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong while saving your responses.",
        variant: "destructive",
        duration: 5000,
      });
    },
    onSuccess: () => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Your responses have been recorded.",
      });
      window.location.href = `/result/${user?.type}/${id}/${user?.id}`;
    },
  });

  const [isBtnLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong while fetching the questions.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [error, toast]);

  if (isGivenSurvey?.given) {
    localStorage.removeItem("access_token");
    // localStorage.removeItem("user");
    alert("You have already given this survey");
    window.location.href = `/result/${user?.type}/${id}/${user?.id}`;
  }

  if (isLoading || isFetching) {
    return (
      <div className="w-full p-4 border border-gray-200 rounded-lg">
        <div>
          <Skeleton className="h-4 my-2" />
          <Skeleton className="h-4 my-2 w-[250px]" />
        </div>
        <ul className="mt-4">
          <li>
            <Skeleton className="h-4 my-2 w-[100px]" />
            <Skeleton className="h-4 my-2 w-[80px]" />
            <Skeleton className="h-4 my-2 w-[120px]" />
            <Skeleton className="h-4 my-2 w-[100px]" />
          </li>
        </ul>
      </div>
    );
  }

  async function onSubmit() {
    setIsLoading(true);
    /*convet data from the format {question_number: response} to {
      id: question_number,
      response: response
    }*/
    saveResponses({
      userId: user?.id,
      surveyId: survey?.id,
      userType: user?.type,
    });
  }

  const getSelectedOption = (questionId: number) => {
    if (!existingResponses) return 0;
    return existingResponses?.find(
      (response) => response.question_id === questionId
    )?.option_id;
  };

  if (survey && !isGivenSurvey?.given) {
    return (
      <div className="flex flex-col w-full my-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-xl font-semibold text-center">{survey.title}</h1>
          <p className="px-3 mx-3">{survey.description}</p>
        </div>
        <div id="questions-form">
          <div className="flex flex-col p-4 mx-2 space-y-2">
            {survey.questions
              .sort((a: any, b: any) => a.question_number - b.question_number) // Assuming question_id is a numeric property
              .map((question: any) => (
                <Question
                  key={question.question_id}
                  question={question}
                  surveyId={survey.id}
                  checkedOption={
                    getSelectedOption(question.question_id) || undefined
                  }
                />
              ))}
          </div>
          <div className="flex flex-col p-4 py-2 mx-2 space-y-2">
            <Button isLoading={isBtnLoading} onClick={onSubmit} type="button">
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default Survey;
