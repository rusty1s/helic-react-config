module.exports = {
  transform: {
    '.*': '<rootDir>/node_modules/jest-css-modules',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/node_modules/helic-react-config/__mocks__/files.js',
    '\\.css$': 'identity-obj-proxy',
  },
};