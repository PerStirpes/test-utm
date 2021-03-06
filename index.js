function formatQs() {
  const SUPPORTED_UTM = ['content', 'medium', 'name', 'term', 'source'];
  const output = {};
  let qs = document.location.search.substring(1); // Remove leading ?
  if (qs === '') return "You passed in an empty string ''";

  qs = qs.split('&');

  for (let i = 0; i < qs.length; i++) {
    // destructure out the keys and values
    const [key, value] = qs[i].split('=');

    let param;
    if (key.startsWith('utm_')) {
      param = key.slice(4);

      //a check for duplicate name params
      if (param in output) {
        console.log('param has a duplicate: ', param);
        continue;
      }

      // Segment products replace the tradional campaign param with name.
      if (param === 'campaign') param = 'name';

      // Check for the utm requested for by the question
      if (!SUPPORTED_UTM.includes(param)) continue;

      // decode chars
      const decodeUri = decodeURIComponent(value.replace(/\+/g, ' '));

      output[param.toLowerCase()] = decodeUri;
    }
  }
  return analytics.track('User Referred', output);
}

const analytics = {
  track: function logger(label, obj) {
    console.log(label, obj);
    return obj;
  },
};

const document = {
  location: {
    search:
      '?utm_source=google&utm_campaign=simulator_push&utm_content=trees&utm_name=forest',
  },
};

// document,
// analytics,
module.exports = formatQs;
