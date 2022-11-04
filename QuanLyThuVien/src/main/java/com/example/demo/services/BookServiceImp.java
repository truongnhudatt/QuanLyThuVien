package com.example.demo.services;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.errors.BookNotFoundException;
import com.example.demo.models.Book;
import com.example.demo.repositories.BookRepository;

@Service
public class BookServiceImp implements BookService {
	@Autowired
	private static BookRepository bookRepository;
	
	public BookServiceImp(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}
	@Override
	public List<Book> search(String keyword) {
		if(keyword != null) {
			return bookRepository.search(keyword);
		}
		return bookRepository.findAll();
	}

	@Override
	public <S extends Book> S save(S entity) {
		return bookRepository.save(entity);
	}

	@Override
	public List<Book> findAll() {
		return bookRepository.findAll();
	}

	@Override
	public <S extends Book> List<S> saveAll(Iterable<S> entities) {
		return bookRepository.saveAll(entities);
	}

	@Override
	public Optional<Book> findById(Long id) {
		return bookRepository.findById(id);
	}

	@Override
	public boolean existsById(Long id) {
		return bookRepository.existsById(id);
	}

	@Override
	public long count() {
		return bookRepository.count();
	}

	@Override
	public void delete(Book entity) {
		bookRepository.delete(entity);
	}
	
	@Override
	public void deleteById(Long id) {
		bookRepository.deleteById(id);
	}
	
	@Override
	public Book updateBook(Long id, Book book) {
		Optional<Book> bookTmp = bookRepository.findById(id);
		if(!bookTmp.isPresent()) {
			throw new RuntimeException("Cut");
        }
		Book bookDB = bookTmp.get();
		if(Objects.nonNull(book.getTitle()) && !"".equalsIgnoreCase(book.getTitle())) {
            bookDB.setTitle(book.getTitle());
        }

        if(Objects.nonNull(book.getAuthor()) && !"".equalsIgnoreCase(book.getAuthor())) {
            bookDB.setAuthor(book.getAuthor());
        }

        if(Objects.nonNull(book.getDescription()) && !"".equalsIgnoreCase(book.getDescription())) {
            bookDB.setDescription(book.getDescription());
        }

        if(Objects.nonNull(book.getTitle()) && !"".equalsIgnoreCase(book.getTitle())) {
            bookDB.setTitle(book.getTitle());
        }

        if(Objects.nonNull(book.getDateRelease()) && !"".equalsIgnoreCase(book.getDateRelease().toString())) {
            bookDB.setDateRelease(book.getDateRelease());
        }

        if(Objects.nonNull(book.getTotalPage()) && book.getTotalPage() > 0) {
            bookDB.setTotalPage(book.getTotalPage());
        }

        if(Objects.nonNull(book.getTypeBook()) && !"".equalsIgnoreCase(book.getTypeBook())) {
            bookDB.setTypeBook(book.getTypeBook());   
        }
    	if(Objects.nonNull(book.getBase64Img())){
    		bookDB.setFileName(book.getFileName());
    		bookDB.setBase64Img(book.getBase64Img());
        }
		return bookRepository.save(bookDB); 
	}
}
