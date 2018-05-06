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
    BooksAPI.update(book, shelf).then(books => {
      BooksAPI.getAll().then((books) => {
        this.setState(() => ({
          books: books.map(book => {
            return {
              id: book.id,
              shelf: book.shelf,
              cover: book.imageLinks.thumbnail ? book.imageLinks.thumbnail : 'https://www.ascent-vape.com/wp-content/themes/focusmagazine_theme/focusmagazine/images/thumbnail-default.jpg',
              title: book.title ? book.title : 'no title',
              author: book.authors ? book.authors.join(', ') : 'Unknown'
            }
          })
        }))
      })
    });

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
