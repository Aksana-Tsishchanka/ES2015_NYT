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
        var mainDiv =  document.querySelector('div.main')

        var divContainer = document.createElement('div');
        divContainer.className = "flexbox-container";

        let { section, results : arrSections, copyright } = json;

        for(var objSection of arrSections) {
            divContainer.appendChild(createSection(objSection));
        }
        mainDiv.appendChild(divContainer);
        document.body.appendChild(createFooter(copyright));

    });


function createSection(objSection) {
    let { short_url, title, abstract, multimedia, copyright } = objSection;

    let sectionEl = document.createElement('div');
    sectionEl.className = 'introSection';

    let title-link = `<h2><a href=${short_url}>${title}</a></h2>`;

    let paragraf = `<p>${abstract}</p>`;

    let textContainer = document.createElement("div");
    textContainer.className = 'textContainer';
    textContainer.innerHTML = title-link + paragraf;

    sectionEl.appendChild(textContainer);

    if ( multimedia != null ) {
        addMedia(multimedia);
    }

    return sectionEl;
}

function addMedia(multimediaObj, format) {

//1 find obj wich contains necessary img
}

function createFooter(footerText) {
    var footer = document.createElement('footer');
    //processing regExp
    footer.textContent = footerText;
    return footer;
}

//1) Data formatting
//2) RegExp
//3) https://kadira.io/blog/other/top-es2015-features-in-15-minutes SPREADING for images
// https://github.com/lukehoban/es6features#generators
//http://es6-features.org/#DateTimeFormatting  check features