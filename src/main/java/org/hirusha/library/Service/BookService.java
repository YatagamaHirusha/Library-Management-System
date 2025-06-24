package org.hirusha.library.Service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hirusha.library.DTO.BookRequest;
import org.hirusha.library.Exception.BookNotFoundException;
import org.hirusha.library.Model.Book;
import org.hirusha.library.Model.User;
import org.hirusha.library.Repository.BookRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepo bookRepo;

    public List<Book> getAllBooks(){
        return bookRepo.findAll();
    }

    public Book getBookByIsbn(int isbn){
        return bookRepo.findById(isbn).orElseThrow(() -> new RuntimeException("Book not found."));
    }

//    public Optional<Book> getBookByIsbn(int isbn){
//        return bookRepo.findById(isbn);
//    }

    public Book getBookByTitle(String title){
        return bookRepo.findByTitle(title).orElseThrow(BookNotFoundException::new);
    }

    public List<Book> getBooksByAuthor(String author){
        List<Book> books = bookRepo.findBooksByAuthor(author);
        if(books.isEmpty()){
            throw new BookNotFoundException("No books found for author " + author + ".");
        }
        return books;
    }

    public Book addBook(BookRequest request){
        if(bookRepo.existsBookByIsbn(request.isbn())){
            Book existingBook = bookRepo.findById(request.isbn()).orElseThrow(BookNotFoundException::new);
            existingBook.updateQuantity(request.quantity());
            return bookRepo.save(existingBook);
        }
        Book book = new Book();
        book.setIsbn(request.isbn());
        book.setTitle(request.title());
        book.setQuantity(request.quantity());
        book.setGenre(request.genre());
        book.setAuthor(request.author());
        return bookRepo.save(book);
    }

    public Book updateBook(int isbn, BookRequest request){
        Book book = bookRepo.findById(isbn).orElseThrow(BookNotFoundException::new);
        if(book != null){
            book.setGenre(request.genre());
            book.setTitle(request.title());
            book.setAuthor(request.author());
            return bookRepo.save(book);
        }
        return null;
    }

    public void deleteBook(int isbn){
        bookRepo.deleteById(isbn);
    }

    public int getAvailableQuantity(int isbn){
        return bookRepo.getQuantity(isbn);
    }
}
