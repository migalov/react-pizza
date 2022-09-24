import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3} // На будущее, кол-во страниц должно брать с backend
    forcePage={currentPage - 1}
    previousLabel="<"
  />
);

export default Pagination;
