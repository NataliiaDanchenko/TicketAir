import { type ReactNode } from 'react';
import { Box, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { contentStyle, style } from '@/shared/constants/stylesAppModal';

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const AppModal = ({ open, onClose, children }: AppModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={contentStyle}>{children}</Box>
      </Box>
    </Modal>
  );
};
