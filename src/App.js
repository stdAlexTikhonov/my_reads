import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.changeBookStatus = this.changeBookStatus.bind(this);
    // this.updateBooks = this.updateBooks.bind(this);
  }
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchResult: []
  }

  Search(query) {


  }

  changeBookStatus(book, shelf) {
    this.setState(prev => ({
      books: prev.books.map(item => {
        if (item.id === book.id) item.shelf = shelf;
        return item
      })
    }));
    BooksAPI.update(book, shelf).then(books => console.log('success'));

  }

  componentDidMount() {

    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books: books.map(book => {
          return {
            id: book.id,
            shelf: book.shelf,
            cover: book.imageLinks.thumbnail,
            title: book.title,
            author: book.authors ? book.authors.join(', ') : 'Unknown'
          }
        })
      }))
    })

   
  }


  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (<Search books={this.state.books} onChange={this.changeBookStatus} />) } />
        <Route exact path='/' render={() => {
          return (<ListBooks books={this.state.books} onChangeBookStatus={this.changeBookStatus}/>)
        }} />
      </div>
    )
  }
}

export default BooksApp
