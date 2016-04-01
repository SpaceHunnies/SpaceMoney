(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));

var setDevMenu = function () {
    var devMenu = electron.Menu.buildFromTemplate([{
        label: 'Development',
        submenu: [{
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click: function () {
                electron.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
            }
        },{
            label: 'Toggle DevTools',
            accelerator: 'Alt+CmdOrCtrl+I',
            click: function () {
                electron.BrowserWindow.getFocusedWindow().toggleDevTools();
            }
        },{
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',
            click: function () {
                electron.app.quit();
            }
        }]
    }]);
    electron.Menu.setApplicationMenu(devMenu);
};

var devHelper = {
    setDevMenu: setDevMenu,
}

function windowStateKeeper (name, defaults) {

    var userDataDir = jetpack.cwd(electron.app.getPath('userData'));
    var stateStoreFile = 'window-state-' + name +'.json';
    var state = {
        width: defaults.width,
        height: defaults.height
    };

    try {
        var loadedState = userDataDir.read(stateStoreFile, 'json');
        if (loadedState != null) {
            state = loadedState;
        }
    } catch (err) {
        // For some reason json can't be read.
        // No worries, we have defaults.
    }

    var saveState = function (win) {
        if (!win.isMaximized() && !win.isMinimized()) {
            var position = win.getPosition();
            var size = win.getSize();
            state.x = position[0];
            state.y = position[1];
            state.width = size[0];
            state.height = size[1];
        }
        state.isMaximized = win.isMaximized();
        userDataDir.write(stateStoreFile, state, { atomic: true });
    };

    return {
        get x() { return state.x; },
        get y() { return state.y; },
        get width() { return state.width; },
        get height() { return state.height; },
        get isMaximized() { return state.isMaximized; },
        saveState: saveState
    };
}

var app$1;
if (process.type === 'renderer') {
    app$1 = require('electron').remote.app;
} else {
    app$1 = require('electron').app;
}
var appDir = jetpack.cwd(app$1.getAppPath());

var manifest = appDir.read('package.json', 'json');

var env = manifest.env;

var mainWindow;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
    width: 1000,
    height: 600
});

electron.app.on('ready', function () {

    mainWindow = new electron.BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height
    });

    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    mainWindow.loadURL('file://' + __dirname + '/app.html');

    if (env.name !== 'production') {
        devHelper.setDevMenu();
        mainWindow.openDevTools();
    }

    mainWindow.on('close', function () {
        mainWindowState.saveState(mainWindow);
    });
});

electron.app.on('window-all-closed', function () {
    electron.app.quit();
});
}());
//# sourceMappingURL=background.js.map