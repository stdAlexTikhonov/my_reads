import React, {Component } from 'react'

class BookShelf extends Component {

  

    state = {
        query: ''
    }

  
    render() {
        const { books } = this.props;

        const title = {
            'CR': 'Currently Reading',
            'WR': 'Want to Read',
            'R': 'Read'
        }
 
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{ title[books[0].status] }</h2>
            <div className="bookshelf-books">
              <ol className="books-grid"> 
                {
                    books.map((book, ind) => {
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



export default BookShelf