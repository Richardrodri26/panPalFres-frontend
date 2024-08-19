
import { IMetadataPagination } from '@/interfaces/pagination';
import { Fragment, useMemo, useState } from 'react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

interface numberState {
  value: number;
  setValue: (value: number) => void;
}

interface IPaginationTableProps {
  metaDataPagination: IMetadataPagination;
  skipState?: numberState;
  takeValue: number;
}

export const PaginationTable = ({ metaDataPagination, skipState, takeValue }: IPaginationTableProps) => {
  const [valuePagination, setValuePagination] = useState<number>(0)
  const defaultSkipState: numberState = { setValue: setValuePagination, value: valuePagination }
  const { value: skipValue, setValue: setSkip } = skipState || defaultSkipState;

  const pageNumbers = useMemo(() => {
    return Array.from({ length: metaDataPagination?.totalPages ?? 1 }, (_, i) => i + 1);
  }, [metaDataPagination?.totalPages]);

  const currentPage = metaDataPagination?.currentPage ?? 1;
  const totalPages = metaDataPagination?.totalPages ?? 1;

  const isFirstPage = currentPage == 1;
  const isLastPage = currentPage == totalPages;

  const nextPage = () => {
    if (isLastPage) return;

    setSkip((skipValue || 0) + (takeValue || 1))
  };

  const selectPage = (page: number) => {
    const toSkip = (page - 1) * (takeValue || 1)
    setSkip(toSkip < 0 ? 0 : toSkip)
  };

  const prevPage = () => {
    if (isFirstPage) return;
    setSkip((skipValue || 1) - (takeValue || 1))
  };

  const getPaginationItems = useMemo(() => {
    if (totalPages < 2) return [1];

    const leftEllipsis = currentPage > 3 ? [1, '...'] : [1, 2];

    const rightEllipsisDefault = totalPages == 0 ? [] : [totalPages];
    const rightEllipsis = currentPage < totalPages - 2 ? ['...', totalPages] : rightEllipsisDefault;

    const startRange = Math.max(1, currentPage - 1);
    const endRange = Math.min(currentPage + 1, totalPages);

    const visiblePages = pageNumbers.slice(startRange - 1, endRange);

    const combinedArray = [...leftEllipsis, ...visiblePages, ...rightEllipsis];
    const uniqueArray = combinedArray.filter((item, index) => combinedArray.indexOf(item) === index || item === '...');

    return uniqueArray;
  }, [currentPage, pageNumbers, totalPages]);

  return (

    <Pagination>
      <PaginationContent className='w-fit mr-auto'>
        <PaginationItem onClick={prevPage}>
          <PaginationPrevious href="#" />
        </PaginationItem>

        {
          getPaginationItems?.map((page, index) => (
            <Fragment key={index}>
              {
                page === "..."
                  ? (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                  : (
                    <PaginationItem onClick={() => selectPage(+page)}>
                      <PaginationLink href="#">{page}</PaginationLink>
                    </PaginationItem>
                  )
              }
            </Fragment>
          ))
        }



        <PaginationItem onClick={nextPage}>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
