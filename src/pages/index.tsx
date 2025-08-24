import Head from "next/head";
import HomePage from "@/components/home/HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>SunFit Discover Diet - Personalized Nutrition Planning</title>
        <meta name="description" content="Get your personalized diet plan with AI-powered nutrition recommendations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
}
