import Button from '../Button/Button';
import styles from './Pagination.module.css';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import classNames from 'classnames';

const Pagination = ({ currentPage, totalNumberPages, setCurrentPage }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };
    
    const handleNext = () => {
        if (currentPage < totalNumberPages) {
        setCurrentPage(currentPage + 1);
        }
    }

   const renderPageNumbers = () => {
        if (totalNumberPages <= 7) {
            return Array.from({ length: totalNumberPages }).map((_, i) => (
                <div
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`${styles.pageBox} ${i + 1 === currentPage ? styles.active : ""}`}
                >
                    {i + 1}
                </div>
            ));
        } else {
            const pages = [];
            
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(
                        <div
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`${styles.pageBox} ${i === currentPage ? styles.active : ""}`}
                        >
                            {i}
                        </div>
                    );
                }
                pages.push(
                    <div key="ellipsis-end" className={classNames(styles.pageBox, styles.ellipsis)}>
                        ...
                    </div>
                );
                pages.push(
                    <div
                        key={totalNumberPages}
                        onClick={() => setCurrentPage(totalNumberPages)}
                        className={`${styles.pageBox} ${totalNumberPages === currentPage ? styles.active : ""}`}
                    >
                        {totalNumberPages}
                    </div>
                );
            } else if (currentPage >= totalNumberPages - 3) {
                pages.push(
                    <div
                        key={1}
                        onClick={() => setCurrentPage(1)}
                        className={`${styles.pageBox} ${1 === currentPage ? styles.active : ""}`}
                    >
                        1
                    </div>
                );
                pages.push(
                    <div key="ellipsis-start" className={classNames(styles.pageBox, styles.ellipsis)}>
                        ...
                    </div>
                );
                for (let i = totalNumberPages - 4; i <= totalNumberPages; i++) {
                    pages.push(
                        <div
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`${styles.pageBox} ${i === currentPage ? styles.active : ""}`}
                        >
                            {i}
                        </div>
                    );
                }
            } else {
                pages.push(
                    <div
                        key={1}
                        onClick={() => setCurrentPage(1)}
                        className={`${styles.pageBox} ${1 === currentPage ? styles.active : ""}`}
                    >
                        1
                    </div>
                );
                pages.push(
                    <div key="ellipsis-start" className={classNames(styles.pageBox, styles.ellipsis)}>
                        ...
                    </div>
                );
                pages.push(
                    <div
                        key={currentPage - 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className={`${styles.pageBox}`}
                    >
                        {currentPage - 1}
                    </div>
                );
                pages.push(
                    <div
                        key={currentPage}
                        onClick={() => setCurrentPage(currentPage)}
                        className={`${styles.pageBox} ${styles.active}`}
                    >
                        {currentPage}
                    </div>
                );
                pages.push(
                    <div
                        key={currentPage + 1}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={`${styles.pageBox}`}
                    >
                        {currentPage + 1}
                    </div>
                );
                pages.push(
                    <div key="ellipsis-end" className={classNames(styles.pageBox, styles.ellipsis)}>
                        ...
                    </div>
                );
                pages.push(
                    <div
                        key={totalNumberPages}
                        onClick={() => setCurrentPage(totalNumberPages)}
                        className={`${styles.pageBox} ${totalNumberPages === currentPage ? styles.active : ""}`}
                    >
                        {totalNumberPages}
                    </div>
                );
            }
            
            return pages;
        }
    }
    
    return (
        <div className={styles.pagination}>
            <Button className={styles.button} onClick={handlePrevious} disabled={currentPage === 1} icon={<FaAngleLeft size={30}/>}/>
            {renderPageNumbers()}
            <Button className={styles.button} onClick={handleNext} disabled={currentPage === totalNumberPages} icon={<FaAngleRight size={30}/>}/>
        </div>
    );
    }

    export default Pagination;