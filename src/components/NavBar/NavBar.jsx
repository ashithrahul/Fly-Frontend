import styles from './NavBar.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdNotificationsNone } from 'react-icons/md';
import { BsGrid } from 'react-icons/bs';

import Button from '../Button/Button.jsx';
import { useState, useRef } from 'react';
import DropDown from '../DropdDown/DropDown.jsx';

const MENU_ITEMS = [
  { id: 'profile', label: 'Profile', action: 'profile' },
  { id: 'settings', label: 'Settings', action: 'settings' },
  { id: 'logout', label: 'Logout', action: 'logout' }
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef(null);
  
  return (
    <nav className={styles.NavBar_container}>
      <div className={styles.NavBar_rightIcons_wrapper}>
      <div ref={hamburgerRef} className={styles.NavBar_hamburger_menu}>
        <Button icon={<GiHamburgerMenu size={30} />} onClick={() => setIsOpen((isOpen) => !isOpen)} />
      </div>
      <h1 className={styles.NavBar_title}>Searchify</h1>
      {isOpen && <DropDown 
      onClose={() => setIsOpen(false)}
      excludeRef={hamburgerRef}
      classes={{
        container: styles.DropDown_container
      }}
      data={MENU_ITEMS} 
      keyProp="label"
      onClick={() => setIsOpen(false)} />}
      </div>
      <div className={styles.NavBar_leftIcons_wrapper}>
        <Button icon={<MdNotificationsNone size={30} />} />
        <div className={styles.NavBar_user_avatar}>AS</div>
        <Button icon={<BsGrid size={30} />} />
      </div>
    </nav>
  );
};

export default NavBar;
