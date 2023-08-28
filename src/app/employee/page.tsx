"use client";
import dynamic from 'next/dynamic';

import useUser from '@/hooks/useUser';

const SurveySelector = dynamic(() => import("@/components/SurveySelector"));
const UserForm = dynamic(() => import("@/components/UserForm"));

const Page = () => {
  const {
    user: { type: userType },
  } = useUser();

  return (
    <main className="lg:p-24 min-h-fit">
      {userType !== "employee" ? (
        <UserForm type="employee" />
      ) : (
        <SurveySelector />
      )}
    </main>
  );
};

export default Page;
