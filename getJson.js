const url = "https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=36379cbe64354a0e99d3a44d18aa101a";
const init = {
    url: url,
    method: 'GET',
};


fetch(url, init)
    .then(function(response) {
        return response.json();
    })
    .then(function(json){
        paintSections(json);
    });


function paintSections(json) {
    var mainDiv =  document.querySelector('div.main')

    var divContainer = document.createElement('div');
    divContainer.className = 'flexbox-container';

    let { section, results : arrSections, copyright } = json;

    let header = document.querySelector('header');
    let headerSection = document.createElement('h3');
    headerSection.textContent = section;
    header.appendChild(headerSection);

    for (var objSection of arrSections) {
        divContainer.appendChild(createSection(objSection));
    }
    mainDiv.appendChild(divContainer);
    document.body.appendChild(createFooter(copyright));
}

function createSection(objSection) {
    let { short_url, title, abstract, multimedia, byline, published_date } = objSection;

    let sectionEl = document.createElement('div');
    sectionEl.className = 'introSection';

    let titleLink = `<h2><a href=${short_url}>${title}</a></h2>`;
    let paragraf = `<p>${abstract}</p>`;
    let time = moment(published_date).fromNow();
    let signInfo =`<span class='time'>${time}</span><span class='author'> ${byline}</span>`;

    let textContainer = document.createElement("div");
    textContainer.className = 'textContainer';
    textContainer.innerHTML = titleLink + paragraf + signInfo;

    if ( multimedia.length > 0) {
        let { url, height, width, type, caption } = getMedia(multimedia, 'mediumThreeByTwo210');
        if (type === 'image') {
         sectionEl.innerHTML = createImage(url, height, width, caption);
        }
    }
    sectionEl.appendChild(textContainer);
    return sectionEl;
}

function createImage(url, height, width, caption) {
    return `<img src=${url} height=${height} width=${width} title=${caption} />`;
}

function getMedia(multimediaArr, flag) {
    for (let i=0; i < multimediaArr.length; i++ ) {
        if (multimediaArr[i].format === flag) {
            return  multimediaArr[i];
        }
    }
}

function createFooter(footerText) {
    var footer = document.createElement('footer');
    footer.textContent = footerText.replace('Copyright (c)','©');
    return footer;
}

//1) Data formatting
//2) RegExp
//3) https://kadira.io/blog/other/top-es2015-features-in-15-minutes SPREADING for images
// https://github.com/lukehoban/es6features#generators
//http://es6-features.org/#DateTimeFormatting  check features