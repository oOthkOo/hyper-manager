import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { DataGrid } from '@material-ui/data-grid'

class ParameterDialog extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      options: props.options,
      deleteGroupConfirmOpen: false,
      deleteServerConfirmOpen: false,
      groupSelections: [],
      connectionSelections: []
    }
    this.onClose = this.onClose.bind(this)

    this.onGroupSelectionChange = this.onGroupSelectionChange.bind(this)
    this.onAddGroupBtnClick = this.onAddGroupBtnClick.bind(this)
    this.onDuplicateGroupBtnClick = this.onDuplicateGroupBtnClick.bind(this)
    this.onModifyGroupBtnClick = this.onModifyGroupBtnClick.bind(this)
    this.onDeleteGroupBtnClick = this.onDeleteGroupBtnClick.bind(this)

    this.onConnectionSelectionChange = this.onConnectionSelectionChange.bind(this)
    this.onAddServerBtnClick = this.onAddServerBtnClick.bind(this)
    this.onDuplicateConnectionBtnClick = this.onDuplicateConnectionBtnClick.bind(this)
    this.onModifyServerBtnClick = this.onModifyServerBtnClick.bind(this)
    this.onDeleteServerBtnClick = this.onDeleteServerBtnClick.bind(this)

    this.onCancelBtnClick = this.onCancelBtnClick.bind(this)
    this.onSaveBtnClick = this.onSaveBtnClick.bind(this)

    this.onDeleteGroupCancelBtnClick = this.onDeleteGroupCancelBtnClick.bind(this)
    this.onDeleteGroupAcceptBtnClick = this.onDeleteGroupAcceptBtnClick.bind(this)

    this.onDeleteServerCancelBtnClick = this.onDeleteServerCancelBtnClick.bind(this)
    this.onDeleteServerAcceptBtnClick = this.onDeleteServerAcceptBtnClick.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    console.log("ParameterDialog:getDerivedStateFromProps")
    return {
      open: props.open,
      options: props.options
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    /*console.log('ParameterDialog:shouldComponentUpdate:nextProps', nextProps)
    console.log('ParameterDialog:shouldComponentUpdate:nextState', nextState)
    if (!_.isEqual(nextProps.options, this.state.options)) {
      return true
    }
    return this.state.open != nextProps.open
*/
    return true
  }

  /*getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps')
    this.setState({
      open: props.open
    })
  }*/

  close() {
    this.props.onCancel()
  }

  onCancelBtnClick(e) {
    this.close()
  }

  onSaveBtnClick(e) {
    this.props.onSave(this.state.options)
  }

  onClose(e) {
    this.close()
  }

  getLabel(name) {
    if (!this.manager) {
      return ''
    }
    return this.manager.getLabel(name)
  }

  getGroups() {
    return this.state.options.groups || []
  }

  getGroupById(groupId) {
    const groups = this.getGroups()
    return groups.find((group) => {
      return group.id == groupId
    })
  }

  onGroupSelectionChange(selection) {
    this.setState({
      groupSelections: selection.selectionModel
    })
  }

  onAddGroupBtnClick(e) {
    this.props.onGroupAdd()
  }

  getGroupIdSelected() {
    return _.get(this.state, 'groupSelections[0]', 0)
  }

  onDuplicateGroupBtnClick(e) {
    this.props.onGroupDuplicate(this.getGroupIdSelected())
  }

  onModifyGroupBtnClick(e) {
    this.props.onGroupModify(this.getGroupIdSelected())
  }

  showDeleteGroupConfirm(visible) {
    this.setState({
      deleteGroupConfirmOpen: visible
    })
  }

  getDeleteGroupConfirmMessage() {
    const count = this.getGroupSelectionCount()
    if (count > 1) {
      return this.getLabel('deleteGroupsConfirm', {
        count
      })
    }
    else {
      const group = this.getGroupById(this.getGroupIdSelected())
      const name = _.get(group, 'name', '-')
      return this.getLabel('deleteGroupConfirm', {
        name
      })
    }
  }

  onDeleteGroupBtnClick(e) {
    this.showDeleteGroupConfirm(true)
  }

  onDeleteGroupCancelBtnClick(e) {
    this.showDeleteGroupConfirm(false)
  }

  onDeleteGroupAcceptBtnClick(e) {
    this.showDeleteGroupConfirm(false)
    const groupIds = _.get(this.state, 'groupSelections', [])
    this.props.onGroupDelete(groupIds)
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

  onConnectionSelectionChange(selection) {
    this.setState({
      connectionSelections: selection.selectionModel
    })
  }

  onAddServerBtnClick(e) {
    this.props.onServerAdd()
  }

  getConnectionIdSelected() {
    return _.get(this.state, 'connectionSelections[0]', 0)
  }

  onDuplicateConnectionBtnClick(e) {
    this.props.onConnectionDuplicate(this.getConnectionIdSelected())
  }

  onModifyServerBtnClick(e) {
    this.props.onServerModify(this.getConnectionIdSelected())
  }

  showDeleteServerConfirm(visible) {
    this.setState({
      deleteServerConfirmOpen: visible
    })
  }

  getDeleteConnectionConfirmMessage() {
    const count = this.getConnectionSelectionCount()
    if (count > 1) {
      return this.getLabel('deleteConnectionsConfirm', {
        count
      })
    }
    else {
      const connection = this.getConnectionById(this.getConnectionIdSelected())
      const name = _.get(connection, 'name', '-')
      return this.getLabel('deleteConnectionConfirm', {
        name
      })
    }
  }

  onDeleteServerBtnClick(e) {
    this.showDeleteServerConfirm(true)
  }

  onDeleteServerCancelBtnClick(e) {
    this.showDeleteServerConfirm(false)
  }

  onDeleteServerAcceptBtnClick(e) {
    this.showDeleteServerConfirm(false)
    const connectionIds = _.get(this.state, 'connectionSelections', [])
    this.props.onServerDelete(connectionIds)
  }

  getGroupSelectionCount() {
    return _.get(this.state, 'groupSelections.length', 0)
  }

  isModifyGroupBtnDisabled() {
    return this.getGroupSelectionCount() != 1
  }

  isDeleteGroupBtnDisabled() {
    const groupCount = _.get(this.state, 'options.groups.length', 0)
    return groupCount < 1 || this.getGroupSelectionCount() < 1
  }

  getConnectionSelectionCount() {
    return _.get(this.state, 'connectionSelections.length', 0)
  }

  isModifyConnectionBtnDisabled() {
    return this.getConnectionSelectionCount() != 1
  }

  isDeleteConnectionBtnDisabled() {
    const connectionCount = _.get(this.state, 'options.servers.length', 0)
    return connectionCount < 1 || this.getConnectionSelectionCount() < 1
  }

  getLabel(name, keys) {
    var template = _.get(this.state, `options.labels[${name}]`, 'no-label')
    if (keys) {
      Object.keys(keys).forEach((key) => {
        template = template.replace(new RegExp(`\#${key}\#`,'g'), keys[key])
      })
    }
    return template
  }

  getTitle() {
    const version = _.get(this.state, 'options.version', '')
    return `HyperManager (v${version})`
  }

  render() {
    const styles = {
      actionBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: '10px 0px 10px 0px'
      },
      addGroupBtn: {
        margin: '0px 10px 0px 0px'
      },
      duplicateGroupBtn: {
        margin: '0px 10px 0px 0px'
      },
      modifyGroupBtn: {
        margin: '0px 10px 0px 0px'
      },
      deleteGroupBtn: {

      },
      addServerBtn: {
        margin: '0px 10px 0px 0px'
      },
      duplicateConnectionBtn: {
        margin: '0px 10px 0px 0px'
      },
      modifyServerBtn: {
        margin: '0px 10px 0px 0px'
      },
      deleteServerBtn: {

      }
    }

    const {
      open,
      options,
      deleteGroupConfirmOpen,
      deleteServerConfirmOpen
    } = this.state

    const groupColumns = [
      { field: 'id', headerName: this.getLabel('id'), width: 130 },
      { field: 'name', headerName: this.getLabel('name'), width: 200 },
      { field: 'legend', headerName: this.getLabel('legend'), flex: 1 }
    ]
    const serverColumns = [
      { field: 'id', headerName: this.getLabel('id'), width: 130 },
      { field: 'group', headerName: this.getLabel('group'), width: 100,
      valueGetter: (params) => {
        const groupId = _.get(params, 'row.groupId', '')
        const group = this.getGroupById(groupId)
        return _.get(group, 'name', '-')
      } },
      { field: 'name', headerName: this.getLabel('name'), flex: 1 },
      { field: 'legend', headerName: this.getLabel('legend'), flex: 1 },
      { field: 'accelerator', headerName: this.getLabel('accelerator'), width: 130 },
      { field: 'host', headerName: this.getLabel('host'), width: 150 },
      { field: 'type', headerName: this.getLabel('type'), width: 90 },
      { field: 'port', headerName: this.getLabel('port'), width: 90 },
      { field: 'user', headerName: this.getLabel('user'), width: 90 },
      { field: 'key', headerName: this.getLabel('sshKey'), width: 130 },
      { field: 'custom', headerName: this.getLabel('custom'), width: 130 }
    ]

    const groups = this.getGroups()
    const servers = this.getConnections()

    return (
      <div>
        <Dialog
          open={deleteGroupConfirmOpen}
          onClose={this.onDeleteGroupCancelBtnClick}
          aria-labelledby="group-delete-confirm-title"
          aria-describedby="group-delete-confirm-description"
        >
          <DialogTitle id="group-delete-confirm-title">{this.getLabel('confirmation')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="group-delete-confirm-description">
              {this.getDeleteGroupConfirmMessage()}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.onDeleteGroupCancelBtnClick}
            >Cancel</Button>
            <Button
              onClick={this.onDeleteGroupAcceptBtnClick}
              variant="contained"
              color="secondary"
              autoFocus
            >Delete</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteServerConfirmOpen}
          onClose={this.onDeleteServerCancelBtnClick}
          aria-labelledby="server-dialog-confirm-title"
          aria-describedby="server-dialog-confirm-description"
        >
          <DialogTitle id="server-dialog-confirm-title">{this.getLabel('confirmation')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="server-dialog-confirm-description">
              {this.getDeleteConnectionConfirmMessage()}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.onDeleteServerCancelBtnClick}
            >{this.getLabel('cancel')}</Button>
            <Button
              onClick={this.onDeleteServerAcceptBtnClick}
              variant="contained"
              color="secondary"
              autoFocus
            >{this.getLabel('delete')}</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          className="parameter-dialog"
          open={open}
          onClose={this.onClose}
          aria-labelledby="form-dialog-title"
          disableEscapeKeyDown
          disableBackdropClick
          fullWidth
          maxWidth={false}
        >
          <DialogTitle id="form-dialog-title">{this.getTitle()}</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ marginTop: '5px' }}>
              {this.getLabel('groupLegend', {count: groups.length})}
            </DialogContentText>
            <div style={{ width: '100%', height: 200 }}>
              <DataGrid
                columns={groupColumns}
                rows={groups}
                rowHeight={40}
                checkboxSelection
                hideFooter
                onSelectionModelChange={this.onGroupSelectionChange}
              />
            </div>
            <div style={styles.actionBar}>
              <Button
                style={styles.addGroupBtn}
                color="primary"
                onClick={this.onAddGroupBtnClick}
              >{this.getLabel('add')}</Button>
              <Button
                disabled={this.isModifyGroupBtnDisabled()}
                style={styles.duplicateGroupBtn}
                onClick={this.onDuplicateGroupBtnClick}
              >{this.getLabel('duplicate')}</Button>
              <Button
                disabled={this.isModifyGroupBtnDisabled()}
                style={styles.modifyGroupBtn}
                onClick={this.onModifyGroupBtnClick}
              >{this.getLabel('modify')}</Button>
              <Button
                disabled={this.isDeleteGroupBtnDisabled()}
                style={styles.deleteGroupBtn}
                color="secondary"
                onClick={this.onDeleteGroupBtnClick}
              >{this.getLabel('delete')}</Button>
            </div>
            <DialogContentText>
              {this.getLabel('connectionLegend', {count: servers.length})}
            </DialogContentText>
            <div style={{ width: '100%', height: 200 }}>
              <DataGrid
                columns={serverColumns}
                rows={servers}
                rowHeight={40}
                checkboxSelection
                hideFooter
                onSelectionModelChange={this.onConnectionSelectionChange}
              />
            </div>
            <div style={styles.actionBar}>
              <Button
                style={styles.addServerBtn}
                color="primary"
                onClick={this.onAddServerBtnClick}
              >{this.getLabel('add')}</Button>
              <Button
                disabled={this.isModifyConnectionBtnDisabled()}
                style={styles.duplicateConnectionBtn}
                onClick={this.onDuplicateConnectionBtnClick}
              >{this.getLabel('duplicate')}</Button>
              <Button
                disabled={this.isModifyConnectionBtnDisabled()}
                style={styles.modifyServerBtn}
                onClick={this.onModifyServerBtnClick}
              >{this.getLabel('modify')}</Button>
              <Button
                disabled={this.isDeleteConnectionBtnDisabled()}
                style={styles.deleteServerBtn}
                color="secondary"
                onClick={this.onDeleteServerBtnClick}
              >{this.getLabel('delete')}</Button>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.onCancelBtnClick}
            >{this.getLabel('cancel')}</Button>
            <Button
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

export default ParameterDialog
