export function cutText(text, maxTextLength) {
  if (text) {
    const snippet = text.substring(0, maxTextLength);
    return snippet + (text.length > maxTextLength ? '…' : '');
  }

  return '';
}

export function copyToClipboard(fullLink) {
  const aux = document.createElement('input');
  aux.setAttribute('value', fullLink);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  document.body.removeChild(aux);
}
