package org.hirusha.library.Service;

import lombok.AllArgsConstructor;
import org.hirusha.library.DTO.IssueRecord;
import org.hirusha.library.DTO.ReturnRecord;
import org.hirusha.library.Exception.BookNotFoundException;
import org.hirusha.library.Exception.NoRecordFound;
import org.hirusha.library.Exception.UserNotFoundException;
import org.hirusha.library.Model.Book;
import org.hirusha.library.Model.IssueAndReturnBook;
import org.hirusha.library.Model.User;
import org.hirusha.library.Repository.BookRepo;
import org.hirusha.library.Repository.IssueAndReturnBookRepo;
import org.hirusha.library.Repository.UserRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class IssueAndReturnBookService {
    private final IssueAndReturnBookRepo issueAndReturnBookRepo;
    private final BookRepo bookRepo;
    private final UserRepo userRepo;

    public ResponseEntity<IssueAndReturnBook> issueBook(IssueRecord issueRecord) {
        IssueAndReturnBook record = new IssueAndReturnBook();
        Book book = bookRepo.findById(issueRecord.isbn()).orElseThrow(BookNotFoundException::new);
        record.setBook(book);
        book.updateQuantity(-1);
        record.setIssuer(userRepo.findById(issueRecord.issuer_id()).orElseThrow(() -> new RuntimeException("User not found.")));
        record.setMember(userRepo.findByUsername(issueRecord.username()).orElseThrow(UserNotFoundException::new));
        record.setIssueDate(LocalDate.now());
        return ResponseEntity.ok(issueAndReturnBookRepo.save(record));
    }

    public ResponseEntity<?> returnBook(ReturnRecord returnRecord) {
        User member = userRepo.findByUsername(returnRecord.username()).orElseThrow(UserNotFoundException::new);
        IssueAndReturnBook record = issueAndReturnBookRepo.findByMemberAndReturnDateIsNull(member).orElseThrow(NoRecordFound::new);
        record.setReturnDate(LocalDate.now());
        record.getBook().updateQuantity(1);
        return ResponseEntity.ok(issueAndReturnBookRepo.save(record));
    }

    public ResponseEntity<List<Book>> viewIssueBooks(){
        return ResponseEntity.ok(issueAndReturnBookRepo.findAllIssueBooks());
    }
}


