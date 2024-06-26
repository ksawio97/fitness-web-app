import React, { useState, useEffect } from "react";
import './CSS/articlesView.css';
import SingleArticleView from "./singleArticleView";
import { findLastArticlesInfo } from "./api/article/ArticleRequests";

function ArticlesView() {
   const [articles, setArticles] = useState([]);
   const [selectedArticle, setSelectedArticle] = useState(null);

   useEffect(() => {
      findLastArticlesInfo()
         .then(data => setArticles(data))
         .catch(err => console.error(err));
   }, []);

 const handleClick = (article) => {
   let articleHTML = "<h1>Article</h1><div>This is <b>article</b> template</div>";
   setSelectedArticle(articleHTML);
 }

 return (
    <div id="right-panel" style={{ padding: "2%", width: "91%", color: "white"}}>
        {selectedArticle ? (
         <div>
           <div style={{width: "100%", textAlign: "left"}}>
            <i className="fa fa-arrow-circle-o-left fa-3x change-color-on-hover" onClick={() => {setSelectedArticle(null)}}></i>
          </div> 
          <SingleArticleView articleHTML={selectedArticle} />
        </div>
         ) : (
        <div className="arcticle-container">
         {articles.map((article, index) => (
            <div key={index} className="article-item" onClick={() => handleClick(article)}>
               <div className="preview" style={{height: "200px"}}>
                  <div><h3>{article.title}</h3></div>
               </div>
               <div class="author-bar">
                  <div style={{width: "70%"}}>
                     {article.author}
                  </div>
                  <div style={{width: "27%", paddingRight: "3%", textAlign: "right"}}>
                     {article.publishDate}
                  </div>
               </div>
            </div>
         ))
        }</div>
         )}
    </div>
 );

}

export default ArticlesView;