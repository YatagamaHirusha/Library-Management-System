package org.hirusha.library.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data @Entity
public class Book {
    @Id
    private int isbn;

    private int quantity;
    private String title;
    private String author;
    private String genre;

    public void updateQuantity(int QT){
        quantity = quantity + QT;
    }
}
