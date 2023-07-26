const content = document.querySelector('#content');

if (content) {
  const tables = document.querySelectorAll('table');

  tables.forEach((el) => {
    const div = document.createElement('div');
    div.style.overflowX = 'auto';
    div.style.position = 'relative';
    div.style.top = '-1.75rem';
    div.style.marginBottom = '-3.75rem';
    div.style.zIndex = '1';
    div.appendChild(el.cloneNode(true));
    content.replaceChild(div, el);
  });
}
