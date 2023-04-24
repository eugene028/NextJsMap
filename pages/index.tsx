import { Fragment, useEffect } from "react";
import { Store } from "@/types/store";
import MapSection from "@/components/home/MapSection";
import { NextPage } from "next";
import useStores from "@/hooks/useStore";
import Header from "@/components/home/Header";
import DetailSection from "@/components/home/DetailSection";

interface Props {
  stores: Store[];
}


const Home: NextPage<Props> = ({stores}) => {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores); //전역 상태 업데이트
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <Header/>
      <main style ={{ position : 'relative', width :'100%', height: '100%', overflow:'hidden'}}>
            <MapSection/>
            <DetailSection/>
      </main>
    </Fragment>
  )
}

export default Home;

export async function getStaticProps() {
  const stores = (await import('../public/stores.json')).default;
  return {
    props: { stores },
    //revalidate 아예 안줘도 됨
    revalidate : 60 * 60,
  };
}
