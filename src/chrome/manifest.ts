const manifest: chrome.runtime.Manifest = {
  name: process.env.npm_package_name ?? '',
  version: process.env.npm_package_vesrion ?? '',
  description: process.env.npm_package_description,
  background: {
    scripts: ["background.js"],
    persistent: false
  },
  manifest_version: 2,
  permissions: [
    'storage,',
    'alarms,',
    'https://*.google.com/*,',
    'https://vk.com/*',
  ],
}

export default manifest;
