export const Settings = {
  settings: {
    music: true,
  },
  // save settings
  saveSettings() {
    // save the settings
    localStorage.setItem("BroRPGSettings", JSON.stringify(this.settings));
  },
  loadSettings() {
    // load the settings
    let loadedSettings;
    try {
      loadedSettings = localStorage.getItem("BroRPGSettings");
    } catch (e) {
      console.log(e);
    }

    if (loadedSettings) {
      console.log(loadedSettings);
      this.settings = JSON.parse(loadedSettings);
    }
  },
};
