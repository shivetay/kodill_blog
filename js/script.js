'use strict'; {
    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;

        /*[done] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');
        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [done] add class 'active' to the clicked link */
        clickedElement.classList.add('active');

        /*[done] remove class 'active' from all articles */
        const activePosts = document.querySelectorAll('.posts article.active');
        for (let activePost of activePosts) {
            activePost.classList.remove('active');
        }

        /* [done] get 'href' attribute from the clicked link */
        const articleSelekctor = clickedElement.getAttribute('href');

        /* [done] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelekctor);

        /* [done] add class 'active' to the correct article */
        targetArticle.classList.add('active');
    };

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author';

    //customSelector = '' = serch option for tags
    function generateTitleLinks(customSelector = '') {
        /* remove content of titles */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        let html = '';

        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);

        for (let article of articles) {
            /* get article id */
            const articleId = article.getAttribute('id');

            /* find the title element 
            const targetArticle = document.querySelector(articleId);
            console.log(targetArticle);
            */

            /* get the title from title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* create html of the link */
            const linkHTML =
                '<li><a href="#' +
                articleId +
                '"><span>' +
                articleTitle +
                '</span></a></li>';

            /* insert link in to the list */
            html += linkHTML; //html = html + linkhtml
        }

        titleList.innerHTML = html;

        //add event listeners to a elements
        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }
    generateTitleLinks();

    function generateTags() {
        /*[done] find all articles */
        const allArticles = document.querySelectorAll(optArticleSelector);

        /* START LOOP: for every article: */
        for (let article of allArticles) {

            /*[done] find tags wrapper */
            const tagWraper = article.querySelector(optArticleTagsSelector);

            /*[done] make html variable with empty string */
            let html = '';

            /*[done] get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');

            /*[done] split tags into array */
            const articleTagsArr = articleTags.split(' ');

            /*[done] START LOOP: for each tag */
            for (let tag of articleTagsArr) {

                /* [done] generate HTML of the link */
                const tagHTML =
                    '<li><a href="#tag-' +
                    tag +
                    '">' +
                    tag +
                    '</a>' + "&nbsp;" + '</li>';

                /*[done] add generated code to html variable */
                html += tagHTML;
                /* END LOOP: for each tag */
            }
            /* FIXME:insert HTML of all the links into the tags wrapper */
            tagWraper.innerHTML = html;

            /* END LOOP: for every article: */

        }
    }
    generateTags();

    function tagClickHandler(event) {
        /*[done] prevent default action for this event */
        event.preventDefault();
        /*[done] make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;

        /*[done] make a new constant "href" and read the attribute "href" of the clicked element */
        const HREF = clickedElement.getAttribute('href');

        /*[done] make a new constant "tag" and extract tag from the "href" constant */
        const TAG = HREF.replace('#tag-', '');

        /*[done] find all tag links with class active */
        const activeTags = document.querySelectorAll('a[href="' + HREF + '"]');

        /*[done] START LOOP: for each active tag link */
        for (let activeTag of activeTags) {
            /*[done] remove class active */
            activeTag.classList.remove('active');
        }/* END LOOP: for each active tag link */

        /*[done] find all tag links with "href" attribute equal to the "href" constant */
        const targetTags = document.querySelectorAll(HREF);

        /* [done] START LOOP: for each found tag link */
            for (let targetTag of targetTags) {
                /*[done]  add class active */
                targetTag.classList.add('active');
            }/* END LOOP: for each found tag link */

        /* [done]execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + TAG + '"]');
    }

    function addClickListenersToTags() {
        /*[done] find all links to tags */
        const LINKS = document.querySelectorAll('.post-tags a');

        /* START LOOP: for each link */
        for (let link of LINKS) {
            /*[done] add tagClickHandler as event listener for that link */
            link.addEventListener('click', tagClickHandler)
        }
        /* END LOOP: for each link */
    }
    addClickListenersToTags();

    function generateAuthors(){
        /*[done] find all articles */
        const allArticles = document.querySelectorAll(optArticleSelector);

        /*[done] start loop for all articles */
        for (let article of allArticles){
            /*[done] find author warpper */
            const authorWraper = article.querySelector(optArticleAuthorSelector);
            
            /*[done] create empty html */
            let html = '';

            /*[done] get data from data-author attirbute */
            const articleAuthors = article.getAttribute('data-author');

            /*[done] create html <a> with author */
             const authorHTML =
             '<a href="#author-' +
             articleAuthors +
             '">' +
             articleAuthors +
             '</a>';

             /*[done]add generated html to html variable */
             html +=authorHTML;

            /*[done] inster html to all articles */
            authorWraper.innerHTML = html;
        }
    }
    generateAuthors();

}
