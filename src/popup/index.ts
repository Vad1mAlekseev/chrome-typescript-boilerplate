import _ from 'lodash';

const app = document.querySelector('#app');
if (app) {
  app.innerHTML = `
    <h2>Hello world!!!</h2>
  `;
  chrome.alarms.onAlarm.addListener((ctx) => {
    console.log('alarm', ctx)
  })
}
