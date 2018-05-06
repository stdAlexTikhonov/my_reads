import React, {Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

    state = {
      query: '',
      searchResult: []
    }


    handleChange = (query) => {
      this.setState(() => ({
        query: query.trim()
      }))
      if (this.state.query === '') {
        this.setState(() => ({
          searchResult: []
        }))
      } else {
        BooksAPI.search(this.state.query)
        .then((books) => {
          console.log(books);
          if (books.length) {
  
            this.props.books.forEach(book_on_shelf => {
              books.forEach(book_in_search => {
                if (book_on_shelf.id === book_in_search.id) book_in_search.shelf = book_on_shelf.shelf;
              })
            });
  
            this.setState(() => ({
              searchResult: books.map(book => {
                return {
                  id: book.id,
                  shelf: book.shelf ? book.shelf : 'none',
                  cover: book.imageLinks.thumbnail ? book.imageLinks.thumbnail : 'https://www.ascent-vape.com/wp-content/themes/focusmagazine_theme/focusmagazine/images/thumbnail-default.jpg',
                  title: book.title ? book.title : 'no title',
                  author: book.authors ? book.authors.join(', ') : 'Unknown'
                }
              })
            }))
          } else {
            console.log(books);
          }
      
        }, (error) => this.setState({ searchResult: []}))
      }
    }

    

    
  
    render() {
      const { onChange } = this.props;

    
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                
                <input type="text" onChange={(event) => this.handleChange(event.target.value)} value={this.state.query} name='query' placeholder="Search by title or author"/>
            

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                    this.state.searchResult.map((book, ind) => {
                    return (
                        <li key={ind}>
                          <Book onChange={onChange} id={book.id} title={book.title} cover={book.cover} author={book.author} shelf={book.shelf}/>
                        </li>
                    )
                })
            }
              </ol>
            </div>
          </div>
        )
    }
}



export default Search
