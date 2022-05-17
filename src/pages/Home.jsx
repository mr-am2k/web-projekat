import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import classes from './Home.module.css';
import BookCard from '../components/UI/BookCard';
import Loading from '../components/UI/Loading'
const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const books = useSelector((state) => state.books);
  const randomBook = getRandomItem(books.books);
  useEffect(()=> { //Posto je ovo home page, pri otvaranju stranice treba ucitati podatke sto znaci da smo u load stanju, te kada se ucitaju podaci, napustamo loading stanje i prikazujemo podatke
    if(books && randomBook)
    setIsLoading(false)
  }, [books, randomBook])
  return (
    <Container>
      <Container className={classes['center-content']}>
        <Typography className={classes.quote} gutterBottom variant='h3'>
          Not all readers are leaders, but all leaders are readers
        </Typography>
      </Container>
      {isLoading && <Loading/>}
      {!isLoading && (
        <BookCard
          bookId={randomBook.id}
          height={340}
          bookImage={randomBook.image}
          bookName={randomBook.name}
          authorName={randomBook.author.name}
        />
      )}
    </Container>
  );
};

export default Home;