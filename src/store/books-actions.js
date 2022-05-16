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
