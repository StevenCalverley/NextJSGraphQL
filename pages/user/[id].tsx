import type { NextPage, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const Home: NextPage<
  Awaited<ReturnType<typeof getServerSideProps>>["props"]
> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-lg font-medium">{user?.name}</h1>
        <Link href="/">Home</Link>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params?.id as string),
    },
  });

  return {
    props: {
      user,
    },
  };
};
