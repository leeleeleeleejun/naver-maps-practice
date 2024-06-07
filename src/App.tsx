import { useEffect, useState } from "react";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import getCurrentLocation from "./utils/getCurrentLocation";
import usePolylinePath from "./utils/setPolyLine";

function MyMap(onCurrent: boolean) {
  const navermaps = useNavermaps();
  const infowindow = new naver.maps.InfoWindow({ content: "" });

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const polylinePath = usePolylinePath();

  map &&
    new naver.maps.Polyline({
      map: map,
      path: polylinePath,
    });

  useEffect(() => {
    getCurrentLocation(setLocation);
  }, []);

  //현재 내위치 이동
  useEffect(() => {
    if (map) {
      const latLng = new navermaps.LatLng(
        location.latitude,
        location.longitude
      );
      map.panTo(latLng);
      infowindow.setContent(
        `<div style="padding:20px;"> geolocation.getCurrentPosition() 위치</div>`
      );

      infowindow.open(map, latLng);
    }
  }, [onCurrent]);

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(37.3614483, 127.1114883)}
      defaultZoom={15}
      ref={setMap}
    >
      <Marker defaultPosition={new navermaps.LatLng(36.8307488, 127.1432806)} />
    </NaverMap>
  );
}

function App() {
  const [onCurrent, setOnCurrent] = useState(false);
  return (
    <>
      <button
        style={{ width: "60px", height: "50px" }}
        onClick={() => setOnCurrent((prev) => !prev)}
      >
        내 위치
      </button>

      <MapDiv style={{ width: "100%", height: "1500px" }}>
        <MyMap onCurrent={onCurrent} />
      </MapDiv>
    </>
  );
}

export default App;
