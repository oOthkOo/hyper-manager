const os = require('os')
const path = require('path')
const fs = require('fs')
const pkg = require('./package')
const defaultLocale = 'en-US'
const defaultSettingsFileName = '.hyper-manager.json'

class HyperManager {

    constructor() {
        this.settings = {}
    }

    getSettings() {
        return this.settings
    }

    setSettings(settings) {
        this.settings = settings
    }

    getDefaultSettings() {
        const exampleFileName = this.getExampleFileName()
        const settings = this.getJSONFileData(exampleFileName)
        const locale = settings.locale || defaultLocale
        settings.labels = this.getLocaleLabels(locale)
        return settings
    }

    getLocaleLabels(locale) {
        const localeFileName = this.getLocaleFileName(locale)
        return this.getJSONFileData(localeFileName)
    }

    getJSONFileData(filename) {
        try {
            const data = fs.readFileSync(filename)
            return JSON.parse(data)
        }
        catch (err) {
            console.error(err)
            return null
        }
    }

    getLocaleFileName(locale) {
        return `${__dirname}/locales/${locale}.json`
    }

    getExampleFileName() {
        return `${__dirname}/example.json`
    }

    getSettingsFileName() {
        const userHome = os.homedir()
        return path.resolve(`${userHome}/${defaultSettingsFileName}`)
    }

    isSettingsExists() {
        const settingsFileName = this.getSettingsFileName()
        try {
            if (fs.existsSync(settingsFileName)) {
                return true
            }
        }
        catch (err) {
            return false
        }
    }

    loadSettings() {
        const defaultSettings = this.getDefaultSettings()
        if (!this.isSettingsExists()) {
            this.settings = defaultSettings
            return
        }
        try {
            const settingsFileName = this.getSettingsFileName()
            this.settings = this.getJSONFileData(settingsFileName)
            this.settings.version = pkg.version
            const locale = this.settings.locale || defaultLocale
            this.settings.locale = locale
            this.settings.labels = this.getLocaleLabels(locale)
        }
        catch (err) {
            console.log(err)
            this.settings = defaultSettings
        }
    }

    saveSettings() {
        try {
            const data = JSON.stringify({
                version: pkg.version,
                locale: this.settings.locale,
                groups: this.settings.groups,
                servers: this.settings.servers
            })
            const settingsFileName = this.getSettingsFileName()
            fs.writeFileSync(settingsFileName, data)
        }
        catch (err) {
            console.log(err)
        }
    }

    getLabel(name) {
        const labels = this.settings.labels || {}
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
        window.rpc.emit('manager-open', this.getSettings())
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
                        },
                        Promise.resolve()
                    )
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
        return this.settings.groups || []
    }

    getServers() {
        return this.settings.servers || []
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
