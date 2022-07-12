let addToBlocklistBtn = document.getElementById('AddToBlocklist');
let editBlocklistLink = document.getElementById('editBlocklist');

if (editBlocklistLink) {
  editBlocklistLink.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
}
