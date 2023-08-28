"use client";

import dynamic from 'next/dynamic';

import useUser from '@/hooks/useUser';

const Survey = dynamic(() => import("@/components/Survey"));
const UserForm = dynamic(() => import("@/components/UserForm"));

export default function Home() {
  const { user } = useUser();

  return (
    <main className="lg:p-24 min-h-fit">
      {/* {user.type !== "employee" ? (
        <UserForm type="employee" />
      ) : (
        <SurveySelector />
      )} */}
      {user.type !== "student" ? <UserForm type="student" /> : <Survey />}
    </main>
  );
}
