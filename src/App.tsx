import { useEffect, useState } from "react";
import { NavermapsProvider } from "react-naver-maps";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";

function MyMap(onCurrent: boolean) {
  const navermaps = useNavermaps();
  const infowindow = new naver.maps.InfoWindow({ content: "" });

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  //현재 내위치 이동
  useEffect(() => {
    currentLocation(setLocation);
    if (map) {
      map.panTo(new navermaps.LatLng(location.latitude, location.longitude));
      infowindow.setContent(
        '<div style="padding:20px;">' +
          "geolocation.getCurrentPosition() 위치" +
          "</div>"
      );

      infowindow.open(
        map,
        new navermaps.LatLng(location.latitude, location.longitude)
      );
    }
  }, [onCurrent]);

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(36.8547588, 127.1432806)}
      defaultZoom={15}
      ref={setMap}
    >
      <Marker defaultPosition={new navermaps.LatLng(36.8307488, 127.1432806)} />
    </NaverMap>
  );
}

function currentLocation(
  setLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >
) {
  let location;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function success(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
  }

  function error() {
    alert("Unable to retrieve your location.");
  }
  return location;
}

function App() {
  const naverMapApi = import.meta.env.VITE_NAVER_MAP_API;
  const [onCurrent, setOnCurrent] = useState(false);
  return (
    <>
      <NavermapsProvider ncpClientId={naverMapApi}>
        <button
          style={{
            width: "60px",
            height: "50px",
          }}
          onClick={() => {
            setOnCurrent(!onCurrent);
          }}
        >
          내 위치
        </button>

        <MapDiv
          style={{
            width: "100%",
            height: "1000px",
          }}
        >
          <MyMap onCurrent={onCurrent} />
        </MapDiv>
      </NavermapsProvider>
    </>
  );
}

export default App;
