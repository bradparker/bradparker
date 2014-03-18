var path = require('path')
,   rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://localhost/neem-dev',
    root: rootPath,
    app: {
      name: 'neem'
    }
  },
  test: {
    db: 'mongodb://localhost/neem-test',
    root: rootPath,
    app: {
      name: 'neem'
    }
  },
  production: {
    db: process.env.MONGOLAB_URI,
    root: rootPath,
    app: {
      name: 'neem'
    }
  }
};
