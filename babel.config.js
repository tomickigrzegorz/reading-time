module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // debug: true,
        useBuiltIns: 'entry', // usage
        corejs: 3,
        loose: true,
      },
    ],
  ],
  plugins: ['@babel/proposal-class-properties'],
};
