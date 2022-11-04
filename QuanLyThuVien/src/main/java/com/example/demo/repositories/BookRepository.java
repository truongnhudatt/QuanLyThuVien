package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Book;


@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
	@Query("Select b FROM Book b WHERE b.title LIKE %?1%")
    public List<Book> search(String keyword);
}
