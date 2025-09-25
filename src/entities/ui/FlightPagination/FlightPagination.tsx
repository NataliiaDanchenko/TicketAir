import { Stack, Pagination } from '@mui/material';

interface IFlightPaginationProps {
  sizePage: number; 
  currentPage: number; 
  totalItems?: number; 
  totalPages?: number; 
  onPageChange: (page: number) => void;
}

export const FlightPagination = ({
  sizePage,
  currentPage,
  totalItems,
  totalPages,
  onPageChange,
}: IFlightPaginationProps) => {
  const pagesCount = totalPages ?? Math.ceil((totalItems ?? 35) / sizePage);

  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Stack direction='row' justifyContent='center' alignItems='center' py={2}>
      <Pagination
        count={pagesCount}
        page={currentPage}
        onChange={handleChange}
        color='primary'
        shape='rounded'
      />
    </Stack>
  );
};

