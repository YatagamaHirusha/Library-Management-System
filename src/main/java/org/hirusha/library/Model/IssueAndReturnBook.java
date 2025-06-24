package org.hirusha.library.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity @Data
@NoArgsConstructor
@AllArgsConstructor
public class IssueAndReturnBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private User member;

    @ManyToOne
    private User issuer;

    private LocalDate issueDate;
    private LocalDate returnDate;

    @ManyToOne
    private Book book;

}
