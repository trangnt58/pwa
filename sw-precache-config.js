module.exports = {
  staticFileGlobs: [
    'dist/**.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/images/*',
    'dist/assets/icons/*',
    'dist/assets/lib/*'
  ],
  root: 'dist',
  stripPrefix: 'dist/',
  //importScripts: ['push-notification.js'],
  navigateFallback: '/index.html',
  runtimeCaching: [{
    urlPattern: /egame-uet\.herokuapp\.com\/api/,
    handler: 'networkFirst'
  }]
};