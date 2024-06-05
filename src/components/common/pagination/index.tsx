import { useCallback, useMemo, useState } from "react";

interface UsePaginatorResult {
  onClickPage: (page: number) => void;
  onClickNext: () => void;
  onClickPrev: () => void;
  isLast: boolean;
  isFirst: boolean;
  pageList: number[];
  page: number;
}

// 프론트에서 어디까지 프론트 로직 구현해야 하는가?
const usePaginator = (totalElements: number = 0, defaultPage: number = 1, divider: number = 10): UsePaginatorResult => {
  const [page, setPage] = useState(defaultPage);

  const totalPages = Math.ceil(totalElements / divider);

  const onClickPage = useCallback((pageNum: number) => {
    setPage(pageNum);
  }, []);

  const onClickNext = useCallback(() => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }, [totalPages]);

  const onClickPrev = useCallback(() => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);

  const isFirst = useMemo(() => page === 1, [page]);
  const isLast = useMemo(() => page === totalPages, [page, totalPages]);

  const pageList = useMemo(() => {
    const startPage = Math.floor((page - 1) / divider) * divider + 1;
    const endPage = Math.min(startPage + divider - 1, totalPages);
    const pageList = [];
    for (let i = startPage; i <= endPage; i++) {
      pageList.push(i);
    }
    return pageList;
  }, [page, totalPages, divider]);

  return {
    onClickPage,
    onClickNext,
    onClickPrev,
    isLast,
    isFirst,
    page,
    pageList,
  };
};

export default usePaginator;

/*
const ExampleComponent = ({ totalElements }) => {
  const {
    onClickPage,
    onClickNext,
    onClickPrev,
    isLast,
    isFirst,
    page,
    pageList,
  } = usePaginator(totalElements, 1, 10);

  return (
    <div>
      <h1>Page {page}</h1>
      <div>
        <button onClick={onClickPrev} disabled={isFirst}>
          Previous
        </button>
        {pageList.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onClickPage(pageNum)}
            style={{ fontWeight: pageNum === page ? "bold" : "normal" }}
          >
            {pageNum}
          </button>
        ))}
        <button onClick={onClickNext} disabled={isLast}>
          Next
        </button>
      </div>
    </div>
  );
};
*/
