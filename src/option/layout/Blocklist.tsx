import React, { useState, useContext, useEffect } from 'react';
import { WebBlockerData } from '../../types/types';
import Button from '../components/Button';
import BlocklistItem from '../components/BlocklistItem';
import NotificationContext from '../context/NotificationContext';

const Blocklist = () => {
  const { notificationHandler } = useContext(NotificationContext);
  const [url, setUrl] = useState('');
  const [blocklist, setBlocklist] = useState([]);

  const getData = async () => {
    const data: WebBlockerData = await chrome.storage.sync.get(
      'WebsiteBlockerBlock'
    );

    if (data.WebsiteBlockerBlock) {
      setBlocklist(data.WebsiteBlockerBlock);
    } else {
      setBlocklist([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (blocklist.length) {
      console.log(blocklist);
    }
  }, [blocklist]);

  const onAddClick = async () => {
    // check if there is an input
    if (!url) {
      notificationHandler({
        type: 'error',
        message: 'Please input URL',
      });
      return;
    }

    setUrl('');

    try {
      const { protocol, pathname, hostname } = new URL(url);
      // block only https and http protocol
      if (protocol !== 'https:' && protocol !== 'http:') {
        notificationHandler({
          type: 'error',
          message: 'You can only block https or http protocol',
        });
        return;
      }

      // dont block Oauth2 url
      if (pathname.includes('oauth2')) {
        notificationHandler({
          type: 'error',
          message: 'You cant block Oauth',
        });
        return;
      }

      // block the hostname
      // check if its already blocked
      if (blocklist.includes(hostname)) {
        notificationHandler({
          type: 'error',
          message: `${hostname} is already blocked`,
        });
        return;
      } else {
        await chrome.storage.sync.set({
          WebsiteBlockerBlock: [...blocklist, hostname],
        });
      }

      notificationHandler({
        type: 'success',
        message: `${hostname} is blocked`,
      });
      getData();
    } catch (error) {
      notificationHandler({
        type: 'error',
        message: 'Invalid URL',
      });
      console.log(error);
    }
  };

  const onClearClick = async () => {
    await chrome.storage.sync.clear();
    notificationHandler({
      type: 'success',
      message: 'Blocklist has been cleared',
    });
    getData();
  };

  const onItemDeleteClick = async (block: string) => {
    if (window.confirm(`Do you really want to remove ${block}`)) {
      let filterBlocklist = blocklist.filter((item) => {
        return item !== block;
      });

      if (!filterBlocklist.length) {
        await chrome.storage.sync.clear();
      } else {
        await chrome.storage.sync.set({
          WebsiteBlockerBlock: filterBlocklist,
        });
      }

      notificationHandler({
        type: 'success',
        message: `${block} has been removed`,
      });

      getData();
    }
  };

  return (
    <>
      <h2>Blocklist:</h2>
      <div className='inputWrap'>
        <input
          value={url}
          className='input'
          type='text'
          placeholder='Copy or type URL'
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={onAddClick}>Add</Button>
      </div>
      {blocklist.length !== 0 && (
        <ul className='blocklistWrap'>
          {blocklist.map((block, index) => {
            return (
              <BlocklistItem
                key={index}
                block={block}
                onClick={() => onItemDeleteClick(block)}
              />
            );
          })}
        </ul>
      )}
      <Button
        disabled={!blocklist.length}
        className='clearData'
        variant='secondary'
        onClick={onClearClick}
      >
        Clear Blocklist
      </Button>
    </>
  );
};
export default Blocklist;
