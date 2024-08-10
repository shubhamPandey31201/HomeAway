


mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style:'mapbox://styles/mapbox/streets-v12',
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

const marker=new mapboxgl.Marker({color:'Red'})
.setLngLat(coordinates)
.setPopup(new mapboxgl.Popup({ closeOnClick: false })

.setHTML(`<h5>${listing.location}</h5><p>Exact location will be provided after booking </p>`))
.addTo(map);
