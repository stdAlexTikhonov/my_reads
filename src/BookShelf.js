import React, {Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
      this.props.onChange({ id: e.target.attributes.getNamedItem('data-id').value },e.target.value);
    }

    render() {
        const { books, onChange } = this.props;

        const title = {
            'currentlyReading': 'Currently Reading',
            'wantToRead': 'Want to Read',
            'read': 'Read'
        }
 
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{ books.length ? title[books[0].shelf] : '' }</h2>
            <div className="bookshelf-books">
              <ol className="books-grid"> 
                {
                    books.map((book, ind) => {
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



export default BookShelf
