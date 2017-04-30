/* global window, document */
import { ipcRenderer } from 'electron'

document.addEventListener('DOMContentLoaded', () => {
  // Request and set the theme
  document.documentElement.classList = ipcRenderer.sendSync('getTheme')

  // Listen to theme changes from the main process
  ipcRenderer.on('themeChanges', (e, theme) => {
    document.documentElement.classList = theme
  })
})
