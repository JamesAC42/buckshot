export default {
    apps: [{
      name: 'buckshot',
      script: 'build/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3010
      }
    }]
  };