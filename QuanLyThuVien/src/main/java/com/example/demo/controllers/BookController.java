package com.example.demo.controllers;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.Book;
import com.example.demo.models.Image;
import com.example.demo.services.BookService;
import com.example.demo.services.IStorageService;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")

public class BookController {
	@Autowired
    private BookService bookServiceImp;
	
	@Autowired
	private IStorageService imageStorageService;
	
	@GetMapping("/books")
    public ResponseEntity<?> getBookList(){
		return ResponseEntity.ok().body(bookServiceImp.findAll());
	}
	
//	@PostMapping("/book/save")
//	public ResponseEntity<?> saveBook(@RequestParam("book") String book, @RequestParam("file") MultipartFile file){
//		try {
//			ObjectMapper mapper = new ObjectMapper();
//			mapper.registerModule(new JavaTimeModule());
//			Book bok = mapper.readValue(book, Book.class);
//            String generatedFileName = imageStorageService.storeFile(file);
//            bok.setFileName(generatedFileName);
//            String base64Img = Base64.getEncoder().encodeToString(file.getBytes());
//            bok.setBase64Img(base64Img);
//            System.out.println(bok);
//            return ResponseEntity.ok().body(bookServiceImp.save(bok));
//        }
//		catch (Exception exception) {
//			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(exception.getMessage());
//        }
//
//	}
	
	@PostMapping("/book/save")
	public ResponseEntity<?> saveBook(	@RequestParam(name="title") String title, 
										@RequestParam(name="author") String author,
										@RequestParam(name="description") String description, 
										@RequestParam(name="dateRelease") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateRelease,
										@RequestParam(name="totalPage") String totalPage, 
										@RequestParam(name="typeBook") String typeBook,
										@RequestParam(required = false, name="file") MultipartFile file){
		try {
			Book book = new Book(title, author, description, dateRelease, Integer.parseInt(totalPage), typeBook);
            String generatedFileName = imageStorageService.storeFile(file);
            book.setFileName(generatedFileName);
            String base64Img = Base64.getEncoder().encodeToString(file.getBytes());
            book.setBase64Img(base64Img);
            System.out.println(book);
            return ResponseEntity.ok().body(bookServiceImp.save(book));
        }
		catch (Exception exception) {
			return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(exception.getMessage());
        }

	}
	
	@GetMapping("/book/{id}")
	public ResponseEntity<?> getBookDetail(@PathVariable Long id){
		Optional<Book> book = bookServiceImp.findById(id);
		if(book.isPresent()) {
			return ResponseEntity.ok().body(book.get());
		}
		else {
			return ResponseEntity.noContent().build();
		}
	}
	
	
	@GetMapping("/book/{id}/img")
	public ResponseEntity<byte[]> readFile(@PathVariable Long id){
		Optional<Book> book = bookServiceImp.findById(id);
		if(book.isPresent()) {
			Book bok = book.get();
			System.out.println(bok);
			byte[] bytes = imageStorageService.readFileContent(bok.getFileName());
			return ResponseEntity
					.ok()
					.contentType(MediaType.IMAGE_JPEG)
					.body(bytes);
			
		}
		else {
			return ResponseEntity.noContent().build();
		}
		
	}
	
	
	@PutMapping("/book/update/{id}")
	public ResponseEntity<?> updateBook(@PathVariable Long id, 
										@RequestParam(name="title") String title, 
										@RequestParam(name="author") String author,
										@RequestParam(name="description") String description, 
										@RequestParam(name="dateRelease") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateRelease,
										@RequestParam(name="totalPage") String totalPage, 
										@RequestParam(name="typeBook") String typeBook,
										@RequestParam(required = false, name="file") MultipartFile file) throws IOException{
		Book book = new Book(title, author, description, dateRelease, Integer.parseInt(totalPage), typeBook);
//		ObjectMapper mapper = new ObjectMapper();
//		mapper.registerModule(new JavaTimeModule());
//		Book bok = mapper.readValue(book, Book.class);
		String generatedFileName = imageStorageService.storeFile(file);
		book.setFileName(generatedFileName);
        String base64Img = Base64.getEncoder().encodeToString(file.getBytes());
        book.setBase64Img(base64Img);
		return ResponseEntity.ok().body(bookServiceImp.updateBook(id, book));
	}
	
	@DeleteMapping("/book/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id){
		Optional<Book> bookdb = bookServiceImp.findById(id);
		if(!bookdb.isPresent()) {
			throw new RuntimeException("CO id deo dau ma xoa");
		}
		Book book = bookdb.get();
		bookServiceImp.delete(book);
		imageStorageService.deleteFileByName(book.getFileName());
		return ResponseEntity.ok().body("Delete book successfully!");
	}
}
