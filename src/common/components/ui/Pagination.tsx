import { ReactNode, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

type PaginationType<T> = {
  itemsPerPage: number;
  // eslint-disable-next-line no-unused-vars
  children?: (data: T[]) => ReactNode;
  dataArr: T[];
  className?: string;
};

function Pagination<T>({ dataArr, ...props }: PaginationType<T>) {
  return <PaginationWrapper dataArr={isArray(dataArr)} {...props} />;
}

Pagination.defaultProps = {
  itemsPerPage: 5,
};

export default Pagination;

function PaginationWrapper<T>({
  itemsPerPage,
  children,
  dataArr,
  className,
}: PaginationType<T>) {
  const [currentItems, setCurrentItems] = useState<T[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(dataArr.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataArr.length / itemsPerPage));
  }, [dataArr, itemOffset, itemsPerPage]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % dataArr.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <>{children && children(currentItems)}</>
      {dataArr.length > itemsPerPage && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          className={
            "flex gap-5 font-medium w-full text-xs leading-[18px] text-[#9AA5B5] justify-center  items-center" +
            " " +
            className
          }
          disabledClassName="!bg-[#d9d9d9] !text-[#333] p-[2px_8px] rounded-[3px]"
          nextClassName="bg-[#7266FC] text-[#fff] p-[2px_8px] rounded-[3px]"
          previousClassName="bg-[#7266FC] text-[#fff] p-[2px_8px] rounded-[3px]"
          pageCount={pageCount}
          marginPagesDisplayed={1}
          previousLabel="Previous"
          activeClassName="bg-[#7266FC] text-[#fff] p-[2px_8px] rounded-[3px]"
        />
      )}
    </>
  );
}

export function isArray<T>(data: T[]): T[] {
  return Array.isArray(data) ? [...data] : [];
}
