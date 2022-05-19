import { authorActions } from './authors-slice';
export const getAuthors = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://ptf-web-dizajn-2022.azurewebsites.net/authors'
      );
      if (!response.ok) {
        throw new Error('Could not fetch cart data');
      }
      const data = await response.json();
      return data;
    };
    try {
      const authorData = await fetchData();
      dispatch(authorActions.replaceAuthors(authorData));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const addAuthor = (newAuthor) => {
  return async (dispatch) => {
    const postData = async () => {
      const response = await fetch(
        'https://ptf-web-dizajn-2022.azurewebsites.net/authors',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAuthor),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to post');
      }
    };
    try {
      await postData();
      await dispatch(authorActions.addNewAuthor(newAuthor));
    } catch (error) {
      console.log(error.message);
    }
  };
};
