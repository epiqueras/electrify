/* global window, document */
import { ipcRenderer } from 'electron'

// Load stylesheets
import './styles/index.scss'

// Request and set the theme
document.documentElement.classList = ipcRenderer.sendSync('getTheme')

// Listen to theme changes from the main process
ipcRenderer.on('themeChanges', (e, theme) => {
  document.documentElement.classList = theme
})
