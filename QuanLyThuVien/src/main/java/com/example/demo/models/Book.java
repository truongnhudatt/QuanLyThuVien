package com.example.demo.models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;


@Entity
@Table(name = "tbl_book")
@Data
public class Book implements Serializable {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String description;
    @DateTimeFormat(iso = ISO.DATE)
	@JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private Date dateRelease;
    private int totalPage;
    private String typeBook;
    private String fileName;
    @Column(columnDefinition = "LONGBLOB")
	private String base64Img;
    
    public Book() {
		// TODO Auto-generated constructor stub
	}
    
    public Book(Long id, String title, String author, String description, Date dateRelease, int totalPage,
			String typeBook,String fileName, String base64Img) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.description = description;
		this.dateRelease = dateRelease;
		this.totalPage = totalPage;
		this.typeBook = typeBook;
		this.fileName = fileName;
		this.base64Img = base64Img;
	}

	public Book(String title, String author, String description, Date dateRelease, int totalPage, String typeBook,
			String fileName, String bookImages) {
		this.title = title;
		this.author = author;
		this.description = description;
		this.dateRelease = dateRelease;
		this.totalPage = totalPage;
		this.typeBook = typeBook;
		this.base64Img = base64Img;
		this.fileName = fileName;
	}

	public Book(String title, String author, String description, Date dateRelease, int totalPage,String fileName, String typeBook) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.dateRelease = dateRelease;
        this.totalPage = totalPage;
        this.typeBook = typeBook;
        this.fileName = fileName;
    }
	
	
	public Book(String title, String author, String description, Date dateRelease, int totalPage, String typeBook) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.dateRelease = dateRelease;
        this.totalPage = totalPage;
        this.typeBook = typeBook;
    }
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getDateRelease() {
		return dateRelease;
	}

	public void setDateRelease(Date dateRelease) {
		this.dateRelease = dateRelease;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public String getTypeBook() {
		return typeBook;
	}

	public void setTypeBook(String typeBook) {
		this.typeBook = typeBook;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBase64Img() {
		return base64Img;
	}

	public void setBase64Img(String base64Img) {
		this.base64Img = base64Img;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@Override
	public String toString() {
		return "Book [id=" + id + ", title=" + title + ", author=" + author + ", description=" + description
				+ ", dateRelease=" + dateRelease + ", totalPage=" + totalPage + ", typeBook=" + typeBook + ", fileName="
				+ fileName + ", base64Img=" + base64Img + "]";
	}




    
    
}
