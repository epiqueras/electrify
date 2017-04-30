import Config from 'electron-config'

// Persistent config storage
export default new Config({
  defaults: {
    theme: 'default',
    windowStates: [{ width: 800, height: 600 }],
  },
})
