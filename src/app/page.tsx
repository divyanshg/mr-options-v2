"use client";

import Link from 'next/link';

import Survey from '@/components/Survey';
import UserForm from '@/components/UserForm';
import useUser from '@/hooks/useUser';

import SurveySelector from '../components/SurveySelector';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="lg:p-24 min-h-fit">
      {/* {user.type !== "employee" ? (
        <UserForm type="employee" />
      ) : (
        <SurveySelector />
      )} */}
      <Link href="https://ad.doubleclick.net/ddm/trackclk/N1037307.4238611YOUTUBEMASTHEAD./B30328459.373875559;dc_trk_aid=564397209;dc_trk_cid=196374308;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1">
        <h1>Hello Ad</h1>
      </Link>
      {user.type !== "student" ? <UserForm type="student" /> : <Survey />}
    </main>
  );
}
