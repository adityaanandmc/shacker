const phantom = require('phantom');

const TIMEOUT = 5000;
const headlessCrawl = (trackingId) => {
  let url = "https://www.17track.net/en/track?nums=";

  return new Promise(async (resolve, reject) => {

    if(!trackingId || trackingId == 0) {
      console.log("trackingId: Invalid");
      return reject("trackingId: Invalid");
    }

    const instance = await phantom.create();
    url = url + trackingId
    const page = await instance.createPage();

    const status = await page.open(url);

    setTimeout(async function(){
      const content = await page.property('content');
      await instance.exit();
      resolve(content);
    }, TIMEOUT);

  });
};

module.exports =  {
  headlessCrawl
}