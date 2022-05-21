import { myBookActions } from './my-book-slice';
export const getMyBooks = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://web-projekat-714dd-default-rtdb.europe-west1.firebasedatabase.app/myBooks.json'
      );
      if (!response.ok) {
        throw new Error('Could not fetch myBooks data');
      }
      const data = await response.json();
      return data;
    };
    try {
      const myBookData = await fetchData();
      dispatch(myBookActions.replaceBooks(myBookData));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateMyBooks = (myBooksArray) => {
  return async (dispatch) => {
    const putData = async () => {
      const response = await fetch(
        'https://web-projekat-714dd-default-rtdb.europe-west1.firebasedatabase.app/myBooks.json',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(myBooksArray),
        }
      );
      if (!response.ok) {
        throw new Error('Could not fetch myBooks data');
      }
    };
    try {
      await putData();
      dispatch(myBookActions.replaceBooks(myBooksArray));
    } catch (error) {
      console.log(error.message);
    }
  };
};
