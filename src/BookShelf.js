import React, {Component } from 'react'

class BookShelf extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
      this.props.onChange({ id: e.target.attributes.getNamedItem('data-id').value },e.target.value);
    }

    render() {
        const { books } = this.props;

        const title = {
            'currentlyReading': 'Currently Reading',
            'wantToRead': 'Want to Read',
            'read': 'Read'
        }
 
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{ books.length ? title[books[0].status] : '' }</h2>
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
                              <select onChange={this.handleChange} data-id={book.id} value={book.status}>
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
