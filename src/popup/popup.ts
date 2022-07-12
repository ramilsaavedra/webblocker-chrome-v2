import { WebBlockerData } from '../types/types';
import { addToBlocklist, currentURLToInput } from '../helper';

let addToBlocklistBtn = document.getElementById('addToBlocklist');
let editBlocklistLink = document.getElementById('editBlocklist');
let inputURL = <HTMLInputElement>document.getElementById('URL');
let blockList: WebBlockerData;

if (editBlocklistLink) {
  editBlocklistLink.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
}

if (addToBlocklistBtn) {
  addToBlocklistBtn.addEventListener('click', async () => {
    blockList = await chrome.storage.sync.get('WebsiteBlockerBlock');
    addToBlocklist(inputURL, blockList.WebsiteBlockerBlock);
  });
}

window.addEventListener('load', async () => {
  currentURLToInput(inputURL);
});
