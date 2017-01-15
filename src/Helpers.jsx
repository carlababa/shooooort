function cutText(text, maxTextLength) {
  if (text) {
    const snippet = text.substring(0, maxTextLength);
    return snippet + (text.length > maxTextLength ? '…' : '');
  }

  return '';
}

export default cutText;
