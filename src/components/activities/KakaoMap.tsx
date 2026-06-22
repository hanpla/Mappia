'use client';

import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

import { useQuery } from '@tanstack/react-query';

interface KakaoMapProps {
  address: string;
}

const MESSAGE_STYLE = `textmd-medium md:textlg-medium text-gray-797 flex h-[180px] w-full items-center justify-center overflow-hidden rounded-3xl bg-stone-50 md:h-[450px]`;

export default function KakaoMap({ address }: KakaoMapProps) {
  const [isLoadingLoader, hasLoaderError] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY!,
    libraries: ['services'],
  });

  const isKakaoReady =
    !isLoadingLoader &&
    !hasLoaderError &&
    typeof window !== 'undefined' &&
    !!window.kakao?.maps?.services;

  const {
    data: coords,
    isError: isGeocodeError,
    isLoading: isLoadingGeocode,
  } = useQuery({
    queryKey: ['mapCoordinate', address],
    queryFn: () => {
      return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (
            status === window.kakao.maps.services.Status.OK &&
            result.length > 0
          ) {
            resolve({
              lat: Number(result[0].y),
              lng: Number(result[0].x),
            });
          } else {
            reject(new Error('Geocoding failed'));
          }
        });
      });
    },
    enabled: isKakaoReady && !!address,
    staleTime: Infinity,
  });

  if (hasLoaderError || isGeocodeError) {
    return <div className={MESSAGE_STYLE}>지도를 불러오지 못했습니다.</div>;
  }

  if (isLoadingLoader || isLoadingGeocode || !coords) {
    return <div className={MESSAGE_STYLE}>지도를 불러오는 중입니다...</div>;
  }

  return (
    <div className="bg-gray-FAF h-45 w-full overflow-hidden rounded-3xl md:h-112.5">
      <Map center={coords} level={3} className="h-full w-full">
        <MapMarker position={coords}>
          <div className="max-w-37.5 truncate p-2 text-center text-xs">
            {address}
          </div>
        </MapMarker>
      </Map>
    </div>
  );
}
