let notificationWrap = document.getElementById('notification');
let notificationSpan = document.getElementById('notificationSpan');
let notificationImg = document.createElement('img');

const addToBlocklist = async (
  inputElem: HTMLInputElement | null,
  blockList: string[] | undefined
) => {
  let validURL = isValidHTTPURL(inputElem);
  // check if url is valid

  if (validURL) {
    // check if the protocol is either http or https
    if (validURL.protocol !== 'https:' && validURL.protocol !== 'http:') {
      notificationHandler('You can only block https or http protocol', 'error');
      return false;
    }

    // dont block Oauth2 url
    if (validURL.pathname.includes('oauth2')) {
      notificationHandler('You cant block Oauth', 'error');
      return false;
    }

    let trimValidURL = validURL.hostname;
    //  if not exist generate block list data
    if (!blockList) {
      chrome.storage.sync.set({ WebsiteBlockerBlock: [trimValidURL] });
      notificationHandler(`${trimValidURL} is blocked`, 'success');
      return;
    }

    // check if site is already blocked
    if (blockList.includes(trimValidURL)) {
      notificationHandler(`${trimValidURL} is already blocked`, 'error');
      return;
    } else {
      notificationHandler(`${trimValidURL} is blocked`, 'success');
      chrome.storage.sync.set({
        WebsiteBlockerBlock: [...blockList, trimValidURL],
      });
    }
  }
};

const notificationHandler = (message: string, type: string) => {
  if (!notificationSpan || !notificationWrap) {
    console.log('Missing notification element');
    return;
  }

  notificationSpan.classList.remove('success');
  notificationSpan.classList.remove('error');

  if (type === 'success') {
    notificationSpan.classList.add(type);
    notificationImg.setAttribute('src', '../images/icons/success.svg');
  } else {
    notificationSpan.classList.add(type);
    notificationImg.setAttribute('src', '../images/icons/error.svg');
  }

  notificationWrap.prepend(notificationImg);
  notificationSpan.innerText = message;
};

const isValidHTTPURL = (inputElem: HTMLInputElement | null) => {
  let url: string;
  let isURL;

  if (inputElem === null) {
    console.error('Input element not found');
    return;
  }

  url = inputElem.value;
  //  check if the input is not empty
  if (!url) {
    notificationHandler('Please input URL', 'error');
    return;
  }

  inputElem.value = '';

  try {
    isURL = new URL(url);
    return isURL;
  } catch (error) {
    notificationHandler('Invalid URL', 'error');
    return false;
  }
};

const currentURLToInput = async (inputElem: HTMLInputElement) => {
  let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tabs && !inputElem) {
    return;
  }

  let currentTab = tabs[0];

  if (!currentTab.url) {
    return;
  }

  try {
    let url = new URL(currentTab.url);

    if (url.protocol == 'https:' || url.protocol == 'http;') {
      inputElem.value = currentTab.url;
    }
  } catch (error) {}
};

export { addToBlocklist, notificationHandler, currentURLToInput };
