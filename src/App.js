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
    books: []
  }



  changeBookStatus(book, shelf) {
    let newBook = true; //flag for new books

    //does we have this book on shelf
    let books = this.state.books.map(item => {
      if (item.id === book.id) { 
        item.shelf = shelf; //change shelf
        newBook = false;
      } 
      return item
    })

    console.log(newBook);

    
    if (newBook) { //if it is new, get it from backend
      BooksAPI.get(book.id).then(book => {
        let obj = {
          id: book.id,
          shelf: book.shelf,
          title: book.title ? book.title : 'Unknown',
          author: book.authors ? book.authors[0] : 'Unknown',
          cover: book.imageLinks ? book.imageLinks.thumbnail : null
        }

        //doesnt work
        this.setState(prev => ({
          books: [obj].concat(prev.books)
        }));

        //DOESN't WORk
        // this.setState((prev) => {
        //   let books = prev.books;
        //   books.push(obj);
        //   return ({
        //     books: books
        //   })
        // }


      // );

      });

    } else { //else just change state
      this.setState({
        books: books
      });
    }

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
