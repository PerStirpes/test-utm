const analytics = {
  track(label, obj) {
    return obj;
  },
};

test('Sends only official utm params as properties ', () => {
  const document = {
    location: {
      search:
        '?utm_source=google&utm_medium=medium&utm_term=keyword&utm_content=some%20content&utm_campaign=some%20campaign&utm_test=other%20value&utm_name=forest',
    },
  };

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

  expect(formatQs(document)).toEqual({
    content: 'some content',
    medium: 'medium',
    source: 'google',
    term: 'keyword',
    name: 'some campaign',
  });
});

test('Changes campaign to name', () => {
  const document = {
    location: {
      search: '?utm_campaign=simulator_push',
    },
  };

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

  expect(formatQs()).toEqual({
    name: 'simulator_push',
  });
});

test('Changes campaign to name & skips following name params', () => {
  const document = {
    location: {
      search: '?utm_campaign=simulator_push&utm_name=forest',
    },
  };

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

  expect(formatQs()).toEqual({
    name: 'simulator_push',
  });
});

test('returns, You passed in an empty string ', () => {
  const document = {
    location: {
      search: '',
    },
  };

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
  expect(formatQs(document)).toBe("You passed in an empty string ''");
});

test('skips first occurrence of name param', () => {
  const document = {
    location: {
      search: '?utm_name=forest&utm_campaign=simulator_push',
    },
  };

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

  expect(formatQs()).toEqual({
    name: 'simulator_push',
  });
});
