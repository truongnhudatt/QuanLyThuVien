package com.example.demo.payloads.response;

public class LoginResponse {
	private String username;
	private String email;
	
	public LoginResponse() {
		// TODO Auto-generated constructor stub
	}
	
	public LoginResponse(String username, String email) {
		super();
		this.username = username;
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
