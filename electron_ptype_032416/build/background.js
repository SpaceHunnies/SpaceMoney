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

// module.exports = (type) => {
// 	return {
// 		name: type,
// 		speed: 5,
// 		crewMax: 20,
// 		food: 0,
// 		foodMax: 100,
// 		oxy: 0,
// 		oxyMax: 100,
// 		water: 0,
// 		waterMax: 100,
// 		captain: null,
// 		comms: null,
// 		nav: null,
// 		quartermaster: null,
// 	};
// }

class Ship {
	constructor(properties) {
		this.properties = properties;
		console.log("created a ship with name " + this.properties.name);
	}

	addFood (amount) {
		if (food + amount <= foodMax) {
			food = food + amount;
			return 0;
		} else {
			let overflow = foodMax - food;
			food = foodMax;
			return overflow;
		}
	}
}

class ShipManager {
	constructor(properties) {
		console.log("created a ship manager")
		// this.properties = properties;
	}

	spawnShip(properties) {
		console.log("spawning a ship");
		return new Ship(properties);
	}

	print() {
		console.log("ship manager printing");
	}
}

// const shipManager = new ShipManager();
// shipManager.spawnShip();

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
let sm;

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

    sm = new ShipManager();
    let ship = sm.spawnShip({name: "prototypeShip"});

    mainWindow.on('close', function () {
        mainWindowState.saveState(mainWindow);
    });
});

electron.app.on('window-all-closed', function () {
    electron.app.quit();
});
}());
//# sourceMappingURL=background.js.map