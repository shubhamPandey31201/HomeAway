mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: [-74.5, 40], 
        zoom: 9 // starting zoom,
    });