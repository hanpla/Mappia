'use client';

import { useEffect, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
  address: string;
}

interface MapCoordinate {
  lat: number;
  lng: number;
}

const MESSAGE_STYLE = `textmd-medium md:textlg-medium text-gray-797 flex h-[180px] w-full items-center justify-center overflow-hidden rounded-3xl bg-stone-50 md:h-[450px]`;

export default function KakaoMap({ address }: KakaoMapProps) {
  const [coords, setCoords] = useState<MapCoordinate | null>(null);
  const [isLoading, hasError] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY!,
    libraries: ['services'],
  });

  useEffect(() => {
    if (
      isLoading ||
      hasError ||
      !address ||
      !window.kakao ||
      !window.kakao.maps ||
      !window.kakao.maps.services
    ) {
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (
        status === window.kakao.maps.services.Status.OK &&
        result.length > 0
      ) {
        setCoords({
          lat: Number(result[0].y),
          lng: Number(result[0].x),
        });
      }
    });
  }, [address, isLoading, hasError]);

  if (isLoading) {
    return <div className={MESSAGE_STYLE}>지도를 불러오는 중입니다...</div>;
  }

  if (hasError) {
    return <div className={MESSAGE_STYLE}>지도를 불러오지 못 했습니다.</div>;
  }

  return coords ? (
    <div className="bg-gray-FAF h-45 w-full overflow-hidden rounded-3xl md:h-112.5">
      <Map center={coords} level={3} className="h-full w-full">
        <MapMarker position={coords}>
          <div className="max-w-37.5 truncate p-2 text-center text-xs">
            {address}
          </div>
        </MapMarker>
      </Map>
    </div>
  ) : (
    <div className={MESSAGE_STYLE}>위치 정보를 불러오는 중입니다...</div>
  );
}
