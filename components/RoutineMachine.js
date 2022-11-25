
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(-6.348373127525387, 106.8297679527903),
      L.latLng(-6.353465386293707, 106.83182325822173),
      L.latLng(-6.361046716889507, 106.8317240044786),
      L.latLng(-6.364864762651361, 106.83223079221105),
      L.latLng(-6.368205271318413, 106.83184387661237),
      L.latLng(-6.370190241285223, 106.83109626794518),
      L.latLng(-6.371697905932189, 106.8293758480366),
      L.latLng(-6.371101272862191, 106.82696734342873),
      L.latLng(-6.369838377677364, 106.82575903066468),
      L.latLng(-6.367004060974791, 106.82448615509534),
      L.latLng(-6.366114158411598, 106.82167086626085),
      L.latLng(-6.361069834121701, 106.82321257394592),
      L.latLng(-6.359443306471211, 106.82575218376806),
      L.latLng(-6.361133065901284, 106.82970210098532),
      L.latLng(-6.361723672481245, 106.83030996654941),
      L.latLng(-6.362172631787366, 106.83083040668357),
      L.latLng(-6.348373127525387, 106.8297679527903),
    ],
    lineOptions: {
      styles: [{ color: "#FC5555", weight: 4 }],
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

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
