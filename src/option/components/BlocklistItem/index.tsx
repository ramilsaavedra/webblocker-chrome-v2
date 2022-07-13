import React from 'react';
import style from './blocklistitem.module.css';
import icon from '../../../../public/images/icons/error.svg';

interface BlocklistItemProps {
  block: string;
  onClick: () => void;
}

const BlocklistItem: React.FC<BlocklistItemProps> = ({ block, onClick }) => {
  return (
    <li className={style.blockListItem}>
      <span className={style['blockListItem-text']}>{block}</span>
      <button className={style.blockListItemButton} onClick={onClick}>
        <img src={icon} alt='remove' />
      </button>
    </li>
  );
};

export default BlocklistItem;
