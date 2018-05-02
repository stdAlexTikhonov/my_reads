import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [
      {
        status: 'CR',
        cover: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee'
      },
      {
        status: 'CR',
        cover: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',
        title:'Ender\'s Game',
        author: 'Orson Scott Card'
      },
      {
        status: 'WR',
        cover: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
        title: '1776',
        author: 'David McCullough'
      },
      {
        status: 'WR',
        cover: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api',
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling'
      },
      {
        status: 'R',
        cover: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien'
      },
      {
        status: 'R',
        cover: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api',
        title: 'Oh, the Places You\'ll Go!',
        author: 'Seuss'
      },
      {
        status: 'R',
        cover: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api',
        title: 'The Adventures of Tom Sawyer',
        author: 'Mark Twain'
      }
    ],
    searchResult: [
      {
        status: 'CR',
        cover: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee'
      },
      {
        status: 'CR',
        cover: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',
        title:'Ender\'s Game',
        author: 'Orson Scott Card'
      },
      {
        status: 'WR',
        cover: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
        title: '1776',
        author: 'David McCullough'
      },
      {
        status: 'WR',
        cover: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api',
        title: 'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling'
      },
      {
        status: 'R',
        cover: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien'
      },
      {
        status: 'R',
        cover: 'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api',
        title: 'Oh, the Places You\'ll Go!',
        author: 'Seuss'
      },
      {
        status: 'R',
        cover: 'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api',
        title: 'The Adventures of Tom Sawyer',
        author: 'Mark Twain'
      }
    ]
  }

  Search(query) {
    console.log(query);
    BooksAPI.search(query)
      .then((books) => {
        console.log(books);
        this.setState(() => ({
          searchResult: books.map(book => {
            return {
              id: book.id,
              status: 'N',
              cover: book.imageLinks.thumbnail,
              title: book.title,
              author: book.authors ? book.authors.join(', ') : 'Unknown'
            }
          })
        }))
          //         allowAnonLogging :false
          // authors:(2) ["Stuart Jonathan Russell", "Peter Norvig"]
          // averageRating
          // :
          // 4.5
          // canonicalVolumeLink
          // :
          // "https://books.google.com/books/about/Artificial_Intelligence.html?hl=&id=8jZBksh-bUMC"
          // categories
          // :
          // ["Computers"]
          // contentVersion
          // :
          // "preview-1.0.0"
          // description
          // :
          // "Artificial intelligence: A Modern Approach, 3e,is ideal for one or two-semester, undergraduate or graduate-level courses in Artificial Intelligence. It is also a valuable resource for computer professionals, linguists, and cognitive scientists interested in artificial intelligence. The revision of this best-selling text offers the most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence."
          // id
          // :
          // "8jZBksh-bUMC"
          // imageLinks
          // :
          // {smallThumbnail: "http://books.google.com/books/content?id=8jZBksh-b…C&printsec=frontcover&img=1&zoom=5&source=gbs_api", thumbnail: "http://books.google.com/books/content?id=8jZBksh-b…C&printsec=frontcover&img=1&zoom=1&source=gbs_api"}
          // industryIdentifiers
          // :
          // (2) [{…}, {…}]
          // infoLink
          // :
          // "http://books.google.com/books?id=8jZBksh-bUMC&dq=artificial+intelligence&hl=&source=gbs_api"
          // language
          // :
          // "en"
          // maturityRating
          // :
          // "NOT_MATURE"
          // pageCount
          // :
          // 1132
          // previewLink
          // :
          // "http://books.google.com/books?id=8jZBksh-bUMC&q=artificial+intelligence&dq=artificial+intelligence&hl=&cd=1&source=gbs_api"
          // printType
          // :
          // "BOOK"
          // publishedDate
          // :
          // "2010"
          // publisher
          // :
          // "Prentice Hall"
          // ratingsCount
          // :
          // 10
          // readingModes
          // :
          // {text: false, image: false}
          // subtitle
          // :
          // "A Modern Approach"
          // title
          // :
          // "Artificial Intelligence"
      })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => {
          return (<Search onSearch={(query) => {
            this.Search(query);
          }}
          searchResult={this.state.searchResult} />)
        }} />
        <Route exact path='/' render={() => {
          return (<ListBooks books={this.state.books} />)
        }} />
      </div>
    )
  }
}

export default BooksApp
