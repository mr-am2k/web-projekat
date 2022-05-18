import {
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import classes from './BookCard.module.css';
const BookCard = (props) => {
  const navigation = useNavigate();
  const moreInfoRedirectHandler = () => {
    navigation('/books/' + props.bookId);
  };
  return (
    <Container className={classes['card-container']}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            onClick={moreInfoRedirectHandler}
            className={classes['card-media']}
            component='img'
            height={props.height}
            image={props.bookImage} //Pri loadu stranice se ucitavaju podaci, te se slika samo prikazuje kad se podaci ucitaju, tj. kada random book postoji
            alt='Book picture'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {props.bookName}
            </Typography>
            <Typography variant='h5' color='text.secondary'>
              {props.authorName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes['action-buttons']}>
          <Button
            className={classes['mui-button']}
            onClick={moreInfoRedirectHandler}
            size='small'
            color='primary'
          >
            Vise informacija
          </Button>
          <Button
            className={classes['mui-button']}
            size='small'
            color='primary'
          >
            Dodaj u moje knjige
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default BookCard;
