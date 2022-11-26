import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

// Alur rute Biru
const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(-6.348373127525387, 106.8297679527903),
      L.latLng(-6.3534610177474, 106.83162029695444),
      L.latLng(-6.36086929545325, 106.83146112622818),
      L.latLng(-6.363250629808285, 106.83184900275248),
      L.latLng(-6.362850786328479, 106.83116675399012),
      L.latLng(-6.361835631548166, 106.83016512726645),
      L.latLng(-6.361143942325545, 106.82947600448857),
      L.latLng(-6.359626440076783, 106.82572631991094),
      L.latLng(-6.361277803365007, 106.82333110948572),
      L.latLng(-6.3659382798442765, 106.82177091590128),
      L.latLng(-6.366780044175628, 106.82385382123188),
      L.latLng(-6.369756748019911, 106.8259792966702),
      L.latLng(-6.371061340660264, 106.82719280923317),
      L.latLng(-6.3714849070313475, 106.82925853982198),
      L.latLng(-6.370075618390656, 106.8308615746626),
      L.latLng(-6.36809398005471, 106.83161722995663),
      L.latLng(-6.365574974922631, 106.83203831176702),
      L.latLng(-6.348373127525387, 106.8297679527903),
    ],
    lineOptions: {
      styles: [{ color: "#71A8FA", weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    showAlternatives: false,
    createMarker: function () {
      return null;
    },
  });

  return instance;
};

const RoutingMachine2 = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine2;
