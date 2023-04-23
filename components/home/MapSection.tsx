
import Map from './Map';
import { NaverMap } from '@/types/map';
import Markers from './Markers';
import useCurrentStore from '@/hooks/useCurrentStore';
import { useRouter, } from 'next/router';
import { useMemo } from 'react';
import { Coordinates } from '@/types/store';
import useMap, {INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';

const MapSection = () => {
    const router = useRouter();
    const query = useMemo(() => new URLSearchParams(router.asPath.slice(1)), []); // eslint-disable-line react-hooks/exhaustive-deps
    const initialZoom = useMemo(
      () => (query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM),
      [query]
    );
    const initialCenter = useMemo<Coordinates>(
      () =>
        query.get('lat') && query.get('lng')
          ? [Number(query.get('lat')), Number(query.get('lng'))]
          : INITIAL_CENTER,
      [query]
    );
    const { initializeMap } = useMap();
    const { clearCurrentStore } = useCurrentStore();

    const onLoadMap = (map: NaverMap) => {
        initializeMap(map);
        naver.maps.Event.addListener(map, 'click', clearCurrentStore);
    };

    return (
        <>
            <Map onLoad = {onLoadMap} 
             initialZoom={initialZoom}
             initialCenter={initialCenter}/>
            <Markers/>
        </>
    );
};

export default MapSection;