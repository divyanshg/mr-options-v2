import axios from '@/axios';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '../hooks/use-toast';
import { Input } from './ui/Input';

interface QuestionProps {
  question_id: number;
  question_number: number;
  survey_id: string;
  question_text: string;
  options: Option[];
}

interface Option {
  option_id: number;
  option_number: number;
  option_text: string;
  score: number;
}

const Question = ({
  question,
  surveyId,
  checkedOption,
}: {
  question: QuestionProps;
  surveyId: string;
  checkedOption?: number;
}) => {
  const { toast } = useToast();
  const _user = localStorage.getItem("user");

  let user: any;

  if (_user) {
    user = JSON.parse(_user);
  }

  const { mutate: saveResponse } = useMutation({
    mutationFn: async (data: any) => {
      return axios.post("/response/record", data);
    },
    onError: (e) => {
      console.log(e);
      toast({
        title: "Error",
        description: "Something went wrong while saving your responses.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  async function handleoptionChange(event: any) {
    const data = {
      surveyId,
      questionId: event.target.name,
      optionId: event.target.value,
      userId: user?.id,
      userType: user?.type ?? "student",
    };

    await saveResponse(data);
  }

  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg">
      <div className="flex flex-row space-x-1">
        <h1 className="text-xl font-semibold">
          {question.question_number}. {question.question_text}
        </h1>
      </div>
      <ul className="my-2 space-y-3">
        {question.options.map((option) => (
          <li key={option.option_id} className="">
            <label className="flex flex-row items-center justify-start space-x-2">
              <Input
                type="radio"
                name={`question_${question.question_id}`}
                value={option.option_id}
                className="w-6 h-6"
                onChange={handleoptionChange}
                defaultChecked={option.option_id === checkedOption}
              />
              <span>{option.option_text}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
