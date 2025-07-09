package org.hirusha.library.Repository;

import org.hirusha.library.Model.Book;
import org.hirusha.library.Model.IssueAndReturnBook;
import org.hirusha.library.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IssueAndReturnBookRepo extends JpaRepository<IssueAndReturnBook, Integer> {
    Optional<IssueAndReturnBook> findByMemberAndReturnDateIsNull(User member);

    @Query("SELECT irb.book FROM IssueAndReturnBook irb WHERE irb.returnDate IS null")
    List<Book> findAllIssueBooks();

    @Query("SELECT COUNT(irb) FROM IssueAndReturnBook irb WHERE irb.returnDate IS null")
    Long countBooksToBeReturned();

    @Query("SELECT irb FROM IssueAndReturnBook irb WHERE irb.returnDate IS null")
    List<IssueAndReturnBook> findAllActiveIssueRecords();
}
