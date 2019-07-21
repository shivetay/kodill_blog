'use strict';

{
    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        tagHtmlLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
        authorHtmlLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
        tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
        authorAllCloud: Handlebars.compile(document.querySelector('#template-authorCloud-link').innerHTML),
    }

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

    const OPT = {
        tagSize: {
            count: 5,
            classPrefix: '.tag-size-',
        },
    };
    const SELECT = {
        all: {
            articles: '.post',
        },
        article: {
            tags: '.post-tags .list',
            author: '.post-author',
            titles: '.post-title',
        },
        listOf: {
            titles: '.titles',
            tags: '.tags.list',
            authors: '.authors',
        },
    };

    //customSelector = '' = serch option for tags
    function generateTitleLinks(customSelector = '') {
        /* remove content of titles */
        const titleList = document.querySelector(SELECT.listOf.titles);
        titleList.innerHTML = '';

        let html = '';

        /* for each article */
        const articles = document.querySelectorAll(SELECT.all.articles + customSelector);

        for (let article of articles) {
            /* get article id */
            const articleId = article.getAttribute('id');

            /* find the title element 
            const targetArticle = document.querySelector(articleId);
            console.log(targetArticle);
            */

            /* get the title from title element */
            const articleTitle = article.querySelector(SELECT.article.titles).innerHTML;

            /* create html of the link */
            const linkHTMLData = { id: articleId, title: articleTitle };
            const linkHTML = templates.tagHtmlLink(linkHTMLData);
            // const linkHTML =
            //     '<li><a href="#' +
            //     articleId +
            //     '"><span>' +
            //     articleTitle +
            //     '</span></a></li>';

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

    function calculateTagsParams(tags) {
        /*[done] create obj with min and max value */
        const PARAMS = {
            max: 0,
            min: 999999
        }
        /*[done] loop thur all tags and count */
        for (let tag in tags) {
            if (tags[tag] > PARAMS.max) {
                PARAMS.max = tags[tag]
            } else {
                PARAMS.min = tags[tag]
            }
        }
        /*[done] return PARAMS objc */
        return PARAMS;
    }

    function calculateTagClass(count, params) {
        /*[done] reduce counte vaule */
        const normalizedCount = count - params.min;

        /*[done] reduce max value */
        const normalizedMax = params.max - params.min;

        /*[done] get % */
        const PERCENTAGE = normalizedCount / normalizedMax;

        /*[done] round down */
        const calssNumber = Math.floor(PERCENTAGE * (OPT.tagSize.count - 1) + 1);

        /*[done] return tag count value */
        return calssNumber;
    }

    function generateTags() {
        /* [NEW] create a new variable allTags with an empty array */
        let allTags = {};

        /*[done] find all articles */
        const allArticles = document.querySelectorAll(SELECT.all.articles);

        /*[done]  START LOOP: for every article: */
        for (let article of allArticles) {
            /*[done]  find tags wrapper */
            const tagWraper = article.querySelector(SELECT.article.tags);

            /*[done]  make html variable with empty string */
            let linkHTML = '';

            /*[done]  get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');

            /*[done]  split tags into array */
            const articleTagsArr = articleTags.split(' ');

            /*[done]  START LOOP: for each tag */
            for (let tag of articleTagsArr) {
                /* [done] generate HTML of the link */
                const tagHTMLData = { id: 'tag-' + tag, title: tag };
                const tagHTML = templates.articleLink(tagHTMLData);
                /*
                '<li><a href="#tag-' +
                tag +
                '">' +
                tag +
                '</a>' + "&nbsp;" + '</li>';*/

                /*[done] add generated code to html variable */
                linkHTML += tagHTML;

                /* [NEW] check if this link is NOT already in allTags */
                if (!allTags.hasOwnProperty(tag)) {
                    /* [NEW] add tag to allTags object */
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }
            }/*[done]  END LOOP: for each tag */

            /* insert HTML of all the links into the tags wrapper */
            tagWraper.innerHTML = linkHTML;

        } /* END LOOP: for every article: */

        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector(SELECT.listOf.tags);

        /* [NEW] add html from allTags to tagList */
        // tagList.innerHTML = allTags.join(' ');
        const tagsParams = calculateTagsParams(allTags);
        const allTagsData = { tags: [] };
        //let allTagsHTML = '';

        /* start loop for echa tag in allTags */
        for (let tag in allTags) {
            /*generate code of a link and add it allTagHTML */
            allTagsData.tags.push({
                tag: tag,
                count: allTags[tag],
                className: calculateTagClass(allTags[tag], tagsParams),
            });

            /*allTagsHTML += '<li>'  + '<a class="' + OPT.tagSize.classPrefix + calculateTagClass(allTags[tag], tagsParams) + '"' + 'href="#tag-' + tag + '">'+ tag + '</a>' + "&nbsp;" +'</li>'; */
        }/* end loop */
        /* add html from alltagsHTML */
        //tagList.innerHTML = allTagsHTML; 
        tagList.innerHTML = templates.tagCloudLink(allTagsData);
        console.log(allTagsData);
    }

    // function generateTags() {
    //     /*[done] find all articles */
    //     const allArticles = document.querySelectorAll(optArticleSelector);

    //     /* START LOOP: for every article: */
    //     for (let article of allArticles) {

    //         /*[done] find tags wrapper */
    //         const tagWraper = article.querySelector(optArticleTagsSelector);

    //         /*[done] make html variable with empty string */
    //         let html = '';

    //         /*[done] get tags from data-tags attribute */
    //         const articleTags = article.getAttribute('data-tags');

    //         /*[done] split tags into array */
    //         const articleTagsArr = articleTags.split(' ');

    //         /*[done] START LOOP: for each tag */
    //         for (let tag of articleTagsArr) {

    //             /* [done] generate HTML of the link */
    //             const tagHTML =
    //                 '<li><a href="#tag-' +
    //                 tag +
    //                 '">' +
    //                 tag +
    //                 '</a>' + "&nbsp;" + '</li>';

    //             /*[done] add generated code to html variable */
    //             html += tagHTML;
    //             /* END LOOP: for each tag */
    //         }
    //         /* insert HTML of all the links into the tags wrapper */
    //         tagWraper.innerHTML = html;

    //         /* END LOOP: for every article: */
    //     }
    // }
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
        const rLinks = document.querySelectorAll('.tags a');

        /* START LOOP: for each link */
        for (let link of LINKS) {
            /*[done] add tagClickHandler as event listener for that link */
            link.addEventListener('click', tagClickHandler);
        }
        /* END LOOP: for each link */
        /* loop for all tags on right side */
        for (let link of rLinks) {
            /*[done] add tagClickHandler as event listener for that link */
            link.addEventListener('click', tagClickHandler);
        }
    }
    addClickListenersToTags();

    function generateAuthors() {
        /* create allAuthors empty obj */
        let allAuthors = {};

        /*[done] find all articles */
        const allArticles = document.querySelectorAll(SELECT.all.articles);

        /*[done] start loop for all articles */
        for (let article of allArticles) {
            /*[done] find author warpper */
            const authorWraper = article.querySelector(SELECT.article.author);

            /*[done] create empty html */
            let html = '';

            /*[done] get data from data-author attirbute */
            const articleAuthors = article.getAttribute('data-author');

            /*[done] create html <a> with author */
            const authorHTMLData = { id: 'author-' + articleAuthors, title: articleAuthors };
            const authorHTML = templates.authorHtmlLink(authorHTMLData);
            /*
            const authorHTML =
             '<a href="#author-' +
             articleAuthors +
             '">' +
             articleAuthors +
             '</a>';*/

            /*[done]add generated html to html variable */
            html += authorHTML;

            /*check if author is in allAuthors */
            if (!allAuthors.hasOwnProperty(articleAuthors)) {
                allAuthors[articleAuthors] = 1;
            } else {
                allAuthors[articleAuthors]++;
            }
            /*[done] inster html to all articles */
            authorWraper.innerHTML = html;
        }/* end loop for each article */

        /* find list of authors in right column */
        const authorList = document.querySelector(SELECT.listOf.authors);

        /*add html for all author to author list */
        //const authorParams = calculateAuthorParams(allAuthors);
        //let allAuthorsHTML = '';
        const allAuthosrData = { authors: [] };

        /* loop for all authors in AllAuthors */
        for (let author in allAuthors) {
            /*generate html code for link author and add to alAuthor HTML*/
            allAuthosrData.authors.push({
                author: author,
                count: allAuthors[author],
            })
            /* allAuthorsHTML += '<li>' + '<a href="#author-' + author + '">' + author + '</a>' + ' (' + allAuthors[author] + ') ' + '</li>';*/
        }
        /* add html to right side */
        authorList.innerHTML = templates.authorAllCloud(allAuthosrData);
        console.log(allAuthosrData);
    }

    // function generateAuthors(){
    //     /*[done] find all articles */
    //     const allArticles = document.querySelectorAll(optArticleSelector);

    //     /*[done] start loop for all articles */
    //     for (let article of allArticles){
    //         /*[done] find author warpper */
    //         const authorWraper = article.querySelector(optArticleAuthorSelector);

    //         /*[done] create empty html */
    //         let html = '';

    //         /*[done] get data from data-author attirbute */
    //         const articleAuthors = article.getAttribute('data-author');

    //         /*[done] create html <a> with author */
    //          const authorHTML =
    //          '<a href="#author-' +
    //          articleAuthors +
    //          '">' +
    //          articleAuthors +
    //          '</a>';

    //          /*[done]add generated html to html variable */
    //          html +=authorHTML;

    //         /*[done] inster html to all articles */
    //         authorWraper.innerHTML = html;
    //     }
    // }
    generateAuthors();

    function authorClickHandler(event) {
        /*[done] prevent default action for handler */
        event.preventDefault();

        /*[done] assign "this" to const */
        const clickedElement = this;

        /*[done] read href value of clicked elemtn */
        const HREF = clickedElement.getAttribute('href');

        /*[done] extract author from href */
        const AUTHOR = HREF.replace('#author-', '');

        /*[done] find all authors links with acive */
        const activeAuthors = document.querySelectorAll('a[href="' + HREF + '"]');

        /*[done] loop for echa acitve author link */
        for (let activeAuthor of activeAuthors) {
            /*[done] remove class active */
            activeAuthor.classList.remove('active');
        }/* end loop */

        /*[done] get all author links with "href" of active "href" author*/
        const targetAuthors = document.querySelectorAll(HREF);

        /* [done] loop for each author link */
        for (let targetAuthor of targetAuthors) {
            /*[done] add active class */
            targetAuthor.classListadd('active');
        }/* end loop */

        /*[done] execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-author="' + AUTHOR + '"]');
    }

    function addClickListenersToAuthors() {
        /*[done] find all links to author collection */
        const LINKS = document.querySelectorAll('.post-author a');
        const rLinks = document.querySelectorAll('.authors a');

        /*[done] loop for each link */
        for (let link of LINKS) {
            /* add event handeler to links */
            link.addEventListener('click', authorClickHandler)
        }/* end loop */
        for (let link of rLinks) {
            link.addEventListener('click', authorClickHandler)
        }
    }
    addClickListenersToAuthors();
}
