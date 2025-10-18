import styles from './NavBar.module.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdNotificationsNone } from "react-icons/md";
import { BsGrid } from "react-icons/bs";

import Button from './Button/Button.jsx';

const NavBar = () => {
    return (
        <nav className={styles.NavBar_container}>
            <Button 
                icon={<GiHamburgerMenu size={30} />}        
            />
          
            <h1 className={styles.NavBar_title}>Searchify</h1>
            <div className={styles.NavBar_leftIcons_wrapper}>
              <Button icon={<MdNotificationsNone size={30} />} />
              <div className={styles.NavBar_user_avatar}>
                AS
              </div>
              <Button icon={<BsGrid size={30} />} />
            </div>
        </nav>
    );  
}

export default NavBar;