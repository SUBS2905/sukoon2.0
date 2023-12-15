export function formatDate(date) {
  const dateObject = new Date(date);

  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

export function parseHTML(encodedText) {
  const parser = new DOMParser();
  const decodedText = parser.parseFromString(encodedText, "text/html").body.textContent;
  return decodedText;
}
