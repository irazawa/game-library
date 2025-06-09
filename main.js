// main.js - Final Version

const { app, BrowserWindow, ipcMain, dialog, protocol } = require('electron');
const path = require('path');
const sudo = require('sudo-prompt');

// Database variable will be initialized when the app is ready
let db;

// Function to create the main application window
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 1024,
        minHeight: 680,
        title: 'Game Library',
        webPreferences: {
            // Preload script is the safe bridge between backend and frontend
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.loadFile('index.html');
};

// This method will be called when Electron has finished initialization
app.whenReady().then(async () => {
    // Register a custom protocol to safely serve local files (images)
    protocol.registerFileProtocol('app-file', (request, callback) => {
        const url = request.url.replace('app-file://', '');
        try {
            return callback(decodeURI(url));
        } catch (error) {
            console.error('Failed to register "app-file" protocol', error);
        }
    });

    // --- Database Setup (lowdb) ---
    // Using dynamic import to load ES Modules in a CommonJS file
    const { Low } = await import('lowdb');
    const { JSONFile } = await import('lowdb/node');

    // Define the path for the database file in the user's app data folder
    const dbFilePath = path.join(app.getPath('userData'), 'db.json');
    const adapter = new JSONFile(dbFilePath);
    
    db = new Low(adapter, { games: [] }); // Default data if file doesn't exist

    // Read data from DB. If it's empty, initialize with default structure.
    await db.read();
    db.data = db.data || { games: [] };
    await db.write();
    // --- End of Database Setup ---

    createWindow();

    // Re-create a window on macOS when the dock icon is clicked
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// --- IPC Handlers (Backend Logic) ---
// These functions handle requests from the frontend (renderer.js)

ipcMain.handle('get-games', async () => {
    await db.read();
    return db.data.games;
});

ipcMain.handle('add-game', async (event, gameData) => {
    await db.read();
    const newGame = {
        id: Date.now(), // Use timestamp as a unique ID
        ...gameData,
    };
    db.data.games.push(newGame);
    await db.write();
    return newGame;
});

ipcMain.handle('update-game', async (event, gameId, gameData) => {
    await db.read();
    const gameIndex = db.data.games.findIndex(g => g.id === gameId);
    if (gameIndex !== -1) {
        // Update the game data while preserving its ID
        db.data.games[gameIndex] = { ...db.data.games[gameIndex], ...gameData };
        await db.write();
        return { success: true, game: db.data.games[gameIndex] };
    }
    return { success: false, message: 'Game not found' };
});

ipcMain.handle('delete-game', async (event, gameId) => {
    await db.read();
    db.data.games = db.data.games.filter(g => g.id !== gameId);
    await db.write();
    return { success: true };
});

ipcMain.handle('launch-game', (event, exePath) => {
    if (!exePath) {
        dialog.showErrorBox('Error', 'Executable path is not valid.');
        return { success: false };
    }

    // Options for the UAC prompt. The name will be displayed to the user.
    const options = {
        name: 'Game Library Launcher'
    };

    // Wrap the command in quotes to handle paths with spaces
    const command = `"${exePath}"`;

    sudo.exec(command, options, (error, stdout, stderr) => {
        if (error) {
            // This error occurs if the user clicks "No" on the UAC prompt
            // or if another error happens.
            console.error('Sudo-prompt error:', error);
            if (error.message.includes('User did not grant permission')) {
                console.log('User cancelled the UAC prompt.');
            } else {
                dialog.showErrorBox('Failed to Run Game', error.message);
            }
        }
    });

    return { success: true };
});

ipcMain.handle('open-file-dialog', async (event, options) => {
    const window = BrowserWindow.getFocusedWindow();
    const { canceled, filePaths } = await dialog.showOpenDialog(window, {
        properties: ['openFile'],
        filters: options.filters || []
    });
    if (canceled || filePaths.length === 0) {
        return null;
    } else {
        return filePaths[0];
    }
});

ipcMain.handle('toggle-fullscreen', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
        win.setFullScreen(!win.isFullScreen());
    }
});
