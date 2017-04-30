import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { readFileSync } from 'fs'

export default function createWindow(windows, i, state = { width: 800, height: 600 }) {
  const userAgent = '<% userAgent %>'
  const url = '<% websiteURL %>'

  windows[i] = new BrowserWindow({
    width: state.width,
    height: state.height,
    x: state.x,
    y: state.y,
    type: 'textured',
    backgroundColor: 'grey',
    show: false,
    title: '<% name %>',
    titleBarStyle: 'hidden-inset',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
    },
  })

  // Emitted when the window is closed
  windows[i].on('closed', () => {
    // Dereference the window object
    windows.splice(i, 1)
  })

  windows[i].webContents.on('dom-ready', () => {
    // Add webpack dev server url in development and local build in production
    const devScript = `const script = document.createElement('script');script.setAttribute('src','http://localhost:8080/renderer.js');document.head.appendChild(script);`
    windows[i].webContents.executeJavaScript(process.env.NODE_ENV === 'development' ? devScript : readFileSync(join(__dirname, './renderer.js'), 'utf8'))
    .then(() => {
      windows[i].show()
    })
  })

  // Open links in external applications
  windows[i].webContents.on('new-window', (e, url) => {
    e.preventDefault()
    shell.openExternal(url)
  })

  windows[i].webContents.setUserAgent(userAgent)
  windows[i].loadURL(url)
}
