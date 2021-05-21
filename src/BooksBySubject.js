import axios from "axios";
import { useState, useEffect } from "react";

function BooksBySubject(subject, pagenumber) {
  const [isloading, setisloading] = useState(false);
  const [bookslist, setbookslist] = useState([]);
  const [hasmorebooks, sethasmorebooks] = useState(false);
  const page_size = 12;

  useEffect(() => {
   
    let cancel;
    setisloading(true);

    axios({
      method: "GET",
      url: `https://openlibrary.org/subjects/${subject}.json`,
      params: { offset: pagenumber * page_size },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {

        const books = res.data.works.map((work) => {
          return {
            title: work.title,
            isbn: work.hasOwnProperty("availability")
              ? work.availability.isbn
              : undefined,
            key: work.key,
          };
        });

        setbookslist((prevlist) => [...prevlist, ...books]);

        sethasmorebooks(
          (page_size * pagenumber + res.data.works.length < +res.data.work_count)
        );
        
        setisloading(false);


      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
            console.log(error)
      });

    return () => cancel();
  }, [subject, pagenumber]);


  return { bookslist, hasmorebooks, isloading };
}

export default BooksBySubject;

