package org.hirusha.library.Repository;

import org.hirusha.library.Model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookRepo extends JpaRepository<Book, Integer> {
    Optional<Book> findByTitle(String title);
    List<Book> findBooksByAuthor(String author);
    boolean existsBookByIsbn(Integer isbn);

    @Query("SELECT b.quantity FROM Book b WHERE b.isbn = :isbn")
    int getQuantity(@Param("isbn") int isbn);
}
