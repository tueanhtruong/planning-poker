import { Section1, Section2, Section3, Section4 } from '@/components/contents';

const Home = () => {
  return (
    <>
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
