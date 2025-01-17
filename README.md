<p align="center" style="margin-bottom: 0px !important;">
  <img src="https://github.com/oOthkOo/hyper-manager/blob/main/pictures/putnspY.png" alt="hyper-manager"/>
</p>

<h1 align="center" style="margin-top: 0px;">hyper-manager</h1>

<p align="center">The ultimate and most complete extension to manage all your connections in one place for <a href="https://hyper.is/">Hyper.js</a>.</p>

<div align="center">
  
[![Stars](https://img.shields.io/github/stars/oOthkOo/hyper-manager.svg?style=for-the-badge)](https://github.com/oOthkOo/hyper-manager)
[![Latest Stable Version](https://img.shields.io/npm/v/hyper-manager.svg?style=for-the-badge)](https://www.npmjs.com/package/hyper-manager)
[![NPM Downloads](https://img.shields.io/npm/dt/hyper-manager.svg?style=for-the-badge)](https://www.npmjs.com/package/hyper-manager)
[![NPM Downloads](https://img.shields.io/npm/dm/hyper-manager.svg?style=for-the-badge)](https://www.npmjs.com/package/hyper-manager)

</div>

![Screncast 001](https://github.com/oOthkOo/hyper-manager/blob/main/screencasts/screencast-001.gif)

Features
-----
 * Create groups with names and legends
 * Duplicate group from another
 * Modify group's names and legends
 * Delete groups alone or by batch
 * Create connections (cli/ssh/ftp/telnet) with a wide range of parameters
 * Duplicate connection from another
 * Modify all connection's parameters
 * Delete connections alone or by batch
 * Specify by connection how (new tab, split term etc..) launch connections
 * Manage a lot of connections in one place easily
 * Builtin Internalization in configuration
 * Load/Save your connections and groups from/to your personal JSON file


 Installation
 -----
 #### Using Hyper's CLI
Run this command in your terminal:
 ```sh
 hyper install hyper-manager
 ```

 #### Manually

 To install, edit `~/.hyper.js` and add `"hyper-manager"` to `plugins`:

 ```js
 plugins: [
   "hyper-manager",
   // other plugins...
 ],
 ```

Configuration
-----
Here is a demo of what you can do with `HyperManager` to add groups and connections which will be accessible from the `Hyper.js` menu :

![Screncast 002](https://github.com/oOthkOo/hyper-manager/blob/main/screencasts/screencast-002.gif)

#### Locations

`HyperManager` saves its configuration in a hidden file `.hyper-manager.json` in `JSON` format.<br />
Here is where this file is found depending on your operating system:

 OS | Paths
 --- | ---
 Windows | X:\Users\\{Username}\\.hyper-manager.json
 Linux | /home/{Username}/.hyper-manager.json
 macOS | /Users/{Username}/.hyper-manager.json

#### Default configuration

`HyperManager` saves its own configuration apart from that of Hyper.js. If `HyperManager` does not find a valid configuration file, then it loads an empty configuration:

```json
{
  "version": "1.0.0",
  "labels": {
      "openAll": "Open all",
      "parameters": "Parameters...",
      "add": "Add",
      "duplicate": "Duplicate",
      "modify": "Modify",
      "delete": "Delete",
      "ok": "Ok",
      "cancel": "Cancel",
      "save": "Save",
      "restartTitle": "Restart Hyper.js",
      "restartText": "You must restart Hyper.js to apply changes.",
      "id": "ID",
      "name": "Name",
      "legend": "Legend",
      "user": "User",
      "group": "Group",
      "accelerator": "Accelerator",
      "host": "Host",
      "type": "Type",
      "port": "Port",
      "sshKey": "SSH Key",
      "custom": "Custom",
      "customArguments": "Custom arguments",
      "launch": "Launch",
      "launchActiveTerm": "Active Term",
      "launchNewTab": "New Tab",
      "launchSplitHorizontally": "Split Horizontally",
      "launchSplitVertically": "Split Vertically",
      "groupLegend": "You have #count# group(s).",
      "connectionLegend": "You have #count# connection(s).",
      "newGroup": "New group",
      "modifyGroup": "Modify group",
      "newConnection": "New connection",
      "modifyConnection": "Modify connection",
      "confirmation": "Confirmation",
      "deleteGroupConfirm": "Are you sure you want to delete this group (#name#)?",
      "deleteGroupsConfirm": "Are you sure you want to delete #count# groups?",
      "deleteConnectionConfirm": "Are you sure you want to delete this connection (#name#)?",
      "deleteConnectionsConfirm": "Are you sure you want to delete #count# connections?"
  },
  "groups": [ { "name": "Example", "id": "4152bc45" } ],
  "servers": [
    {
      "groupId": "4152bc45",
      "name": "htop",
      "launch": "active-term",
      "type": "cli",
      "id": "b96b6193"
    }
  ]
}
```

Internalization
-----
In the configurations folder of this repository, you will find translated configuration files for the following locales:

Locales | Files
--- | ---
:us: US | [en-US.json](https://github.com/oOthkOo/hyper-manager/blob/main/configurations/en-US.json)
:fr: French | [fr-FR.json](https://github.com/oOthkOo/hyper-manager/blob/main/configurations/fr-FR.json)
:es: Spanish | [es-ES.json](https://github.com/oOthkOo/hyper-manager/blob/main/configurations/es-ES.json)

Contributing
-----

There's a bunch of ways you can contribute to this project, like by:
- :electric_plug: Creating new features
- :wave: Requesting a feature
- :beetle: Reporting a bug
- :page_facing_up: Improving this documentation
- :rotating_light: Sharing this project and recommending it to your friends
- :dollar: Supporting this project by donations
- :star2: Dropping a star on this repository

Donations
-----

:heart: Donations are always welcome :heart:.

Coins | Symbols | Addresses
--- | --- | ---
<img width="32" src="https://github.com/oOthkOo/hyper-manager/blob/main/pictures/btc.svg" alt="Bitcoin"/> | BTC | 3B52fbzNFQTaKZxWf5GrCUsASD2UP8na4A
<img width="32" src="https://github.com/oOthkOo/hyper-manager/blob/main/pictures/eth.svg" alt="Ethereum"/> | ETH | 0x1C389f1f85Cdb3C2996b83fAc87E496A80698B7C
<img width="32" src="https://github.com/oOthkOo/hyper-manager/blob/main/pictures/sol.svg" alt="Solana"/> | SOL | F14pWhGjGLcCF8RMk4JhbK2kD49iBBwa9KFygRJo54Fm
