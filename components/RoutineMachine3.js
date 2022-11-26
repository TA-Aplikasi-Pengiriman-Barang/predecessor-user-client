import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

// Alur rute Biru - part 2 lingkar luar
const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(-6.362850786328479, 106.83116675399012),
      L.latLng(-6.366780044175628, 106.82385382123188),
      L.latLng(-6.365574974922631, 106.83203831176702),
      L.latLng(-6.362850786328479, 106.83116675399012),
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
