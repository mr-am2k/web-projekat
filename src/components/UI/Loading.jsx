import { Box, Typography } from '@mui/material';
import classes from './Loading.module.css';
const Loading = () => {
  return (
    <Box component='div' className={classes['center-content']}>
      <Typography variant='h4'>Loading...</Typography>
    </Box>
  );
};
export default Loading;
