import React, {Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends Component {


    handleChange = (e) => {
      if (this.props.onSearch) {
        this.props.onSearch(e.target.value);
      }
    }

    

    
  
    render() {
      const { searchResult, onChange } = this.props;

    
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
                
                <input type="text" onChange={this.handleChange} name='query' placeholder="Search by title or author"/>
            

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                    searchResult.map((book, ind) => {
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
