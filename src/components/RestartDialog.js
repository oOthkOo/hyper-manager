import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class RestartDialog extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      options: this.props.options
    }
    this.onClose = this.onClose.bind(this)
    this.onOkBtnClick = this.onOkBtnClick.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    return {
      options: props.options
    }
  }

  close() {
    this.props.onOk()
  }

  onClose(e) {
    this.close()
  }

  onOkBtnClick(e) {
    this.close()
  }

  getLabel(name) {
    return _.get(this.state, `options.labels[${name}]`, 'no-label')
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.onClose}
          aria-labelledby="form-dialog-title"
          disableEscapeKeyDown
          disableBackdropClick
        >
          <DialogTitle id="form-dialog-title">{this.getLabel('restartTitle')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.getLabel('restartText')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.onOkBtnClick}
              color="primary"
            >{this.getLabel('ok')}</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default RestartDialog
