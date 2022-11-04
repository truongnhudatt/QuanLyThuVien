package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.models.Book;

@Service
public interface BookService {

	void delete(Book entity);

	long count();

	boolean existsById(Long id);

	Optional<Book> findById(Long id);

	<S extends Book> List<S> saveAll(Iterable<S> entities);

	List<Book> findAll();

	<S extends Book> S save(S entity);

	List<Book> search(String keyword);

	void deleteById(Long id);

	Book updateBook(Long id, Book book);
	
}
