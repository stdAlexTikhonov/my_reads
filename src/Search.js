import React, {Component } from 'react'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize';

class Search extends Component {

    handleChange = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, { hash: true});

        if (this.props.onSearch) {
            this.props.onSearch(values.query);
        }
    }

    
  
    render() {
      const { searchResult } = this.props;
    
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
                <form onSubmit={this.handleChange}>
                <input type="text" name='query' placeholder="Search by title or author"/>
                </form>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                    searchResult.map((book, ind) => {
                    return (
                        <li key={ind}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${book.cover}")` }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
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
