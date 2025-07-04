import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { IPaginationControlProps } from "./pagination.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const PaginationControl: React.FC<IPaginationControlProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  onPageSizeChange,
  className,
}) => {
  const DefaultPageSizes = [10, 20, 30, 40, 50];
  // The pagination logic now returns both the range and the total page count.
  const { paginationRange, totalPage } = useMemo(() => {
    const totalPage = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    let range: (string | number)[] = [];

    if (totalPageNumbers >= totalPage) {
      range = Array.from({ length: totalPage }, (_, i) => i + 1);
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPage - 2;

      const firstPageIndex = 1;
      const lastPageIndex = totalPage;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 3 + 2 * siblingCount;
        let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
        range = [...leftRange, "...", totalPage];
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = Array.from(
          { length: rightItemCount },
          (_, i) => totalPage - rightItemCount + i + 1
        );
        range = [firstPageIndex, "...", ...rightRange];
      } else if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = Array.from(
          { length: rightSiblingIndex - leftSiblingIndex + 1 },
          (_, i) => leftSiblingIndex + i
        );
        range = [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
      }
    }

    return { paginationRange: range, totalPage };
  }, [totalCount, pageSize, siblingCount, currentPage]);

  // This condition ensures the component doesn't render with invalid data.
  if (currentPage === 0 || !paginationRange) {
    return null;
  }

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);

  return (
    <div className="flex items-center justify-between p-4 border-t">
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPage}
      </span>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            {DefaultPageSizes.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>Per page</span>
      </div>
      <div className="flex  items-center gap-4">
        <Pagination className={className}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPrevious();
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {paginationRange.map((pageNumber, index) => {
              if (pageNumber === "...") {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(pageNumber as number);
                    }}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNext();
                }}
                className={
                  currentPage === totalPage
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
export default PaginationControl;
