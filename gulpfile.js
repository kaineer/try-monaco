const {series} = require(`gulp`);

const defaultTask = (cb) => {
  cb();
};

module.exports = {
  'default': defaultTask
};
