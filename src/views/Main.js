import React, { Component, PropTypes } from 'react'

import RestartDialog from '../components/RestartDialog'
import ParameterDialog from '../components/ParameterDialog'
import GroupDialog from '../components/GroupDialog'
import ServerDialog from '../components/ServerDialog'

import Modes from '../constants/modes'

class Main extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      restartOpen: false,
      parameterOpen: false,
      groupOpen: false,
      groupMode: Modes.Add,
      group: {},
      serverOpen: false,
      serverMode: Modes.Add,
      server: {},
      options: {}
    }
    this.onOptionsCancel = this.onOptionsCancel.bind(this)
    this.onOptionsSave = this.onOptionsSave.bind(this)
    this.onRestartOk = this.onRestartOk.bind(this)

    this.onGroupAdd = this.onGroupAdd.bind(this)
    this.onGroupDuplicate = this.onGroupDuplicate.bind(this)
    this.onGroupModify = this.onGroupModify.bind(this)
    this.onGroupDelete = this.onGroupDelete.bind(this)
    this.onGroupCancel = this.onGroupCancel.bind(this)
    this.onGroupSave = this.onGroupSave.bind(this)

    this.onServerAdd = this.onServerAdd.bind(this)
    this.onConnectionDuplicate = this.onConnectionDuplicate.bind(this)
    this.onServerModify = this.onServerModify.bind(this)
    this.onServerDelete = this.onServerDelete.bind(this)
    this.onServerCancel = this.onServerCancel.bind(this)
    this.onServerSave = this.onServerSave.bind(this)

    window.rpc.on('manager-open', (options) => {
      console.log('on:manager-open', options)
      this.open(options)
    })
  }

  open(options) {
    this.setState({
      parameterOpen: true,
      groupOpen: false,
      serverOpen: false,
      options
    })
  }

  generateId(length) {
  	let radom13chars = function () {
  		return Math.random().toString(16).substring(2, 15)
  	}
  	let loops = Math.ceil(length / 13)
  	return new Array(loops).fill(radom13chars).reduce((string, func) => {
  		return string + func()
  	}, '').substring(0, length)
  }

  getGroups() {
    return _.get(this.state, 'options.groups', [])
  }

  getGroupById(groupId) {
    const groups = this.getGroups()
    return groups.find((group) => {
      return group.id == groupId
    })
  }

  getConnections() {
    return _.get(this.state, 'options.servers', [])
  }

  getConnectionById(connectionId) {
    const connections = this.getConnections()
    return connections.find((connection) => {
      return connection.id == connectionId
    })
  }

  onGroupAdd() {
    this.setState({
      groupOpen: true,
      groupMode: Modes.Add,
      serverOpen: false,
      group: {}
    })
  }

  onGroupDuplicate(groupId) {
    this.setState({
      groupOpen: true,
      groupMode: Modes.Duplicate,
      group: _.clone(this.getGroupById(groupId))
    })
  }

  onGroupModify(groupId) {
    this.setState({
      groupOpen: true,
      groupMode: Modes.Modify,
      group: this.getGroupById(groupId)
    })
  }

  onGroupDelete(groupIds) {
    var options = _.cloneDeep(this.state.options)
    _.remove(options.groups, (oGroup) => {
      return _.find(groupIds, (id) => {
          return oGroup.id == id
      })
    })
    this.setState({
      options
    })
  }

  closeGroupDialog() {
    this.setState({
      groupOpen: false
    })
  }

  onGroupCancel() {
    this.closeGroupDialog()
  }

  onGroupSave(group) {
    var options = _.cloneDeep(this.state.options)
    switch (this.state.groupMode) {
      case Modes.Add:
      case Modes.Duplicate:
        group.id = this.generateId(8)
        options.groups.push(group)
        break
      case Modes.Modify:
        const index = _.findIndex(options.group, (oGroup) => {
          return oGroup.id == group.id
        })
        options.groups[index] = group
        break
    }
    this.setState({
      groupOpen: false,
      options
    })
  }

  onServerAdd() {
    this.setState({
      serverOpen: true,
      serverMode: Modes.Add,
      groupOpen: false,
      server: {}
    })
  }

  onConnectionDuplicate(connectionId) {
    this.setState({
      serverOpen: true,
      serverMode: Modes.Duplicate,
      groupOpen: false,
      server: _.clone(this.getConnectionById(connectionId))
    })
  }

  onServerModify(connectionId) {
    this.setState({
      serverOpen: true,
      serverMode: Modes.Modify,
      groupOpen: false,
      server: this.getConnectionById(connectionId)
    })
  }

  onServerDelete(serverIds) {
    var options = _.cloneDeep(this.state.options)
    _.remove(options.servers, (oServer) => {
      return _.find(serverIds, (id) => {
          return oServer.id == id
      })
    })
    this.setState({
      options
    })
  }

  closeServerDialog() {
    this.setState({
      serverOpen: false
    })
  }

  onServerCancel() {
    this.closeServerDialog()
  }

  onServerSave(server) {
    var options = _.cloneDeep(this.state.options)
    switch (this.state.serverMode) {
      case Modes.Add:
      case Modes.Duplicate:
        server.id = this.generateId(8)
        options.servers.push(server)
        break
      case Modes.Modify:
        const index = _.findIndex(options.server, (oServer) => {
          return oServer.id == server.id
        })
        options.servers[index] = server
        break
    }

    this.setState({
      serverOpen: false,
      options
    })
  }

  updateOptions(options) {
    window.rpc.emit('manager-save', options)
    this.showRestartDialog(true)
  }

  closeOptionsDialog() {
    this.setState({
      parameterOpen: false
    })
  }

  onOptionsCancel() {
    this.closeOptionsDialog()
  }

  onOptionsSave(options) {
    this.closeOptionsDialog()
    this.updateOptions(options)
  }

  showRestartDialog(visible) {
    this.setState({
      restartOpen: visible
    })
  }

  onRestartOk(e) {
    this.showRestartDialog(false)
  }

  render() {
    const {
      restartOpen,
      parameterOpen,
      options,
      groupOpen,
      groupMode,
      group,
      serverOpen,
      serverMode,
      server,
    } = this.state

    var hosts = _.map(options.servers, (server) => {
      return {
        title: _.get(server, 'host', '')
      }
    })
    hosts = _.filter(hosts, (host) => {
      return host.title
    })
    hosts = _.uniqBy(hosts, (host) => {
      return host.title
    })

    return (
      <div className="hyper-manager">
        <RestartDialog
          open={restartOpen}
          options={options}
          onOk={this.onRestartOk}
        />
        <ParameterDialog
          open={parameterOpen}
          options={options}
          onCancel={this.onOptionsCancel}
          onSave={this.onOptionsSave}
          onGroupAdd={this.onGroupAdd}
          onGroupDuplicate={this.onGroupDuplicate}
          onGroupModify={this.onGroupModify}
          onGroupDelete={this.onGroupDelete}
          onServerAdd={this.onServerAdd}
          onConnectionDuplicate={this.onConnectionDuplicate}
          onServerModify={this.onServerModify}
          onServerDelete={this.onServerDelete}
        />
        <GroupDialog
          open={groupOpen}
          options={options}
          mode={groupMode}
          group={group}
          onCancel={this.onGroupCancel}
          onSave={this.onGroupSave}
        />
        <ServerDialog
          open={serverOpen}
          options={options}
          mode={serverMode}
          server={server}
          hosts={hosts}
          groups={options.groups}
          onCancel={this.onServerCancel}
          onSave={this.onServerSave}
        />
      </div>
    )
  }
}

export default Main
