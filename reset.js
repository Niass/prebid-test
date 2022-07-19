setTimeout(() => {
  try {
    const iframes = document.querySelectorAll('iframe');
    console.log('iframes reset***', iframes);
    var style = document.createElement('style');
    style.textContent = 'body {' + '  margin: 0;' + '}';
    iframes.forEach((iframe) => {
      const body = iframe.querySelector('body');
      iframe.contentDocument.body.style.margin = 0
      console.log('iframe.contentDocument***', iframe.contentDocument.body)
      iframe.contentDocument.head.appendChild(style);
    });
  } catch (error) {
    console.log('iframe style error', error);
  }
}, 2000);
