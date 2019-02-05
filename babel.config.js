module.exports = api => {
  api.cache.forever();

  const presets = ['babel-preset-nb'];
  const plugins = [];

  if (process.env.NODE_ENV === 'production') {
    plugins.push('dev-expression', 'transform-react-remove-prop-types');
  }

  return {
    presets,
    plugins,
  };
};
