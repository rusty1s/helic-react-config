module.exports = {
  presets: [
    ['es2015', { modules: false }],
    'react',
  ],
  plugins: [
    'transform-runtime',
  ],
  env: {
    test: {
      plugins: ['transform-es2015-modules-commonjs'],
    },
  },
};
