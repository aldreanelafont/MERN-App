
import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { removeBookId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const SavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  const dataUser = data?.me || {};



  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
     const { data } = await removeBook({
       variables: { bookId },
     });

     removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books for {dataUser.username} </h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {dataUser.savedBooks?.length
            ? `Viewing ${dataUser.savedBooks.length} saved ${dataUser.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {dataUser.savedBooks?.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;