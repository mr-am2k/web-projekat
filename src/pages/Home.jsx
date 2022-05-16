import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import classes from './Home.module.css';
const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
const Home = () => {
  const navigation = useNavigate();
  const books = useSelector((state) => state.books);
  const randomBook = getRandomItem(books.books);
  const moreInfoRedirectHandler = () => {
    navigation('/books/' + randomBook.id);
  };
  return (
    <Container>
      <Container className={classes['center-content']}>
        <Typography className={classes.quote} gutterBottom variant='h3'>
          Not all readers are leaders, but all leaders are readers
        </Typography>
      </Container>
      <Container className={classes['card-container']}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              onClick={moreInfoRedirectHandler}
              className={classes['card-media']}
              component='img'
              height='340'
              image={randomBook && randomBook.image} //Pri loadu stranice se ucitavaju podaci, te se slika samo prikazuje kad se podaci ucitaju, tj. kada random book postoji
              alt='Book picture'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {randomBook && randomBook.name}
              </Typography>
              <Typography variant='h5' color='text.secondary'>
                {randomBook && randomBook.author.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes['action-buttons']}>
            <Button
              onClick={moreInfoRedirectHandler}
              size='small'
              color='primary'
            >
              Vise informacija
            </Button>
            <Button size='small' color='primary'>
              Dodaj u moje knjige
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Container>
  );
};

export default Home;
