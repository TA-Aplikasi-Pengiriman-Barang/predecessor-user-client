

import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [
      // L.latLng(-6.348373127525387, 106.8297679527903),
      // L.latLng(-6.353465386293707, 106.83182325822173),
      // L.latLng(-6.361046716889507, 106.8317240044786),
      // L.latLng(-6.364864762651361, 106.83223079221105),
      // L.latLng(-6.368205271318413, 106.83184387661237),
      // L.latLng(-6.370190241285223, 106.83109626794518),
      // L.latLng(-6.371697905932189, 106.8293758480366),
      // L.latLng(-6.371101272862191, 106.82696734342873),
      // L.latLng(-6.369838377677364, 106.82575903066468),
      // L.latLng(-6.367004060974791, 106.82448615509534),
      // L.latLng(-6.366114158411598, 106.82167086626085),
      // L.latLng(-6.361069834121701, 106.82321257394592),
      // L.latLng(-6.359443306471211, 106.82575218376806),
      // L.latLng(-6.361133065901284, 106.82970210098532),
      // L.latLng(-6.361723672481245, 106.83030996654941),
      // L.latLng(-6.362172631787366, 106.83083040668357),
      // L.latLng(-6.348373127525387, 106.8297679527903),
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
    createMarker: function() { return null; }
  });

  return instance;
};

const RoutingMachine2 = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine2;
