const { Notification } = require('electron')

class TrayManager {
  constructor(opts) {
    this.config = opts.config
    this.tray = opts.tray
    this.timer = null;
    this.startTimer()
  }

  startTimer() {
    let interval = this.config.get('interval')
    clearTimeout(this.timer)
    this.tray.setImage(__dirname + '/../assets/eyeguy-happy@5x.png')
    console.log(`Starting timer for ${interval} minutes`)
    let time = interval
    this.timer = setTimeout(()=>this.handleTimeout(), 60000 * interval)
  }
  
  handleTimeout() {
    this.tray.setImage(__dirname + '/../assets/eyeguy-sad@5x.png')
    if (this.config.get('notifications')) {
      const notification = new Notification({
        silent: this.config.get('silenced'), 
        title: 'Hey!', 
        body: 'Give your eyes a break!'
      })
      notification.onclick = () => {
        this.startTimer()
      }
      notification.show()
    }
  }
}

module.exports = {TrayManager: TrayManager}