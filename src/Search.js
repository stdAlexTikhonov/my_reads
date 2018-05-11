import React, {Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

function transform(book) {
  return {
    id: book.id,
    status: book.shelf,
    title: book.title ? book.title : 'Unknown',
    author: book.authors ? book.authors[0] : 'Unknown',
    cover: book.imageLinks ? book.imageLinks.thumbnail : null
  }
}

class Search extends Component {

    state = {
      query: '',
      searched: []
    }


 
    onChangeQuery = (e) => {
      let val = e.target.value;
      this.setState({
        query: val
      });
      console.log(val);
  
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
                
                <input type="text" onChange={this.onChangeQuery} value={this.state.query} name='query' placeholder="Search by title or author"/>
            

              </div>
            </div>
            <div className="search-books-results">
              {this.state.searched.length > 0 ? (<div style={{ color: 'green'}}>{this.state.searched.length} books found</div>) : this.state.query === '' ? '' :(<div style={{ color: 'red', fontStyle: 'italic'}}>Books not found</div>)}
              <ol className="books-grid">
              {
                    this.state.searched.map((book, ind) => {
                    return (
                        <li key={book.id}>
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
