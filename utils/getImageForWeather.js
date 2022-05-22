/* eslint-disable global-require */

const images = {
  Clear: require('../assets/clear.png'),
  Hail: require('../assets/hail.png'),
  'Heavy Cloud': require('../assets/heavy-cloud.png'),
  'Light Cloud': require('../assets/light-cloud.png'),
  'Partly cloudy': require('../assets/light-cloud.png'),
  'Heavy Rain': require('../assets/heavy-rain.png'),
  'Light Rain': require('../assets/light-rain.png'),
  'Patchy rain possible': require('../assets/light-rain.png'),
  'Light rain shower': require('../assets/heavy-rain.png'),
  Showers: require('../assets/showers.png'),
  Sleet: require('../assets/sleet.png'),
  Snow: require('../assets/snow.png'),
  Thunder: require('../assets/thunder.png'),
  Sunny: require('../assets/clear.png'),
  Rain: require('../assets/heavy-rain.png'),

};

export default weather => images[weather];
