package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.BookService;
import com.example.demo.model.Book;


@RestController
@RequestMapping("/books")
public class BookController {
    private static final String IMAGE_UPLOAD_DIR = "/demo/src/main/java/com/example/public/images/";
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @PostMapping("/add")
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    @PostMapping("/edit")
    public ResponseEntity<Book> updateBook(@RequestBody Book updatedBook) {
        Book book = bookService.updateBook(updatedBook);
        return ResponseEntity.ok(book);
    }

    @PostMapping("/delete/{id}")
    public void deleteBook(@PathVariable int id) {
        bookService.deleteBook(id);
    } 
}

