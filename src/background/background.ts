import {
  ScheduleDataInterface,
  WebBlockerData,
  WebBlockerRedirect,
  WebBlockerSchedule,
  initSchedData,
} from '../types/types';

let webBlockerData: WebBlockerData;
let webBlockerRedirect: WebBlockerRedirect;
let webBlockerSchedule: WebBlockerSchedule;
let date: Date;
const weekday = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
let day: string;
let todaySchedule: ScheduleDataInterface;
let time: string;

chrome.runtime.onInstalled.addListener(async () => {
  console.log('Welcome to Web Blocker');
  await chrome.storage.sync.set({
    WebsiteBlockerSchedule: initSchedData,
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    webBlockerData = await chrome.storage.sync.get('WebsiteBlockerBlock');
    webBlockerRedirect = await chrome.storage.sync.get(
      'WebsiteBlockerRedirect'
    );
    webBlockerSchedule = await chrome.storage.sync.get(
      'WebsiteBlockerSchedule'
    );

    if (!webBlockerData || !webBlockerData.WebsiteBlockerBlock) {
      console.log('No block data found');
      return;
    }

    if (!webBlockerSchedule || !webBlockerSchedule.WebsiteBlockerSchedule) {
      console.log('No schedule data found');
    } else {
      date = new Date();
      day = weekday[date.getDay()];
      time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      });
      todaySchedule = webBlockerSchedule.WebsiteBlockerSchedule.find(
        (schedule) => schedule.name === day
      );

      // console.log(
      //   date,
      //   'current date',
      //   webBlockerSchedule,
      //   'schedule',
      //   day,
      //   'current day',
      //   todaySchedule,
      //   'today schedule',
      //   time,
      //   'current time',
      //   !todaySchedule.isActive
      // );

      if (!todaySchedule.isActive) {
        console.log('Today is not blocked');
        return;
      }

      // console.log(
      //   time,
      //   todaySchedule.schedule[0].from,
      //   time >= todaySchedule.schedule[0].from,
      //   time < todaySchedule.schedule[0].to
      // );

      if (
        time >= todaySchedule.schedule[0].from &&
        time < todaySchedule.schedule[0].to
      ) {
        if (tab.url) {
          // bypass block when its the redirect link
          if (
            webBlockerRedirect.WebsiteBlockerRedirect === tab.url.toString()
          ) {
            console.log('This is the redirect link');
            return;
          }

          const { hostname } = new URL(tab.url);
          let blocked = webBlockerData.WebsiteBlockerBlock.includes(hostname);
          if (blocked) {
            console.log(blocked, "blocked");
            let newUrl = webBlockerRedirect.WebsiteBlockerRedirect ?? "chrome://newtab";

            // tabs.update will not keep target URL in history so let's save it first
            chrome.history.addUrl({ url: tab.url }).then(() => {
              chrome.tabs.update(tabId, { url: newUrl });
            });
          }
        }
      }
    }
  }
});
