const os = require('os')
const path = require('path')
const fs = require('fs')
const npmPackage = require('./package')
const defaultConfig = require('./configurations/default')

const defaultConfigFileName = '.hyper-manager.json'

class HyperManager {

  constructor() {
    this.options = {}
  }

  /*bindConfig(config) {
    Object.defineProperties(config, {
        shell: { get: () => this.options.shell.current },
        shellArgs: { get: () => this.options.shellArgs.current },
        env: { get: () => this.options.env.current }
    })
    this.options = config.manager || {}
    this.defaultLabels = Object.assign({
      servers: 'Servers',
      openAll: 'Open all',
      parameters: 'Parameters...'
    }, this.options.labels)
    return config
  }*/

  getDefaultConfig() {
    defaultConfig.version = npmPackage.version
    return defaultConfig
  }

  getUserHome() {
    return os.homedir()
  }

  getConfigFileName() {
    const userHome = this.getUserHome()
    return path.resolve(`${userHome}/${defaultConfigFileName}`)
  }

  getConfig() {
    return this.options
  }

  setConfig(options) {
    this.options = options
  }

  isConfigExists() {
    const configFileName = this.getConfigFileName()
    try {
      if (fs.existsSync(configFileName)) {
        return true
      }
    }
    catch(err) {
      return false
    }
  }

  loadConfig() {
    const defaultConfig = this.getDefaultConfig()
    if (!this.isConfigExists()) {
      this.options = defaultConfig
    }
    else {
      try {
        const configFileName = this.getConfigFileName()
        let rawdata = fs.readFileSync(configFileName)
        this.options = JSON.parse(rawdata)
      }
      catch(err) {
        console.log(err)
        this.options = defaultConfig
      }
    }
  }

  saveConfig() {
    try {
      this.options.version = npmPackage.version
      let rawdata = JSON.stringify(this.options)
      const configFileName = this.getConfigFileName()
      fs.writeFileSync(configFileName, rawdata)
    }
    catch(err) {
      console.log(err)
    }
  }

  getLabel(name) {
    const labels = this.options.labels || {}
    return labels[name] || 'not-found'
  }

  getServerCommand(server) {
    if (!server.type) {
      return null
    }
    var command = ''
    switch (server.type) {
      case 'ssh':
        command = `ssh `
        if (server.user) {
          command += `${server.user}@`
        }
        if (server.host) {
          command += `${server.host}`
        }
        if (server.port && server.port != 22) {
          command += ` -p ${server.port}`
        }
        if (server.key) {
          command += ` -i ${server.key}`
        }
        break
      case 'ftp':
        command = `ftp `
        if (server.user) {
          command += `${server.user}@`
        }
        if (server.host) {
          command += `${server.host}`
        }
        if (server.port && server.port != 21) {
          command += ` ${server.port}`
        }
        break
      case 'telnet':
        command = `telnet `
        if (server.user) {
          command += `${server.user}@`
        }
        if (server.host) {
          command += `${server.host}`
        }
        if (server.port) {
          command += ` ${server.port}`
        }
        break
      case 'cli':
        break
    }
    if (server.custom) {
      command += `${server.custom}`
    }
    return command
  }

  openParameterDialog(window) {
    window.rpc.emit('manager-open', this.getConfig())
  }

  openServer(window, server, time) {
    return new Promise((resolve, reject) => {
      const command = this.getServerCommand(server)
      switch (server.launch) {
        case 'new-tab':
          window.rpc.emit('termgroup add req')
          break
        case 'split-horizontally':
          window.rpc.emit('split request horizontal')
          break
        case 'split-vertically':
          window.rpc.emit('split request vertical')
          break
      }
      setTimeout(() => {
        if (command) {
          window.rpc.emit('session data send', {
            data: command + '\r'
          })
        }
        setTimeout(resolve, time)
      }, 500)
    })
  }

  createServerMenuItem(server) {
    return {
      label: server.name,
      sublabel: server.legend,
      accelerator: server.accelerator,
      click: (item, window, event) => {
        if (window) {
          this.openServer(window, server, 500).then()
        }
      }
    }
  }

  createGroupOpenAllItem(group) {
    return {
      label: this.getLabel('openAll'),
      click: (item, window, event) => {
        if (window) {
          const servers = this.getGroupServers(group.id)
          servers.reduce((p, server) => {
            return p.then(() => this.openServer(window, server, 1000))
          }, Promise.resolve())
        }
      }
    }
  }

  createParameterMenuItem() {
    return {
      label: this.getLabel('parameters'),
      click: (item, window, event) => {
        if (window) {
          this.openParameterDialog(window)
        }
      }
    }
  }

  getGroups() {
    return this.options.groups || []
  }

  getServers() {
    return this.options.servers || []
  }

  getGroupServers(id) {
    const servers = this.getServers()
    return servers.filter((server) => {
      return server.groupId == id
    })
  }

  bindMenu(menu) {
      var groupMenus = []
      menu.push({
        type: 'separator'
      })
      const groups = this.getGroups()
      groups.forEach((group) => {
        const servers = this.getGroupServers(group.id)
        var serverMenu = []
        servers.forEach((server) => {
          serverMenu.push(this.createServerMenuItem(server))
        })
        if (servers.length > 1) {
            serverMenu.push({
              type: 'separator'
            })
            serverMenu.push(this.createGroupOpenAllItem(group))
        }
        var menu = {
          label: group.name,
          submenu: serverMenu
        }
        if (group.legend) {
          menu.sublabel = group.legend
        }
        groupMenus.push(menu)
      })
      if (groups.length > 0) {
        groupMenus.push({
          type: 'separator'
        })
      }
      groupMenus.push(this.createParameterMenuItem())
      menu.push({
        label: 'HyperManager',
        submenu: groupMenus
      })
      return menu
  }
}

module.exports = HyperManager
