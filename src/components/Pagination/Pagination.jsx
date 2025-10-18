import Button from '../Button/Button';
import styles from './Pagination.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
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
  };

  const renderPageNumbers = () => {
    const createPageBox = page => (
      <div
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`${styles.pageBox} ${page === currentPage ? styles.active : ''}`}
      >
        {page}
      </div>
    );

    const createEllipsis = key => (
      <div key={key} className={classNames(styles.pageBox, styles.ellipsis)}>
        ...
      </div>
    );

    if (totalNumberPages <= 7) {
      return Array.from({ length: totalNumberPages }, (_, i) =>
        createPageBox(i + 1)
      );
    }

    const pages = [];

    const isAtStart = currentPage <= 4;
    const isAtEnd = currentPage >= totalNumberPages - 3;

    if (isAtStart) {
      for (let i = 1; i <= 5; i++) pages.push(createPageBox(i));
      pages.push(createEllipsis('end'));
      pages.push(createPageBox(totalNumberPages));
    } else if (isAtEnd) {
      pages.push(createPageBox(1));
      pages.push(createEllipsis('start'));
      for (let i = totalNumberPages - 4; i <= totalNumberPages; i++)
        pages.push(createPageBox(i));
    } else {
      pages.push(createPageBox(1));
      pages.push(createEllipsis('start'));
      [currentPage - 1, currentPage, currentPage + 1].forEach(p =>
        pages.push(createPageBox(p))
      );
      pages.push(createEllipsis('end'));
      pages.push(createPageBox(totalNumberPages));
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.button}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        icon={<FaAngleLeft size={30} />}
      />
      {renderPageNumbers()}
      <Button
        className={styles.button}
        onClick={handleNext}
        disabled={currentPage === totalNumberPages}
        icon={<FaAngleRight size={30} />}
      />
    </div>
  );
};

export default Pagination;
