module.exports = {
  webpack: (config) => {
    config.resolve.extensions.push('.jsx')
    return config
  },
}
