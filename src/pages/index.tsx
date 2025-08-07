import { Section1, Section2, Section3, Section4 } from '@/components/contents';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>Agile Planning Poker – Scrum Estimation Tool</title>
        <meta
          name="description"
          content="Estimate user stories efficiently with our free online Planning Poker tool for Agile and Scrum teams. Fast, collaborative, and easy to use."
        />
        <meta
          name="keywords"
          content="Planning Poker, Scrum, Agile estimation, sprint planning, scrum poker, agile tools, story points"
        />

        <meta
          property="og:title"
          content="Agile Planning Poker – Scrum Estimation Tool"
        />
        <meta
          property="og:description"
          content="Collaborative Planning Poker for remote and co-located Agile teams. Make sprint planning easy and transparent."
        />
        <meta
          property="og:url"
          content="https://planning-poker-delta.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://planning-poker-delta.vercel.app/_next/image?url=%2Fstatic%2Flogo.webp&w=48&q=75"
        />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Planning Poker Guide – How to Play & Why Teams Choose Us"
        />
        <meta
          name="twitter:description"
          content="Step-by-step guide to playing Planning Poker in Scrum. See why teams rely on our tool for smart, simple estimation."
        />
        <meta
          name="twitter:image"
          content="https://planning-poker-delta.vercel.app/_next/image?url=%2Fstatic%2Flogo.webp&w=48&q=75"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://planning-poker-delta.vercel.app/" />
      </Head>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default Home;
