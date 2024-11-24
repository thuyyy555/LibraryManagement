package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Book;
import com.example.demo.model.User;
import com.example.demo.repository.BookRepository;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public Optional<Book> getBookById(int id) {
        return bookRepository.findById(id);
    }

    public void deleteBook(int id) {
        bookRepository.deleteById(id);
    }

    public Book updateBook(Book updatedBook) {
        Book existingBook = bookRepository.findById(updatedBook.getId())
            .orElseThrow(() -> new RuntimeException("Book not found with ID: " + updatedBook.getId()));

        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setQuantity(updatedBook.getQuantity());
        existingBook.setGenre(updatedBook.getGenre());
        return bookRepository.save(existingBook);
    }
}

