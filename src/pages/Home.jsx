import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import classes from './Home.module.css';
import BookCard from '../components/UI/BookCard';
import Loading from '../components/UI/Loading';

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const books = useSelector((state) => state.books.books);
  let randomBook = getRandomItem(books);
  useEffect(() => {
    console.log('0');
    if (books.length && randomBook) {
      setIsLoading(false);
    }
  }, [books, randomBook]);

  return (
    <Container>
      <Container className={classes['center-content']}>
        <Typography className={classes.quote} gutterBottom variant='h3'>
          "Not all readers are leaders, but all leaders are readers"
        </Typography>
      </Container>
      {isLoading && <Loading />}
      {!isLoading && (
        <BookCard
          bookId={randomBook.id}
          height={340}
          bookGenre={randomBook.genre}
          bookImage={randomBook.image}
          bookName={randomBook.name}
          authorName={randomBook.author.name}
          home={true}
        />
      )}
    </Container>
  );
};

export default Home;
