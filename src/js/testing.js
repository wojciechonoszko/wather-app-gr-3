const books = [
    {
      title: "The Last Kingdom",
      author: "Bernard Cornwell",
      rating: 8.38,
    },
    {
      title: "Beside Still Waters",
      author: "Robert Sheckley",
      rating: 8.51,
    },
    {
      title: "Sen śmiesznego człowieka",
      author: "Fiodor Dostojewski",
      rating: 7.75,
    },
  ];
console.log(books);
  for (const book of books) {
    // Obiekt książki
    console.log(book);
    // Tytuł
    console.log(book.title);
    // Autor
    console.log(book.author);
    // Ocena
    console.log(book.rating);
  }

  const bookNames = [];

for (const book of books) {
  bookNames.push(book.title);
}

console.log(bookNames); // ["The Last Kingdom", "Beside Still Waters", "Sen śmiesznego człowieka"]

let totalRating = 0;

for (const book of books) {
  totalRating += book.rating;
}

const averageRating = (totalRating / books.length).toFixed(1);
console.log(averageRating); // 8.2