import { Menu } from 'electron'
import { autoUpdater } from 'electron-updater'

let state = 'checking'

// Set visibility of update buttons according to state of update
function updateMenu() {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  menu.items.find(menuItem => menuItem.label === 'Updates').submenu.items.forEach(subMenuItem => {
    switch (subMenuItem.key) {
      case 'checkForUpdate':
        subMenuItem.visible = state === 'no-update'
        break
      case 'checkingForUpdate':
        subMenuItem.visible = state === 'checking'
        break
      case 'restartToUpdate':
        subMenuItem.visible = state === 'installed'
        break
      default:
        break
    }
  })
}

export default function initializeAutoUpdater() {
  autoUpdater.on('checking-for-update', () => {
    state = 'checking'
    updateMenu()
  })

  autoUpdater.on('update-available', () => {
    state = 'checking'
    updateMenu()
  })

  autoUpdater.on('update-downloaded', () => {
    state = 'installed'
    updateMenu()
  })

  autoUpdater.on('update-not-available', () => {
    state = 'no-update'
    updateMenu()
  })

  autoUpdater.on('error', () => {
    state = 'no-update'
    updateMenu()
  })

  autoUpdater.checkForUpdates()
}
