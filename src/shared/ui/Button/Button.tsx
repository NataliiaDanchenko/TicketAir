import React, { memo, useMemo } from 'react';
import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import type { SvgIconComponent } from '@mui/icons-material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';

export type ButtonType = 'viewDetails' | 'addToCart' | 'pay' | 'delete';

interface IButtonProps extends Omit<MuiButtonProps, 'startIcon'> {
  buttonType?: ButtonType;
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button = memo(({
  buttonType,
  label,
  children,
  onClick,
  ...props
}: IButtonProps) => {
  const { buttonLabel, color, variant, StartIcon } = useMemo(() => {
    let lbl = label;
    let clr: MuiButtonProps['color'] = 'primary';
    let varnt: MuiButtonProps['variant'] = 'contained';
    let Icon: SvgIconComponent | undefined;

    switch (buttonType) {
      case 'viewDetails':
        lbl = lbl || 'Дивитися леталі рейсу';
        clr = 'primary';
        Icon = VisibilityIcon;
        break;
      case 'addToCart':
        lbl = lbl || 'Додати до корзини';
        clr = 'secondary';
        Icon = AddShoppingCartIcon;
        break;
      case 'pay':
        lbl = lbl || 'Оплатити';
        clr = 'success';
        Icon = PaymentIcon;
        break;
      case 'delete':
        lbl = lbl || 'Видалити';
        clr = 'error';
        varnt = 'outlined';
        Icon = DeleteIcon;
        break;
    }

    return { buttonLabel: lbl, color: clr, variant: varnt, StartIcon: Icon };
  }, [buttonType, label]);

  return (
    <MuiButton
      color={color}
      variant={variant}
      startIcon={StartIcon ? <StartIcon /> : undefined}
      onClick={onClick}
      {...props}
    >
      {children || buttonLabel}
    </MuiButton>
  );
});
