import { NavermapsProvider } from "react-naver-maps";

import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";

function MyMap() {
  const navermaps = useNavermaps();

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
      defaultZoom={15}
    >
      <Marker defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)} />
    </NaverMap>
  );
}

function App() {
  const NAVER_MAP_API = import.meta.env.VITE_NAVER_MAP_API;
  return (
    <>
      <NavermapsProvider
        ncpClientId={NAVER_MAP_API}
        // or finClientId, govClientId
      >
        <MapDiv
          style={{
            width: "100%",
            height: "600px",
          }}
        >
          <MyMap />
        </MapDiv>
        ;
      </NavermapsProvider>
    </>
  );
}

export default App;
