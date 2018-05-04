import React, {Component } from 'react'

class Book extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.cover = props.cover;
        this.shelf = props.shelf;
        this.title = props.title;
        this.author = props.author;
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange({ id: this.id },e.target.value);
    }

  
    render() {
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url("${this.cover}")` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={this.handleChange} data-id={this.id} value={this.shelf}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.title}</div>
                <div className="book-authors">{this.author}</div>
            </div>
        );
    }

}

export default Book