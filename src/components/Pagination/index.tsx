import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  currentPage: number;
  onChangePage: any;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => {
  return (
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
};
