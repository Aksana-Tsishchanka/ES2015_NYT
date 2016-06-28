const url = "https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=36379cbe64354a0e99d3a44d18aa101a";
const init = {
    url: url,
    method: 'GET',
};
const imageType = 'mediumThreeByTwo210';


fetch(url, init)
    .then(function(response) {
        return response.json();
    })
    .then(function(json){
        addSections(json);
    });


function addSections(json) {
    let { section, results : arrSections, copyright } = json;

    let divContainer = document.createElement('div');
    divContainer.className = 'flexbox-container';

    let header = document.querySelector('header');
    header.innerHTML += `<h3>${section}</h3>`;

    for (var objSection of arrSections) {
        divContainer.appendChild(createSection(objSection));
    }

    let mainDiv =  document.querySelector('div.main')
    mainDiv.appendChild(divContainer);

    document.body.appendChild(createFooter(copyright));
}



function createSection(objSection) {
    let { short_url, title, abstract, multimedia, byline, published_date } = objSection;

    let sectionEl = document.createElement('div');
    sectionEl.className = 'introSection';
    sectionEl.setAttribute('onclick',`window.location='${short_url}';`);

    let titleLink = `<h2>${title}</a></h2>`;
    let paragraf = `<p>${abstract}</p>`;
    let time = moment(published_date).fromNow();
    let signInfo =`<span class='time'>${time}</span><span class='author'> ${byline}</span>`;

    let textContainer = document.createElement("div");
    textContainer.className = 'textContainer';
    textContainer.innerHTML = titleLink + paragraf + signInfo;

    if ( multimedia.length > 0) {
        let { url, height, width, type, caption } = getMedia(multimedia, imageType);
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
