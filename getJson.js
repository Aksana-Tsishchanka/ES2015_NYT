let url = "https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=36379cbe64354a0e99d3a44d18aa101a";
let init = {
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

    let linkToArticle = document.createElement('a');
    linkToArticle.href = short_url;
    linkToArticle.textContent = title;

    let h2 = document.createElement("h2");
    h2.appendChild(linkToArticle);

    let paragraf = document.createElement('p');
    paragraf.textContent = abstract;

    sectionEl.appendChild(h2)
    sectionEl.appendChild(paragraf);

    if ( multimedia != null ) {

    }

    return sectionEl;
}

function addMedia(multimediaObj) {

}

function createFooter(footerText) {
    var footer = document.createElement('footer');
    //processing regExp
    footer.textContent = footerText;
    return footer;
}