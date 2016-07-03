const url = 'https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=36379cbe64354a0e99d3a44d18aa101a';
const init = {
  method: 'GET',
  url,
};
const imageType = 'mediumThreeByTwo210';

function createImage( src, height, width, caption) {
  return `<img src=${src} height=${height} width=${width} title='${caption}' />`;
}

function getMedia(multimediaArr, flag) {
  for (let i = 0; i < multimediaArr.length; i++) {
    if (multimediaArr[i].format === flag) {
      return multimediaArr[i];
    }
  }
}

function createFooter(footerText) {
  return `<footer>${footerText.replace('Copyright (c)', '©')}</footer>`;
}

function calculateDateFrom(seconds, difference, timeArr) {
  debugger;
  let result;
  for (let timeObj of timeArr) {
    let { infoText, numOfSeconds } = timeObj;
    let interval = Math.floor(seconds / numOfSeconds);

    if (interval >= 1) {
      result = difference <= 0 ? `in ${interval} ${infoText}` : `${interval} ${infoText} ago`;
      break;
    }
  }
  return result;
}

function timeFrom(date) {
  const difference = new Date() - date;
  const seconds = Math.floor(Math.abs(difference) / 1000);
  let timeArr = [
    { infoText: 'years', numOfSeconds: 31536000 },
    { infoText: 'months', numOfSeconds: 2592000 },
    { infoText: 'days', numOfSeconds: 86400 },
    { infoText: 'hours', numOfSeconds: 3600 },
    { infoText: 'minutes', numOfSeconds: 60 },
   ];

  return calculateDateFrom(seconds, difference, timeArr) || 'Just now';
}

function createSection(objSection) {
  const { short_url: shortUrl, title, abstract, multimedia, byline, published_date: publishedDate } = objSection;

  const titleLink = `<h2>${title}</h2>`;
  const paragraph = `<p>${abstract}</p>`;
  const timeAgo = timeFrom(new Date(publishedDate));
  const signInfo = `<span class='time'>${timeAgo}</span><span class='author'> ${byline}</span>`;

  const textContainer = `<div classname='textContainer'>${titleLink} ${paragraph} ${signInfo}</div>`;
  let image;
  if (multimedia.length > 0) {
    const { url: src, height, width, type, caption } = getMedia(multimedia, imageType);
    if (type === 'image') {
      image = createImage(src, height, width, caption);
    }
  }
  const eventAction = `window.location='${shortUrl}';`;
  const sectionEl =`<div class="introSection" onclick=${eventAction}>${image} ${textContainer}</div>`;
  return sectionEl;
}

function addSections(json) {
  const { section, results: arrSections, copyright } = json;

  const header = `<header><h1>The New York Times News</h1>
                    <h3>${section}</h3></header>`;

  let allSections = '';

  for (let objSection of arrSections) {
    allSections += createSection(objSection);
  }

  const divContainer = `<div class='flexbox-container'>${allSections}</div>`;
  const footer = createFooter(copyright);

  document.body.innerHTML = `${header} ${divContainer} ${footer}`;
}

function processJson(json) {
  addSections(json);
}


fetch(url, init)
  .then(response => response.json())
  .then(processJson);
