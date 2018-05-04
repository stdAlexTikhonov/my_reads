import React, {Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
// import BookShelf from './BookShelf'

function ListBooks(props) {

    const { books, onChangeBookStatus } = props;

    const booksCR = books.filter(book => book.shelf === 'currentlyReading'),
          booksWR = books.filter(book => book.shelf === 'wantToRead'),
          booksR = books.filter(book => book.shelf === 'read');

    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf key={0} books={booksCR} onChange={onChangeBookStatus}/>
            <BookShelf key={1} books={booksWR} onChange={onChangeBookStatus}/>
            <BookShelf key={2} books={booksR} onChange={onChangeBookStatus}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )

}



export default ListBooks
