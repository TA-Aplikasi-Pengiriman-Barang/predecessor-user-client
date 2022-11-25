import L from 'leaflet';
import halte from "../static/icon/halte.png"

const iconMix = new L.Icon({
    iconUrl: '../static/icon/halteMix.svg',
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(50, 50),
    html: "Null Island",
    
});

export { iconMix };

// require('../static/icon/halte.png')
// new L.Point(0, 0)
