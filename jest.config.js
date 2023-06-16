module.exports = {
  // ... 다른 설정 ...
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testEnvironment: 'jsdom',
};