import styles from './NavBar.module.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdNotificationsNone } from 'react-icons/md';
import { BsGrid } from 'react-icons/bs';

import Button from '../Button/Button.jsx';
import { useState } from 'react';
import DropDown from '../DropdDown/DropDown.jsx';

const data = ['Profile', 'Settings', 'Logout'];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={styles.NavBar_container}>
      <div className={styles.NavBar_rightIcons_wrapper}>
      <Button icon={<GiHamburgerMenu size={30} />} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && <DropDown 
      onClose={() => setIsOpen(false)}
      classes={{
        container: styles.DropDown_container
      }}
      data={data} 
      onClick={() => setIsOpen(false)} />}
      </div>
      <h1 className={styles.NavBar_title}>Searchify</h1>
      <div className={styles.NavBar_leftIcons_wrapper}>
        <Button icon={<MdNotificationsNone size={30} />} />
        <div className={styles.NavBar_user_avatar}>AS</div>
        <Button icon={<BsGrid size={30} />} />
      </div>
    </nav>
  );
};

export default NavBar;
