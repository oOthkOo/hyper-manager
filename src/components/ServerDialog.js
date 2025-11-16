import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Autocomplete from '@material-ui/lab/Autocomplete'

import Modes from '../constants/modes'
import Launches from '../constants/launches'

class ServerDialog extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      mode: this.props.mode,
      options: this.props.options,
      groups: this.props.groups,
      hosts: this.props.hosts,
      server: this.props.server
    }
    this.onClose = this.onClose.bind(this)
    this.onCancelBtnClick = this.onCancelBtnClick.bind(this)
    this.onSaveBtnClick = this.onSaveBtnClick.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onGroupChange = this.onGroupChange.bind(this)
    this.onDelayChange = this.onDelayChange.bind(this)
    this.onWorkingDirChange = this.onWorkingDirChange.bind(this)
    this.onAcceleratorChange = this.onAcceleratorChange.bind(this)
    this.onUserChange = this.onUserChange.bind(this)
    this.onHostChange = this.onHostChange.bind(this)
    this.onTypeChange = this.onTypeChange.bind(this)
    this.onLaunchChange = this.onLaunchChange.bind(this)
    this.onLegendChange = this.onLegendChange.bind(this)
    this.onPortChange = this.onPortChange.bind(this)
    this.onKeyChange = this.onKeyChange.bind(this)
    this.onCustomChange = this.onCustomChange.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      mode: props.mode,
      options: props.options,
      groups: props.groups,
      hosts: props.hosts,
      server: props.server
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  close() {
    this.props.onCancel()
  }

  onCancelBtnClick(e) {
    this.close()
  }

  onSaveBtnClick(e) {
    this.props.onSave(this.state.server)
  }

  onClose(e) {
    this.close()
  }

  onGroupChange(e, item) {
    this.setState({
      server: Object.assign(this.state.server, {
        groupId: item.props.value
      })
    })
  }

  onNameChange(e) {
    this.setState({
      server: Object.assign(this.state.server, {
        name: e.target.value
      })
    })
  }

  onLegendChange(e) {
    this.setState({
      server: Object.assign(this.state.server, {
        legend: e.target.value
      })
    })
  }

  onDelayChange(e) {
    this.setState({
      server: Object.assign(this.state.server, {
        delay: e.target.value
      })
    })
  }

  onWorkingDirChange(e) {
    this.setState({
      server: Object.assign(this.state.server, {
        workingDir: e.target.value
      })
    })
  }

  onAcceleratorChange(e) {
    this.setState({
      server: Object.assign(this.state.server, {
        accelerator: e.target.value
      })
    })
  }

  onUserChange(e) {
    this.setState({
      server: Object.assign(this.state.server, {
        user: e.target.value
      })
    })
  }

  onHostChange(e, value) {
    this.setState({
      server: Object.assign(this.state.server, {
        host: value
      })
    })
  }

  onTypeChange(e) {
    this.setState({
      server: Object.assign(this.state.server, {
        type: e.target.value
      })
    })
  }

  onLaunchChange(e) {
    this.setState({
      server: Object.assign(this.state.server, {
        launch: e.target.value
      })
    })
  }

  onPortChange(e) {
    this.setState({
      server: Object.assign(this.state.server, {
        port: e.target.value
      })
    })
  }

  onKeyChange(e) {
    this.setState({
      server: Object.assign(this.state.server, {
        key: e.target.value
      })
    })
  }

  onCustomChange(e) {
    this.setState({
      server: Object.assign(this.state.server, {
        custom: e.target.value
      })
    })
  }

  isEmpty(text) {
    return !text || /^\s*$/.test(text)
  }

  isSaveBtnDisabled() {
    const name = _.get(this.state, 'server.name', '')
    if (this.isEmpty(name)) {
      return true
    }
    const groupId = _.get(this.state, 'server.groupId', '')
    if (this.isEmpty(groupId)) {
      return true
    }
    const type = _.get(this.state, 'server.type', '')
    if (this.isEmpty(type)) {
      return true
    }
    const launch = _.get(this.state, 'server.launch', '')
    if (this.isEmpty(launch)) {
      return true
    }
    return false
  }

  getLabel(name) {
    return _.get(this.state, `options.labels[${name}]`, 'no-label')
  }

  getTitle() {
    const { mode } = this.state
    const name = mode == Modes.Add || mode == Modes.Duplicate ? 'newConnection' : 'editConnection'
    return this.getLabel(name)
  }

  render() {
    const {
      server,
      groups,
      hosts
    } = this.state

    const {
      open
    } = this.props

    const groupItems = _.map(groups, (group, index) => {
      return (<MenuItem key={index} value={group.id}>{group.name}</MenuItem>)
    })

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.onClose}
          aria-labelledby="form-dialog-title"
          disableEscapeKeyDown
          disableBackdropClick
        >
          <DialogTitle id="form-dialog-title">{this.getTitle()}</DialogTitle>
          <DialogContent>

            <FormControl>
              <TextField
                style={{ width: '260px', margin: '0px 20px 0px 0px' }}
                autoFocus
                label={this.getLabel('name')}
                value={server.name}
                onChange={this.onNameChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel id="server-group-label">{this.getLabel('group')}</InputLabel>
              <Select
                style={{ width: '270px' }}
                id="server-group-label"
                value={server.groupId}
                onChange={this.onGroupChange}
              >
                {groupItems}
              </Select>
            </FormControl>

            <div style={{ margin: '10px 0px 0px 0px' }}>
              <FormControl>
                <TextField
                  style={{ width: '260px', margin: '0px 20px 0px 0px' }}
                  label={this.getLabel('legend')}
                  value={server.legend}
                  onChange={this.onLegendChange}
                />
              </FormControl>
              <FormControl>
                <InputLabel id="server-launch-label">{this.getLabel('launch')}</InputLabel>
                <Select
                  style={{ width: '270px' }}
                  id="server-launch-label"
                  value={server.launch}
                  onChange={this.onLaunchChange}
                >
                  <MenuItem value={Launches.ActiveTerm}>{this.getLabel('launchActiveTerm')}</MenuItem>
                  <MenuItem value={Launches.NewTab}>{this.getLabel('launchNewTab')}</MenuItem>
                  <MenuItem value={Launches.SplitHorizontally}>{this.getLabel('launchSplitHorizontally')}</MenuItem>
                  <MenuItem value={Launches.SplitVertically}>{this.getLabel('launchSplitVertically')}</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div style={{ margin: '10px 0px 0px 0px' }}>
              <TextField
                style={{ width: '260px', margin: '0px 20px 0px 0px' }}
                label={this.getLabel('workingDir')}
                value={server.workingDir}
                onChange={this.onWorkingDirChange}
              />
              <TextField
                type="number"
                style={{ width: '270px' }}
                label={this.getLabel('delay')}
                value={server.delay}
                onChange={this.onDelayChange}
              />
            </div>

            <div style={{ margin: '10px 0px 0px 0px' }}>
              <TextField
                style={{ width: '260px', margin: '0px 20px 0px 0px' }}
                label={this.getLabel('user')}
                value={server.user}
                onChange={this.onUserChange}
              />
              <TextField
                style={{ width: '270px' }}
                label={this.getLabel('accelerator')}
                value={server.accelerator}
                onChange={this.onAcceleratorChange}
              />
            </div>

            <FormControl fullWidth style={{ margin: '10px 0px 0px 0px' }}>
              <Autocomplete
                freeSolo
                options={hosts}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} label={this.getLabel('host')} value={server.host} />}
                onInputChange={this.onHostChange}
              />
            </FormControl>

            <div style={{ margin: '10px 0px 0px 0px' }}>
              <FormControl>
                <InputLabel id="server-type-label">{this.getLabel('type')}</InputLabel>
                <Select
                  style={{ width: '260px', margin: '16px 20px 0px 0px' }}
                  id="server-type-label"
                  value={server.type}
                  onChange={this.onTypeChange}
                >
                  <MenuItem value={"cli"}>Cli</MenuItem>
                  <MenuItem value={"ssh"}>Ssh</MenuItem>
                  <MenuItem value={"ftp"}>Ftp</MenuItem>
                  <MenuItem value={"telnet"}>Telnet</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <TextField
                    disabled={server.type == 'cli'}
                    style={{ width: '270px' }}
                    type="number"
                    label={this.getLabel('port')}
                    value={server.port}
                    onChange={this.onPortChange}
                />
              </FormControl>
            </div>

            <div style={{ margin: '10px 0px 0px 0px' }}>
              <TextField
                disabled={server.type == 'cli'}
                style={{ width: '260px', margin: '0px 20px 0px 0px' }}
                label={this.getLabel('sshKey')}
                value={server.key}
                onChange={this.onKeyChange}
              />
              <TextField
                style={{ width: '270px' }}
                label={this.getLabel('customArguments')}
                value={server.custom}
                onChange={this.onCustomChange}
              />
            </div>

          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.onCancelBtnClick}
            >{this.getLabel('cancel')}</Button>
            <Button
              disabled={this.isSaveBtnDisabled()}
              onClick={this.onSaveBtnClick}
              variant="contained"
              color="primary"
            >{this.getLabel('save')}</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default ServerDialog
