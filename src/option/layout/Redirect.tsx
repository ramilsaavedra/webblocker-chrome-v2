import React, { useState, useEffect, useContext } from 'react';
import { WebBlockerRedirect } from '../../types/types';
import Button from '../components/Button';
import NotificationContext from '../context/NotificationContext';

const Redirect = () => {
  const [url, setUrl] = useState('');
  const { notificationHandler } = useContext(NotificationContext);

  useEffect(() => {
    const getData = async () => {
      const data: WebBlockerRedirect = await chrome.storage.sync.get(
        'WebsiteBlockerRedirect'
      );

      if (data.WebsiteBlockerRedirect) {
        setUrl(data.WebsiteBlockerRedirect);
      } else {
        setUrl('');
      }
    };

    getData();
  }, []);

  useEffect(() => {
    console.log(url, 'url');
  }, [url]);

  const onClick = async () => {
    // check if there is an input
    if (!url) {
      notificationHandler({
        type: 'error',
        message: 'Please input URL',
      });
      return;
    }

    try {
      const validUrl = new URL(url);
      await chrome.storage.sync.set({
        WebsiteBlockerRedirect: validUrl.toString(),
      });
      notificationHandler({
        type: 'success',
        message: `${validUrl} is the new redirect link`,
      });
    } catch (error) {
      notificationHandler({
        type: 'error',
        message: 'Invalid URL',
      });
      console.log(error);
    }
  };

  return (
    <>
      <h2>Redirect URL:</h2>
      <div className='inputWrap'>
        <input
          value={url}
          className='input'
          type='text'
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Copy or type redirect link'
        />
        <Button onClick={onClick}>Confirm</Button>
      </div>
    </>
  );
};

export default Redirect;
