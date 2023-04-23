import HeaderComponent from "@/components/common/Header";
import { Fragment, useEffect } from "react";
import styles from '../styles/header.module.scss';
import Link from "next/link";
import { Store } from "@/types/store";
import MapSection from "@/components/home/MapSection";
import { NextPage } from "next";
import useStores from "@/hooks/useStore";

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
      <HeaderComponent rightElements={[
          <button 
            onClick = {() => {
              alert("복사하였습니다.");
            }} 
            className = {styles.box}
            key = "button"
            style = {{ marginRight: 8 }}
            >
             복사하기
            </button>,
            <Link href = "/feedback" className = {styles.box} key = "link">
             피드백
            </Link>,        
            ]}
        />
      <main style ={{ width: '100%', height: '100%'}}>
            <MapSection/>
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
