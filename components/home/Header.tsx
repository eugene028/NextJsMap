import HeaderComponent from "../common/Header";
import styles from '../../styles/header.module.scss'
import Link from "next/link";
import useMap from "@/hooks/useMap";
import { useRouter } from "next/router";
import { useCallback } from "react";
import copy from 'copy-to-clipboard';

const Header = () => {
    const { resetMapOptions, getMapOptions } = useMap();
    const router = useRouter();
    const replaceAndCopyUrl = useCallback(() => {
        const mapOptions = getMapOptions();
        const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;
    
        router.replace(query);
        copy(location.origin + query);
      }, [router, getMapOptions]);
    
    return (
        <>
            <HeaderComponent 
            onClickLogo={resetMapOptions}
            rightElements={[
                <button 
                    onClick={replaceAndCopyUrl}
                    className = {styles.box}
                    key = "button"
                    style = {{ marginRight: 8 }}
                >
                    공유하기
                </button>,
                <Link href = "/feedback" className = {styles.box} key = "link">
                    피드백
                </Link>,        
            ]}
        />
        </>
    )
}

export default Header;