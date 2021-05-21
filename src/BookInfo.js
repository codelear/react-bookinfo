import axios from "axios";
import { useState, useEffect } from "react";

function BookInfo(work) {
  const [isloading, setisloading] = useState(false);
  const [bookinfo, setbookinfo] = useState();


  useEffect(() => {
    let cancel;

    setisloading(true);

    axios({
      method: "GET",
      url: `https://openlibrary.org${work}.json`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {

        console.log(res);  
        let info={
            description: res.data.hasOwnProperty("description") ? (res.data.description.hasOwnProperty("value") ? res.data.description.value : res.data.description) : "", 
            title: res.data.title,
            author: res.data.hasOwnProperty("authors") ? res.data.authors[0].author.key : undefined,
        };

        setbookinfo(prev=>info);

        setisloading(false);

      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        console.log(error)
      });

    return () => cancel();
  }, [work]);


  return { bookinfo, isloading };
}

export default BookInfo;

