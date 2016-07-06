const url = 'https://api.nytimes.com/svc/topstories/v2/travel.json?api-key=36379cbe64354a0e99d3a44d18aa101a';
const init = {
  method: 'GET',
  url,
};
const imageType = 'mediumThreeByTwo210';

function createImage(src, height, width, caption) {
  return `<img src=${src} height=${height} width=${width} title='${caption}' />`;
}

function getMedia(multimediaArr, flag) {
  return multimediaArr.filter(mediaObj => mediaObj.format === flag)[0];
}

function createFooter(footerText) {
  return `<footer>${footerText.replace('Copyright (c)', '©')}</footer>`;
}

function calculateDateFrom(seconds, difference, timeArr) {

  return timeArr.reduce((result, timeObj ) => {
    if (result) return result;

    const { infoText, numOfSeconds } = timeObj;
    const interval = Math.floor(seconds / numOfSeconds);

    if (interval >= 1) {
      result = difference <= 0 ? `in ${interval} ${infoText}` : `${interval} ${infoText} ago`;
    }
    return result;
  }, '');
}

function timeFrom(date) {
  const difference = new Date() - date;
  const seconds = Math.floor(Math.abs(difference) / 1000);
  const timeArr = [
    { infoText: 'years', numOfSeconds: 60 * 60 * 24 * 365 },
    { infoText: 'months', numOfSeconds: 60 * 60 * 24 * 30 },
    { infoText: 'days', numOfSeconds: 60 * 60 * 24 },
    { infoText: 'hours', numOfSeconds: 60 * 60 },
    { infoText: 'minutes', numOfSeconds: 60 },
  ];

  return calculateDateFrom(seconds, difference, timeArr) || 'Just now';
}

function createSection(objSection) {
  const { short_url: shortUrl, title, abstract, multimedia, byline,
      published_date: publishedDate } = objSection;

  let image = '';
  if (multimedia.length > 0) {
    const { url: src, height, width, type, caption } = getMedia(multimedia, imageType);
    if (type === 'image') {
      image = createImage(src, height, width, caption);
    }
  }

  const sectionEl = `<div class="intro-section">
                       <a href="${shortUrl}" >
                       <div>
                         ${image}
                         <div class='text-container'>
                            <h2>${title}</h2>
                            <p>${abstract}</p>
                            <span class='time'>${timeFrom(new Date(publishedDate))}</span>
                            <span class='author'> ${byline}</span>
                         </div>
                       </div>
                       </a>
                     </div>`;
  return sectionEl;
}

function addSections(json) {
  const { section, results: arrSections, copyright } = json;
  document.body.innerHTML = `<header>
                               <h1>The New York Times News</h1>
                               <h3>${section}</h3></header>
                               <div class='flexbox-container'>
                                 ${arrSections.reduce((result, el) => result + createSection(el),'')}</div>
                             ${createFooter(copyright)}`;
}

function processJson(json) {
  addSections(json);
}


fetch(url, init)
  .then(response => response.json())
  .then(processJson);
