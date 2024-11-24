package com.example.demo.controller;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.BorrowRecordService;
import com.example.demo.model.BorrowRecord;

@RestController
@RequestMapping("/borrowrecord")
public class BorrowRecordController {
    @Autowired
    private BorrowRecordService borrowRecordService;

    @GetMapping
    public List<BorrowRecord> getAllBorrowRecords() {
        return borrowRecordService.getAllBorrowRecords();
    }

    @PostMapping("/add")
    public BorrowRecord addBorrowRecord(@RequestBody BorrowRecord borrowRecord) {
        borrowRecord.setBorrowDate(LocalDate.now());
        borrowRecord.setReturnDate(LocalDate.now().plusDays(7));
        borrowRecord.setReturned(false);
        System.out.println(borrowRecord);
        return borrowRecordService.addBorrowRecord(borrowRecord);
    }

    @PostMapping("/edit")
    public ResponseEntity<BorrowRecord> updateBorrowRecord(@RequestBody BorrowRecord updatedBorrowRecord) {
        BorrowRecord record = borrowRecordService.updateBorrowRecord(updatedBorrowRecord);
        return ResponseEntity.ok(record);
    }

    @PostMapping("/delete/{id}")
    public void deleteBorrowRecord(@PathVariable int id) {
        borrowRecordService.deleteBorrowRecord(id);
    }
}

