ankurversion().then(function (value) {
  console.log(value); // You can do something with the returned value here
});

async function ankurversion() {
  var clickId = getCookie('userjournies');

  if (!clickId || clickId === '') clickId = uuidv4();

  var expires = new Date(Date.now() + 30 * 86400 * 1000).toUTCString();
  document.cookie = 'userjournies=' + clickId + '; expires=' + expires + 86400 + ';path=/;';

  var data = {
    url: window.location.href,
    referrer: "https://divyanshgupta.in",
    unique_id: clickId,
  };

  try {
    const response = await fetch('https://userjournies.com/trackk/user', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Assuming the response contains some relevant information
    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function getCookie(cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}