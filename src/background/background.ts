import { WebBlockerData, WebBlockerRedirect } from '../types/types';

let webBlockerData: WebBlockerData;
let webBlockerRedirect: WebBlockerRedirect;

chrome.runtime.onInstalled.addListener(() => {
  console.log('Welcome to Web Blocker');
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    webBlockerData = await chrome.storage.sync.get('WebsiteBlockerBlock');
    webBlockerRedirect = await chrome.storage.sync.get(
      'WebsiteBlockerRedirect'
    );

    if (!webBlockerData || !webBlockerData.WebsiteBlockerBlock) {
      console.log('No data found');
      return;
    }

    if (tab.url) {
      // bypass block when its the redirect link
      if (webBlockerRedirect.WebsiteBlockerRedirect === tab.url.toString()) {
        console.log('This is the redirect link');
        return;
      }

      const { hostname } = new URL(tab.url);
      let blocked = webBlockerData.WebsiteBlockerBlock.includes(hostname);
      if (blocked) {
        console.log(blocked, 'blocked');
        if (webBlockerRedirect.WebsiteBlockerRedirect) {
          chrome.tabs.update(tabId, {
            url: webBlockerRedirect.WebsiteBlockerRedirect,
          });
        } else {
          chrome.tabs.update(tabId, { url: 'chrome://newtab' });
        }
      }
    }
  }
});
