import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page,setPage]=useState(1)
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  document.title = `${capitalizeFirstLetter(props.category)}  - NewsMonkey`;

  const newsUpdate = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=090407eebcf74ec49aa96fbcb2cf4f93&${page}`;
    let data = await fetch(url);
    let res = await data.json();
    props.setProgress(30)
    setArticles(res.articles); // Update to res.articles
    setTotalResults(res.articles)
    props.setProgress(100)
  };
  
  useEffect(() => {
    newsUpdate();
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=090407eebcf74ec49aa96fbcb2cf4f93&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h2 className="text-center" style={{ margin: "35px 0px",marginTop:'90px'}}>
        NewsMonkey -{capitalizeFirstLetter(props.category)} Headlines
      </h2>
      <InfiniteScroll
    dataLength={articles.length}
    next={fetchMoreData}
    hasMore={articles.length !== totalResults}
    loader={<Spinner/>}
  >
      <div className="container">
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={
                    !element.urlToImage
                    ? "https://www.wspa.com/wp-content/uploads/sites/53/2023/07/IMG_2052.jpg?w=1280"
                    : element.urlToImage
                  }
                  url={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
</div>
</InfiniteScroll>

    </>
  );
};

// const News = (props) => {
//   const [articles, setArticles] = useState([]);

//   const newsUpdate=async()=>{
//     let url=`https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${props.api}`
//     let data = await fetch(url);
//     let res=await data.json()
//     setArticles(res)
//   }

//   useEffect(()=>{
//     newsUpdate();
//   },[])
//   return (
//     <>
//       <h2 className="text-center" style={{ margin: "35px 0px" }}>
//         Monkey - Top Headlines
//       </h2>
//       <div className="container">
//         <div className="row">
//           {articles.map((element) => {
//             return (
//               <div className="col-md-4" key={element.url}>
//               <NewsItem 
//               title={element.title}
//               description={element.description}
//               imageUrl={element.urlToImage}
//               url={element.url}
//               author={element.author}
//               />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

export default News;
