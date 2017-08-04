Vue.component('page', {
  template: '#page'
});
Vue.component('twitter-map', {
  template: '#twitter-map',
  mounted: function() {
    // list of current tweets
    var url = 'http://localhost:5000/tweets';

    console.log('map mounted');
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2lnZ3lmIiwiYSI6Il8xOGdYdlEifQ.3-JZpqwUa3hydjAJFXIlMA';
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [4.38, 51.9855955], // starting position [lng, lat]
      zoom: 8. // starting zoom
    });
    map.on('load', function () {
      setInterval(function() {
        map.getSource('tweets').setData(url);
      }, 2000);

      map.addSource('tweets', { type: 'geojson', data: url });
      map.addLayer({
        id: 'tweets',
        type: 'circle',
        source: 'tweets'
      });
      map.on('click', 'tweets', function (e) {
        console.log('clicked on', e.features);
        var feature = e.features[0];
        new mapboxgl.Popup()
          .setLngLat(feature.geometry.coordinates)
          .setHTML(feature.properties.source)
          .addTo(map);
      });
      map.on('mouseenter', 'tweets', function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'tweets', function () {
        map.getCanvas().style.cursor = '';
      });
    });
  }
});
Vue.component('task-list', {
  template: '#task-list',
  data: function() {
    return {
      tasks: [
        {
          id: 123,
          title: "Obstruction",
          description: "This drainpipe is probably clogged. Can you check it? And post a photo using the hashtag #htt123",
          img: "IMG-20170803-WA0003.jpg"
        },
        {
          id: 124,
          title: "Vegetation",
          description: "Can you check if you see vegetation in the water at this location? Please make a photo and post it using hashtag #htt124",
          img: "IMG-20170803-WA0001.jpg"
        },
        {
          id: 125,
          title: "Waterlevel",
          description: "Can you check the waterlevel at this location? Please make a photo and post it using hashtag #htt125",
          img: "IMG-20170803-WA0002.jpg"
        }
      ]
    };
  }
});
new Vue({
  el: '#app',
  data: {
    clipped: false,
    drawer: false,
    fixed: false,
    items: [
      { icon: 'bubble_chart', title: 'Activities' },
      { icon: 'bubble_chart', title: 'Map' }

    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: 'Twitter Task Force'
  }
});
