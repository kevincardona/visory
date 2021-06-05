const configCheckbox = (label, key, config, enabled = true) => {
  return {
    label: label,
    type: 'checkbox', click: () => {
      config.set(key, !config.get(key))
    },
    enabled: enabled,
    checked: config.get(key)
  }
}

const intervalMenuItem = (interval, mtray, config) => {
  const hours = Math.floor(interval / 60)
  const minutes = interval % 60
  return {
    label: `${hours > 0 ? `${hours} Hour${hours > 1 ? "s" : ""} ` : ''}${minutes > 0 ? `${hours > 0 ? " " : ""}${minutes} Minutes` : ""}`,
    type: 'radio',
    click: () => {
      config.set('interval', interval)
      mtray.startTimer()
    },
    checked: config.get('interval') == interval
  }
}

module.exports = {
  configCheckbox: configCheckbox, 
  intervalMenuItem: intervalMenuItem
}