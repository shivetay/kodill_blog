'use strict'
{
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    
        /*[done] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');
        for (let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }

        /* [done] add class 'active' to the clicked link */
        clickedElement.classList.add('active');

        /*[done] remove class 'active' from all articles */
        const activePosts = document.querySelectorAll('.posts article.active');
        for (let activePost of activePosts){
            activePost.classList.remove('active');
        }

        /* [done] get 'href' attribute from the clicked link */
        const articleSelekctor = clickedElement.getAttribute('href');
        console.log(articleSelekctor);

        /* [done] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelekctor);
        console.log(targetArticle);

        /* [done] add class 'active' to the correct article */
        targetArticle.classList.add('active');
  }
  
/* TODO:
   FIXME: 
*/ 
  const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

        function generateTitleLinks(){
            /* remove content of titles */
            const titleList = document.querySelector(optTitleListSelector);
            titleList.innerHTML = '';

            let html ='';

            /* for each article */
            const articles = document.querySelectorAll(optArticleSelector);
            //console.log(articles);
            for(let article of articles){
                
                    /* get article id */
                const articleId = article.getAttribute('id');

                /* find the title element */
                const targetArticle = document.querySelector(articleId);
                //console.log(targetArticle);
                
                /* get the title from title element */
                const articleTitle = article.querySelector(optTitleSelector).innerHTML;
                
                /* create html of the link */
                const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
                //console.log(linkHTML);
            
                /* insert link in to the list */
                html += linkHTML; //html = html + linkhtml
                // console.log(html);
            }  
            titleList.innerHTML = html;

            //add event listeners to a elements
            const links = document.querySelectorAll('.titles a');
            console.log(links);
            
            for(let link of links){
                link.addEventListener('click', titleClickHandler);
            }
        }
    generateTitleLinks();
}