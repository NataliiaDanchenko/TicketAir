import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  LinearProgress,
  Tooltip,
  Box,
} from '@mui/material';

import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import FlightIcon from '@mui/icons-material/Flight';
import EventSeatIcon from '@mui/icons-material/EventSeat';

import type { IFlight } from '@/entities/types/flight';

import { formatTime } from '@/entities/utils/formatTime';
import { formatDate } from '@/entities/utils/formatDate';
import { getDuration } from '@/entities/utils/getDuration';

import { GoToFlights } from '@/features/ui/GoToFlights/GoToFlights';
import { Button } from '@/shared/ui/Button';
import { ErrorMess } from '@/shared/ui/ErrorMess';

type FlightCardProps = {
  flight: IFlight;
};

export const FlightCard = ({ flight }: FlightCardProps) => {
  const navigate = useNavigate();
  const {
    id,
    airline,
    from,
    to,
    departureTime,
    arrivalTime,
    price,
    terminal,
    gate,
    tickets,
  } = flight;

  const duration = getDuration(departureTime, arrivalTime);
  const occupancy = tickets.total > 0 ? (tickets.remaining / tickets.total) * 100 : 0;
  
  const handleClick = () => {
    if (flight?.id) {
      navigate(`/flights/${flight.id}`);
    } else {
      <ErrorMess message='flight.id не знайдено' action={<GoToFlights/>}/>;
    }
    navigate(`/flights/${flight.id}`);
  };

  return (
    <Card sx={{ borderRadius: 3, overflow: 'hidden', height: '100%'}} variant='outlined'>
      <CardHeader sx={{height: '10%'}}
        avatar={<FlightIcon />}
        title={
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            flexWrap='wrap'
          >
            <Typography variant='h6' noWrap>
              {airline}
            </Typography>
            <Chip size='small' label={id} variant='outlined' />
          </Stack>
        }
        subheader={
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            flexWrap='wrap'
          >
            <Typography variant='body2'>{formatDate(departureTime)}</Typography>
            <Typography variant='body2'>{formatDate(arrivalTime)}</Typography>
          </Stack>
        }
      />

      <CardContent>
        <Grid container spacing={2}>
          {/* Виліт */}
          <Grid item xs={12} sm={6}>
            <Stack spacing={1} sx={{ pl: 2, pb: 1 }}>
              <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                flexWrap='wrap'
              >
                <FlightTakeoffIcon fontSize='small' />
                <Typography variant='overline'>Виліт</Typography>
                <Typography variant='h5' lineHeight={1.1}>
                  {formatTime(departureTime)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {from}
                </Typography>
              </Stack>
              <Typography variant='body2' color='text.secondary'>
                Термінал {terminal} Gate {gate}
              </Typography>
            </Stack>
          </Grid>

          {/* Приліт */}
          <Grid item xs={12} sm={6}>
            <Stack spacing={1} sx={{ pl: 2, pb: 1 }}>
              <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                flexWrap='wrap'
              >
                <FlightLandIcon fontSize='small' />
                <Typography variant='overline'>Приліт</Typography>
                <Typography variant='h5' lineHeight={1.1}>
                  {formatTime(arrivalTime)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {to}
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* В дорозі */}
          <Grid
            item
            xs={12}
            sm={6}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              justifyContent='center'
            >
              <AccessTimeIcon fontSize='small' />
              <Typography variant='body2' pb={1}>
                В дорозі: {duration}
              </Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Ціна */}
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              justifyContent='center'
            >
              <Typography variant='body2'>Price</Typography>
              <Typography variant='h5'>${price}</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Кількість квитків */}
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              justifyContent='center'
            >
              <AirplaneTicketIcon fontSize='small' />
              <Typography variant='body2' pb={1}>
                Квитків: {tickets.remaining}/{tickets.total}
              </Typography>
            </Stack>

            <Tooltip title='Залишилося квитків'>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Box width='80%'>
                  <LinearProgress
                    variant='determinate'
                    value={occupancy}
                    sx={{ height: 8, borderRadius: 999 }}
                  />
                </Box>
              </Box>
            </Tooltip>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            flexWrap='wrap'
          >
            <Stack direction='row' spacing={1} alignItems='center' p={2}>
              <EventSeatIcon fontSize='small' />
              <Typography variant='body2' color='text.secondary'>
                Залишилося {tickets.remaining} місць
              </Typography>
            </Stack>
            <Chip size='small' label={`${from} → ${to}`} />
            <Chip
              size='small'
              color='primary'
              variant='outlined'
              label={airline}
            />
          </Stack>
        </Grid>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, justifyContent: 'flex-end' }}>
        <Button variant='contained' onClick={handleClick}>
          Обрати рейс
        </Button>
      </CardActions>
    </Card>
  );
};
