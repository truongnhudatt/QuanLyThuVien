package com.example.demo.models;

import java.io.Serializable;

import javax.persistence.*;

import lombok.*;

@Table(name = "tbl_image")
//@Entity
//@Data
//@NoArgsConstructor
//@Embeddable
public class Image implements Serializable {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
	private String name;
	@Column(columnDefinition = "LONGBLOB")
	private String base64Img;
	public Image() {
		// TODO Auto-generated constructor stub
	}
	
	public Image(String name, String base64Img) {
		this.name = name;
		this.base64Img = base64Img;
	}

//	public Image(Long id, String name, String base64Img) {
//		super();
//		this.id = id;
//		this.name = name;
//		this.base64Img = base64Img;
//	}

//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBase64Img() {
		return base64Img;
	}

	public void setBase64Img(String base64Img) {
		this.base64Img = base64Img;
	}
//
//	@Override
//	public String toString() {
//		return "Image [id=" + id + ", name=" + name + ", base64Img=" + base64Img + "]";
//	}
	
	
}
