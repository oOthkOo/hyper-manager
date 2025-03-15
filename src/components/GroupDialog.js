import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'

import Modes from '../constants/modes'

class GroupDialog extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      mode: this.props.mode,
      group: this.props.group,
      options: this.props.options
    }
    this.onClose = this.onClose.bind(this)
    this.onCancelBtnClick = this.onCancelBtnClick.bind(this)
    this.onSaveBtnClick = this.onSaveBtnClick.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onLegendChange = this.onLegendChange.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      mode: props.mode,
      group: props.group,
      options: props.options
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  close() {
    this.props.onCancel()
  }

  onClose(e) {
    this.close()
  }

  onCancelBtnClick(e) {
    this.close()
  }

  onSaveBtnClick(e) {
    this.props.onSave(this.state.group)
  }

  onNameChange(e) {
    this.setState({
      group: Object.assign(this.state.group, {
        name: e.target.value
      })
    })
  }

  onLegendChange(e) {
    this.setState({
      group: Object.assign(this.state.group, {
        legend: e.target.value
      })
    })
  }

  isSaveBtnDisabled() {
    const name = _.get(this.state, 'group.name', '')
    return !name || /^\s*$/.test(name)
  }

  getLabel(name) {
    return _.get(this.state, `options.labels[${name}]`, 'no-label')
  }

  getTitle() {
    const { mode } = this.state
    const name = mode == Modes.Add || mode == Modes.Duplicate ? 'newGroup' : 'editGroup'
    return this.getLabel(name)
  }

  render() {
    const { group } = this.state
    const { open } = this.props

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
            <FormControl fullWidth>
              <TextField
                autoFocus
                label={this.getLabel('name')}
                value={group.name}
                onChange={this.onNameChange}
              />
            </FormControl>
            <FormControl fullWidth style={{ margin: '10px 0px 0px 0px' }}>
              <TextField
                label={this.getLabel('legend')}
                value={group.legend}
                onChange={this.onLegendChange}
              />
            </FormControl>
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

export default GroupDialog
