"use client";
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';

import axios from '@/axios';
import { useQuery } from '@tanstack/react-query';

const ResponseList = dynamic(() => import("@/components/Admin/ResponseList"));
const SurveyList = dynamic(() => import("@/components/Admin/SurveyList"));
const Results = dynamic(() => import("@/components/Results"));

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

const Page = ({}) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleAdminLogin = () => {
    const adminPassword = "yourAdminPassword"; // Replace this with your actual admin password

    const inputPassword = prompt("Enter Admin Password:");
    if (inputPassword === adminPassword) {
      setLoggedIn(true);
    } else {
      alert("Invalid password. Please try again.");
    }
  };

  useEffect(() => handleAdminLogin(), []);

  const [surveyListOpen, setSurveyListOpen] = useState<boolean>(false);
  const [selectedSurvey, setSelectedSurvey] = useState<any>("");

  const [selectedUserType, setSelectedUserType] = useState<any>("student");

  const [availableResponses, setAvailableResponses] = useState<any>([]);
  const [responsesListOpen, setResponsesListOpen] = useState<boolean>(false);
  const [selectedResponse, setSelectedResponse] = useState<any>(null);

  const [responseWithAnswers, setResponseWithAnswers] = useState<{
    data: any[];
    sums: Record<string, number>;
    submittedAt: string;
  }>({
    data: [],
    sums: {},
    submittedAt: "",
  });

  const { data: surveys } = useQuery(["surveys"], async () => {
    const { data } = await axios({
      url: "/survey",
      method: "GET",
    });
    return data;
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios({
        method: "GET",
        url: `/survey/${selectedSurvey.replace(
          " ",
          "_"
        )}/${selectedUserType}/responses`,
      });

      if (data.length > 0) setSelectedResponse(data[0]);
      setAvailableResponses(data);
    };

    if (selectedSurvey && selectedUserType) fetch();
  }, [selectedSurvey, selectedUserType]);

  const fetch = useCallback(async () => {
    const { data } = await axios({
      method: "GET",
      url: `/survey/${selectedSurvey.replace(
        " ",
        "_"
      )}/${selectedUserType}/responses/answers/${selectedResponse?.id}`,
    });
    setResponseWithAnswers(data);
  }, [selectedSurvey, selectedUserType, selectedResponse]);

  useEffect(() => {
    if (selectedResponse) fetch();
  }, [selectedSurvey, selectedUserType, selectedResponse, fetch]);

  if (!loggedIn) return null;

  return (
    <div className="px-4">
      <div className="flex flex-row items-center py-4 space-x-2">
        <SurveyList
          open={surveyListOpen}
          setOpen={setSurveyListOpen}
          value={selectedSurvey}
          setValue={setSelectedSurvey}
          surveys={surveys}
        />
        <select
          className="px-2 py-2 bg-gray-100 border border-gray-300 rounded-md"
          value={selectedUserType}
          onChange={(e) => {
            setSelectedResponse(null);
            setSelectedUserType(e.target.value as any);
          }}
        >
          <option value="student">Student</option>
          <option value="employee">Employee</option>
        </select>

        {availableResponses && availableResponses.length > 0 ? (
          <ResponseList
            open={responsesListOpen}
            setOpen={setResponsesListOpen}
            value={selectedResponse}
            setValue={setSelectedResponse}
            responses={availableResponses}
            userType={selectedUserType}
          />
        ) : (
          "No responses found"
        )}
      </div>
      {selectedResponse ? (
        <Results
          user={{
            ...selectedResponse,
            type: selectedUserType,
          }}
          submittedAt={responseWithAnswers.submittedAt}
          type={getSurveyType(selectedSurvey)}
          responses={responseWithAnswers}
          refetch={fetch}
        />
      ) : null}
    </div>
  );
};

export default Page;
