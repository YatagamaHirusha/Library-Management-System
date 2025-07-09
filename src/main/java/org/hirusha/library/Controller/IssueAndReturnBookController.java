package org.hirusha.library.Controller;

import lombok.AllArgsConstructor;
import org.hirusha.library.DTO.IssueRecord;
import org.hirusha.library.DTO.ReturnRecord;
import org.hirusha.library.Service.IssueAndReturnBookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/records")
public class IssueAndReturnBookController {
    private final IssueAndReturnBookService issueAndReturnBookService;

    @PostMapping("/issue")
    public ResponseEntity<?> issueBooks(@RequestBody IssueRecord issueRecord){
        return ResponseEntity.ok(issueAndReturnBookService.issueBook(issueRecord));
    }

    @PostMapping("/return")
    public ResponseEntity<?> returnBook(@RequestBody ReturnRecord returnRecord){
        return ResponseEntity.ok(issueAndReturnBookService.returnBook(returnRecord));
    }

    @GetMapping
    public ResponseEntity<?> viewIssueBooks(){
        return ResponseEntity.ok(issueAndReturnBookService.viewIssueBooks());
    }

    @GetMapping("/active")
    public ResponseEntity<?> viewActiveIssueRecords() {
        return ResponseEntity.ok(issueAndReturnBookService.viewActiveIssueRecords());
    }

    @GetMapping("/return/count")
    public Long getTotalIssuedBooks(){
        return issueAndReturnBookService.countBooksToBeReturned();
    }
}
