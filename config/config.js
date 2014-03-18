var path = require('path')
,   rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://localhost/bradparker-dev',
    root: rootPath,
    app: {
      name: 'bradparker'
    }
  },
  test: {
    db: 'mongodb://localhost/bradparker-test',
    root: rootPath,
    app: {
      name: 'bradparker'
    }
  },
  production: {
    db: process.env.MONGOLAB_URI,
    root: rootPath,
    app: {
      name: 'bradparker'
    }
  }
};
