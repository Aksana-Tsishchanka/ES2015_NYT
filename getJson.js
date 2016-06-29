const url = 'https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=36379cbe64354a0e99d3a44d18aa101a';
/* noinspection Eslint */
const init = {
  method: 'GET',
  url
};
const imageType = 'mediumThreeByTwo210';

function createImage(src, height, width, caption) {
  return `<img src=${src} height=${height} width=${width} title=${caption} />`;
}

function getMedia(multimediaArr, flag) {
  for (let i = 0; i < multimediaArr.length; i++) {
    if (multimediaArr[i].format === flag) {
      return multimediaArr[i];
    }
  }
}

function createFooter(footerText) {
  const footer = document.createElement('footer');
  footer.textContent = footerText.replace('Copyright (c)', '©');
  return footer;
}

function createSection(objSection) {
  const { short_url: shortUrl, title, abstract, multimedia, byline, published_date } = objSection;
  const sectionEl = document.createElement('div');
  sectionEl.className = 'introSection';
  sectionEl.setAttribute('onclick', `window.location='${shortUrl}';`);

  const titleLink = `<h2>${title}</a></h2>`;
  const paragraf = `<p>${abstract}</p>`;
  //const time = timeFrom(published_date);
  const signInfo = `<span class='time'>${time}</span><span class='author'> ${byline}</span>`;

  const textContainer = document.createElement('div');
  textContainer.className = 'textContainer';
  textContainer.innerHTML = titleLink + paragraf + signInfo;

  if (multimedia.length > 0) {
    const { url: src, height, width, type, caption } = getMedia(multimedia, imageType);
    if (type === 'image') {
      sectionEl.innerHTML = createImage(src, height, width, caption);
    }
  }
  sectionEl.appendChild(textContainer);
  return sectionEl;
}

function addSections(json) {
  const { section, results: arrSections, copyright } = json;

  const divContainer = document.createElement('div');
  divContainer.className = 'flexbox-container';

  const header = document.querySelector('header');
  header.innerHTML += `<h3>${section}</h3>`;

  for (let objSection of arrSections) {
    divContainer.appendChild(createSection(objSection));
  }

  const mainDiv = document.querySelector('div.main')
  mainDiv.appendChild(divContainer);

  document.body.appendChild(createFooter(copyright));
}

function processJson(json) {
  addSections(json);
}

function success(response) {
  return response.json();
}

fetch(url, init)
  .then(success)
  .then(processJson);








