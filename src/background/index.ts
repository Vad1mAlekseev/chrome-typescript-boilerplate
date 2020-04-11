import axios from 'axios';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' },() => {
    console.log("The color is green.");
  });

  chrome.alarms.create('hello-alarm', {
    periodInMinutes: 1,
  });

  chrome.alarms.onAlarm.addListener(async (ctx) => {
    console.log(await axios.post(''));
  });
});
