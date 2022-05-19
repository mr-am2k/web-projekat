import { bookActions } from './books-slice';

export const getBooks = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://ptf-web-dizajn-2022.azurewebsites.net/books'
      );
      if (!response.ok) {
        throw new Error('Could not fetch cart data');
      }
      const data = await response.json();
      return data;
    };
    try {
      const bookData = await fetchData();
      dispatch(bookActions.replaceBooks(bookData));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const addBook = (newBook) => {
  const newBookForSending = {
    name: newBook.name,
    genre: newBook.genre,
    image: newBook.image,
    authorId: newBook.author.id
  }
  return async (dispatch) => {
    const postData = async (dispatch) => {
      const response = fetch(
        'https://ptf-web-dizajn-2022.azurewebsites.net/books',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBookForSending),
        }
      );
      if ((await response).status !== 201 ) {
        throw new Error('Failed to post');
      }
    };
    try {
      await postData();
      await dispatch(bookActions.addNewBook(newBook));
    } catch (error) {
      console.log(error.message);
    }
  };
};