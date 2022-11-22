import L from 'leaflet';
import halte from "../static/icon/halte.png"

const iconPerson = new L.Icon({
    iconUrl: '../static/icon/halte.svg',
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(50, 50),
    html: "Null Island",
    
});

export { iconPerson };

// require('../static/icon/halte.png')
// new L.Point(0, 0)
