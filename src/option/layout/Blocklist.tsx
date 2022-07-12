import React, { useState } from 'react';
import Button from '../components/Button';

const Blocklist = () => {
  const [URL, setURL] = useState('');

  const onAddClick = () => {
    chrome.storage.sync.set({ WebsiteBlockerBlock: URL });
  };
  return (
    <>
      <h2>Blocklist:</h2>
      <div className='inputWrap'>
        <input
          value={URL}
          className='input'
          type='text'
          placeholder='Copy or type URL'
          onChange={(e) => setURL(e.target.value)}
        />
        <Button onClick={onAddClick}>Add</Button>
      </div>
      <div id='blocklistWrapDiv'></div>
      <Button id='clearData' type='secondary'>
        Clear Blocklist
      </Button>
    </>
  );
};
export default Blocklist;
