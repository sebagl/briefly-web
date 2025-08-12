// hooks/useCategorizedBooks.js
import { useMemo } from 'react';

function useCategorizedBooks(books, progressData) {
  const categoriesMap = {
    // 'novedades': { position: 0, displayName: 'Novedades' },
    'aventuras': { position: 1, displayName: 'Aventuras y Exploración' },
    'filosofia': { position: 2, displayName: 'Filosofía y Pensamiento' },
    'ciencia-y-psicologia': { position: 3, displayName: 'Ciencia y psicología' },
    'desarrollo-personal': { position: 4, displayName: 'Desarrollo Personal' },
    'clasicos-universal': { position: 5, displayName: 'Clásicos de la Literatura Universal' },
    'misterio-y-terror': { position: 6, displayName: 'Misterio y Terror' },
    'infantiles': { position: 7, displayName: 'Fábulas y Cuentos Infantiles' },
    'cortos': { position: 8, displayName: 'Resúmenes' },
    'novela-historica': { position: 9, displayName: 'Novela Histórica' },
    'literatura-rusa': { position: 10, displayName: 'Literatura Rusa' },
    'literatura-latinoamericana': { position: 11, displayName: 'Literatura Latinoamericana' },
    'politica': { position: 12, displayName: 'Ensayos y Tratados Políticos' },
    'economia': { position: 13, displayName: 'Filosofía Política y Económica' },
    'ciencia-ficcion': { position: 14, displayName: 'Ciencia Ficción y Fantasía' },
    'novelas-romanticas': { position: 15, displayName: 'Novela Romántica' },
    'grandes-mujeres': { position: 16, displayName: 'Grandes Mujeres de la Literatura' },
    'literatura-britanica': { position: 17, displayName: 'Clásicos de la Literatura Británica' },
    'autores-destacados': { position: 18, displayName: 'Obras de Autores Destacados' },

    
    
  };

  const sortedBooks = useMemo(() => {
    const currentDate = new Date();
    const fifteenDaysInMilliseconds = 1000 * 60 * 60 * 24 * 15;

    let updatedBooks = books.map(book => {
      const createdAt = new Date(book.created_at);
      const dateDifference = currentDate - createdAt;

      if (dateDifference <= fifteenDaysInMilliseconds) {
        return { ...book, category: 'novedades' };
      } else {
        return book;
      }
    });

    const categories = books
      .map(value => value.category)
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort();

    const sortedBooks = categories.map((category) => {
      let categoryBooks = books.filter(book => book.category === category);

      const featuredBooks = categoryBooks.filter(
        (book) =>
          (book.is_featured === true)
      );

      let featuredBook = null;
      let featuredBookId = null;

      if (featuredBooks.length !== 0) {
        const randomIndex = Math.floor(Math.random() * featuredBooks.length);
        const randomBook = featuredBooks[randomIndex];

        featuredBook = randomBook;
        featuredBookId = randomBook.id;

        categoryBooks = categoryBooks.filter((book) => book.id !== featuredBookId);
      }

      // Use the categoriesMap to set the position and displayName
      return {
        position: categoriesMap[category]?.position,
        displayName: categoriesMap[category]?.displayName || category,
        books: categoryBooks,
        featuredBook: featuredBook
      };
    });

    // Create a new category based on progressData if it's not an empty object
    if (progressData && Object.keys(progressData).length > 0) {
      const inProgressBooks = books.filter(book => Object.keys(progressData).includes(book.slug));

      sortedBooks.unshift({
        position: 0,
        displayName: 'Sigue escuchando',
        books: inProgressBooks,
        featuredBook: null
      });
    }

    // Sort categories by position
    sortedBooks.sort((a, b) => a.position - b.position);

    return sortedBooks;
  }, [books]);

  return sortedBooks;
}

export default useCategorizedBooks;
