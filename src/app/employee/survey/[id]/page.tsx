"use client";
import dynamic from 'next/dynamic';

const Survey = dynamic(() => import("@/components/Survey"));

interface pageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: pageProps) => {
  return <Survey id={params.id} />;
};

export default Page;
