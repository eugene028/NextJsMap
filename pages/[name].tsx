import { GetStaticPaths, NextPage, GetStaticProps } from "next";
import type { Store } from '../types/store';
import { useRouter } from "next/router";
import styles from '../styles/detail.module.scss';
import DetailHeader from "@/components/home/DetailHeader";
import DetailContent from "@/components/home/DetailContent";

interface Props {
    store : Store;
}

const StoreDetail: NextPage<Props> = ({store}) => {
    const expanded = true;
    const router = useRouter();
    return (
        <div className = {`${styles.detailSection} ${styles.expanded} ${styles.selected}}`}>
           <DetailHeader
            currentStore={store}
            expanded={expanded}
            onClickArrow={() => null}
            />
            <DetailContent currentStore = {store} expanded = {expanded}/>
        </div>
    );
    
}

export default StoreDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    const stores = (await import('../public/stores.json')).default;
    const paths = stores.map((store) => ({ params: { name: store.name}}));
    return { paths, fallback : false};
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const stores = (await import ('../public/stores.json')).default;
    const store = stores.find((store) => store.name === params?.name);
    if(!store){
        return {
            notFound: true, //404 page
        };
    }

    return { props: {store} };
}