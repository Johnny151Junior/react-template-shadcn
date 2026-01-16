export interface IPaginationControlProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  siblingCount?: number;
  className?: string;
}
