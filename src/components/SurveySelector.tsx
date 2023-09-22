"use client";
import Link from 'next/link';
import { FC, useState } from 'react';

import axios from '@/axios';
import { useQuery } from '@tanstack/react-query';

import { Button } from './ui/Button';

interface SurveySelectorProps {}

const SurveySelector: FC<SurveySelectorProps> = ({}) => {
  const {
    data: surveys,
    isFetching,
    isLoading,
  } = useQuery(["surveys"], async () => {
    const { data } = await axios.get("/survey");
    return data;
  });

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold">Select a survey to begin</h1>
      <div>
        {isLoading || (isFetching && <p>Loading...</p>)}
        <div className="flex flex-col my-2 space-y-2">
          {surveys?.map((survey: any) => (
            <Link key={survey.id} href={`/employee/survey/${survey.id}`}>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-lg font-semibold">{survey.title}</p>
                <p className="truncate">{survey.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveySelector;
