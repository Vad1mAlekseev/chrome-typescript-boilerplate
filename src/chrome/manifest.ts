export default function getManifest(): chrome.runtime.Manifest {
  return {
    name: process.env.npm_package_name ?? '',
    version: process.env.npm_package_version ?? '',
    description: process.env.npm_package_description,

    manifest_version: 2,
    permissions: ['storage', 'alarms'],

    browser_action: {
      default_popup: 'popup.html',
    },

    background: {
      scripts: ['background.js'],
      persistent: false,
    },
  };
}
