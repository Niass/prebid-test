setTimeout(() => {
  try {
    const iframes = document.querySelectorAll('iframe');
    console.log('iframes reset***', iframes);
    var style = document.createElement('style');
    style.textContent = 'body {' + '  margin: 0;' + '}';
    iframes.forEach((iframe) => {
      const body = document.querySelector('body');
      console.log('body***', body)
      iframe.contentDocument.head.appendChild(style);
    });
  } catch (error) {
    console.log('iframe style error', error);
  }
}, 2000);
