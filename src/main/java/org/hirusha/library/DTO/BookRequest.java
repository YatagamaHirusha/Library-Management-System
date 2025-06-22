package org.hirusha.library.DTO;

public record BookRequest(int isbn, String title, String author, String genre, int quantity) {
}
