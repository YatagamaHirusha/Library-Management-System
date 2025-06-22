package org.hirusha.library.Controller;

import lombok.AllArgsConstructor;
import org.hirusha.library.DTO.BookRequest;
import org.hirusha.library.Model.Book;
import org.hirusha.library.Service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@AllArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks(){
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<Book> getBookByIsbn(@PathVariable int isbn){
        return ResponseEntity.ok(bookService.getBookByIsbn(isbn));
    }

    @GetMapping("/{title}")
    public ResponseEntity<Book> getBookByTitle(@PathVariable String title){
        return ResponseEntity.ok(bookService.getBookByTitle(title));
    }

    @GetMapping("/{author}")
    public ResponseEntity<List<Book>> getBooksByAuthor(@PathVariable String author){
        return ResponseEntity.ok(bookService.getBooksByAuthor(author));
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody BookRequest request){
        return ResponseEntity.ok(bookService.addBook(request));
    }
}
