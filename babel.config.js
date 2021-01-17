module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // debug: true,
        // useBuiltIns: 'usage',
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
  plugins: [
    '@babel/proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    '@babel/plugin-transform-regenerator',
  ],
};
