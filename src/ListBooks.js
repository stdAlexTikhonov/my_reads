import React, {Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';
// import BookShelf from './BookShelf'

class ListBooks extends Component {


    render() {

        const { books, onChangeBookStatus } = this.props;

        const booksCR = books.filter(book => book.status === 'currentlyReading'),
              booksWR = books.filter(book => book.status === 'wantToRead'),
              booksR = books.filter(book => book.status === 'read');

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
}



export default ListBooks
