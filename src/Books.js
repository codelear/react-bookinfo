import { useState, useCallback, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import BooksBySubject from "./BooksBySubject";
import BookInfo from "./BookInfo";
import modules from "./Books.module.css";
import BookDetails from "./BookDetails";

function Books(props) {
  const [pagenumber, setpagenumber] = useState(0);

  let { bookslist, hasmorebooks, isloading } = BooksBySubject(
    props.subject,
    pagenumber
  );

  const [work, setwork] = useState("");
  const [showinfo, setshowinfo] = useState(false);

  let { bookinfo, isinfoloading } = BookInfo(work);

  function getInfo(book) {
    setwork(book.key);
    toggleshowinfo();
  }

  function toggleshowinfo() {
    setshowinfo((prev) => !prev);

  }

  const observer = useRef();

  const lastbookref = useCallback(
    (node) => {
      if (isloading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasmorebooks) {
          setpagenumber((prevpagenumber) => prevpagenumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isloading, hasmorebooks]
  );

  return (
    <Container>
      <Container>
        <div className="row">
          {bookslist.map((book, index) => {
            return (
              <div
                className="col-sm-3 p-2 m-1 border"
                key={book.key}
                onClick={getInfo.bind(null, book)}
              >
                {index === bookslist.length - 1 && (
                  <div ref={lastbookref} id="last_book_entry" />
                )}
                <div>{book.title}</div>
                <img
                  src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                  alt={book.isbn}
                ></img>
              </div>
            );
          })}
        </div>
        {isloading && <div>loading...</div>}
      </Container>
      {showinfo && (
        <Container
          className={`${modules.front} ${modules.centerscreen} ${modules.expanding}`}
          onClick={toggleshowinfo}
        >
          <BookDetails info={bookinfo}></BookDetails>
        </Container>
      )}
    </Container>
  );
}

export default Books;
