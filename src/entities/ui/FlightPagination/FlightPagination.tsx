import { Stack, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button } from '@/shared/ui/Button';

// Сервер не повертає загальну кількість елементів, тому немає totalPage

interface IFlightPaginationProps {
  sizePage: number;
  currentPage: number;
  currentPageItemsCount: number;
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
}

export const FlightPagination = ({
  sizePage,
  currentPage,
  currentPageItemsCount,
  onPrev,
  onNext,
}: IFlightPaginationProps) => {

  const isLastPage = currentPageItemsCount < sizePage;

  return (
    <Stack
      direction='row'
      justifyContent='center'
      alignItems='center'
      spacing={2}
      py={2}
    >
      <Button variant='contained' disabled={currentPage === 1} onClick={onPrev}>
        <KeyboardArrowLeft />
      </Button>
      <Typography>Сторінка {currentPage}</Typography>
      <Button variant='contained' disabled={isLastPage} onClick={onNext}>
        <KeyboardArrowRight />
      </Button>
    </Stack>
  );
};
