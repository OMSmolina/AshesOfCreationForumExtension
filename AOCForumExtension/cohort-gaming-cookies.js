chrome.cookies.get({ url: 'https://forums.ashesofcreation.com' },
  function (cookie) {
    if (cookie) {
      console.log(cookie.value);
    }
    else {
      console.log('Can\'t get cookie! Check the name!');
    }
});