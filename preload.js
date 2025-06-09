// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// contextBridge secara aman mengekspos fungsi dari backend (main.js)
// ke frontend (renderer.js) melalui objek window.electronAPI
contextBridge.exposeInMainWorld('electronAPI', {
    // Fungsi untuk mendapatkan semua game
    getGames: () => ipcRenderer.invoke('get-games'),

    // Fungsi untuk menambah game baru
    addGame: (gameData) => ipcRenderer.invoke('add-game', gameData),

    // Fungsi untuk memperbarui game yang sudah ada
    updateGame: (gameId, gameData) => ipcRenderer.invoke('update-game', gameId, gameData),

    // Fungsi untuk menghapus game
    deleteGame: (gameId) => ipcRenderer.invoke('delete-game', gameId),
    
    // Fungsi untuk menjalankan game (dengan UAC prompt)
    launchGame: (exePath) => ipcRenderer.invoke('launch-game', exePath),
    
    // Fungsi untuk mode fullscreen
    toggleFullscreen: () => ipcRenderer.invoke('toggle-fullscreen'),

    // Fungsi untuk membuka dialog pilih file
    openFileDialog: (options) => ipcRenderer.invoke('open-file-dialog', options)
});