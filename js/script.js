'use strict'

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
  
  //add event listeners to a elements
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }