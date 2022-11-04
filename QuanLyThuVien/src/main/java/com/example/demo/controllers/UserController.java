package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.User;
import com.example.demo.services.UserServiceImp;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class UserController {
	@Autowired
	private UserServiceImp userServiceImp;
	
	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers(){
		return ResponseEntity.ok().body(userServiceImp.findAll());
	}
	
	@PostMapping("/user/save")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		return ResponseEntity.ok().body(userServiceImp.save(user));
	}
}
