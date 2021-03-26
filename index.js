const { resolve: resolvePath } = require('path')
const MAIN = resolvePath(__dirname, './dist/main.js')
const Manager = require('./manager')

const manager = new Manager()

exports.onApp = (app) =>  {
  manager.loadConfig()
}

exports.onWindow = (window) =>  {
  window.rpc.on('manager-save', (options) => {
    manager.setConfig(options)
    manager.saveConfig()
  })
}

exports.decorateMenu = (menu) =>  {
  return manager.bindMenu(menu)
}

exports.decorateHyper = (Hyper, { React }) => {
  return class extends React.Component {
    constructor(props, context) {
      super(props, context)
      require(MAIN).default()
    }
    render() {
      const newProps = Object.assign({}, this.props)
      return React.createElement(Hyper, newProps)
    }
  }
}
