import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

function transform(book) {
  return {
    id: book.id,
    status: book.shelf,
    title: book.title ? book.title : 'Unknown',
    author: book.authors ? book.authors[0] : 'Unknown',
    cover: book.imageLinks ? book.imageLinks.thumbnail : null
  }
}

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    query: '',
    searched: [],
    books: [],
    showSearchPage: false
  }

  onChangeStatus = (e) => {
    let shelf = e.target.value,
        id = e.target.getAttribute('dataid');


    this.setState((prev)=>({
      books: prev.books.map(book => {
                      if (book.id === id) book.status = shelf;
                      return book
                  })
    }))

    BooksAPI.update({id: id}, shelf);
  }


  onChangeQuery = (e) => {
    let val = e.target.value;
    this.setState({
      query: val
    });

    BooksAPI.search(val !== '' ? val : ' ').then(books => {
      console.log(books);
      if (books.error) {
        books = [];
      }

      this.setState({
        searched: books.map(transform)
      })
      

    });
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {

      this.setState({
        books: books.map(transform)
      })
    });

  }

  render() {

    let booksCR = this.state.books.filter(book => book.status === 'currentlyReading'),
        booksWR = this.state.books.filter(book => book.status === 'wantToRead'),
        booksR = this.state.books.filter(book => book.status === 'read');

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={this.onChangeQuery} placeholder="Search by title or author" value={this.state.query}/>

              </div>
            </div>
            <div className="search-books-results">
                { this.state.searched.length ?  (<ol className="books-grid">
                  {
                            this.state.searched.map((book,i) => (
                              <li key={'cr' + i}>
                              <div className="book">
                                <div className="book-top">
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.cover}")` }}></div>
                                  <div className="book-shelf-changer">
                                    <select onChange={this.onChangeStatus} value={book.status} dataid={book.id}>
                                      <option disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.author}</div>
                              </div>
                            </li>
                            ))
                      }
                  </ol>) : (<div style={{color: 'red', fontStyle: 'italic'}} >Books not found</div>) }
             
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        booksCR.map((book,i) => (
                          <li key={'cr' + i}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.cover}")` }}></div>
                              <div className="book-shelf-changer">
                                <select onChange={(e) => { this.onChangeStatus(e) }} value={book.status} dataid={book.id}>
                                  <option disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.author}</div>
                          </div>
                        </li>
                        ))
                      }
                    
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        booksWR.map((book,i) => (
                          <li key={'cr' + i}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.cover}")` }}></div>
                              <div className="book-shelf-changer">
                                <select onChange={this.onChangeStatus} value={book.status} dataid={book.id}>
                                  <option disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.author}</div>
                          </div>
                        </li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        booksR.map((book,i) => (
                          <li key={'cr' + i}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.cover}")` }}></div>
                              <div className="book-shelf-changer">
                                <select onChange={this.onChangeStatus} value={book.status} dataid={book.id}>
                                  <option disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.author}</div>
                          </div>
                        </li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
