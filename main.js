const { app, Menu, Tray, dock } = require('electron')
const { Config } = require('./src/Config')
const { TrayManager } = require('./src/TrayManager')
const { configCheckbox, intervalMenuItem } = require('./src/util/Helpers')

const config = new Config({
  configName: 'user-preferences',
  defaults: {
    interval: 20,
    notifications: true,
    silenced: true
  }
})

app.whenReady().then(() => {
  app.dock.hide()
  tray = new Tray(__dirname + '/assets/eyeguy-happy@5x.png')
  tray.setToolTip('visory')

  let mtray = new TrayManager({
    config: config,
    tray: tray
  })

  tray.on('click', () => {
    mtray.startTimer()
  })

  tray.on('right-click', () => {
    tray.popUpContextMenu(Menu.buildFromTemplate([
      configCheckbox('Enable Notifications', 'notifications', config),
      configCheckbox('Silent Notifications', 'silenced', config, config.get('notifications')),
      {
        label: 'Interval',
        submenu: [
          intervalMenuItem(5, mtray, config),
          intervalMenuItem(10, mtray, config),
          intervalMenuItem(15, mtray, config),
          intervalMenuItem(20, mtray, config),
          intervalMenuItem(25, mtray, config),
          intervalMenuItem(30, mtray, config),
          intervalMenuItem(45, mtray, config),
          intervalMenuItem(60, mtray, config),
          intervalMenuItem(90, mtray, config),
          intervalMenuItem(120, mtray, config)
        ]
      },
      { label: 'Quit', click: () => app.quit() }
    ]))
  })
})
