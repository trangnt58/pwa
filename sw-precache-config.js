module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/images/game/check-icon.png',
    'dist/assets/images/game/songpop.png',
    'dist/assets/lib/*.js',
    'dist/assets/data/*.json'
  ]
};