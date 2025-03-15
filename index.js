const { resolve: resolvePath } = require('path')
const MAIN = resolvePath(__dirname, './dist/main.js')
const HyperManager = require('./manager')

const manager = new HyperManager()

exports.onApp = (app) =>  {
  manager.loadSettings()
}

exports.onWindow = (window) =>  {
  window.rpc.on('manager-save', (settings) => {
    manager.setSettings(settings)
    manager.saveSettings()
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
