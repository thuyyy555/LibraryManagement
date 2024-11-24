package com.example.demo.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.BorrowRecord;
import com.example.demo.model.User;
import com.example.demo.model.Book;
import com.example.demo.repository.BorrowRecordRepository;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.UserRepository;

@Service
public class BorrowRecordService {
    @Autowired
    private BorrowRecordRepository borrowRecordRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;

    public List<BorrowRecord> getAllBorrowRecords() {
        return borrowRecordRepository.findAll();
    }

    public BorrowRecord addBorrowRecord(BorrowRecord borrowRecord) {
        return borrowRecordRepository.save(borrowRecord);
    }

    public BorrowRecord updateBorrowRecord(BorrowRecord borrowRecord) {
        BorrowRecord existingRecord = borrowRecordRepository.findById(borrowRecord.getId())
            .orElseThrow(() -> new RuntimeException("Borrow Record not found with ID: " + borrowRecord.getId()));

        Book existingBook = bookRepository.findById(borrowRecord.getBook().getId())
            .orElseThrow(() -> new RuntimeException("Book not found with ID: " + borrowRecord.getBook().getId()));

        User existingUser = userRepository.findById(borrowRecord.getUser().getId())
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + borrowRecord.getUser().getId()));
        existingRecord.setBook(existingBook);
        existingRecord.setUser(existingUser);
        existingRecord.setBorrowDate(borrowRecord.getBorrowDate());
        existingRecord.setReturnDate(borrowRecord.getReturnDate());
        existingRecord.setReturned(borrowRecord.isReturned());
        return borrowRecordRepository.save(existingRecord);
    }
    public void deleteBorrowRecord(int id) {
        borrowRecordRepository.deleteById(id);
    }
}

