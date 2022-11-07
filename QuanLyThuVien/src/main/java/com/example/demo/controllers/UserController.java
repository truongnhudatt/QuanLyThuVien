package com.example.demo.controllers;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.User;
import com.example.demo.payloads.request.UserLogin;
import com.example.demo.payloads.response.LoginResponse;
import com.example.demo.payloads.response.MessageResponse;
import com.example.demo.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class UserController {
	@Autowired
	private UserService userServiceImp;
	
	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers(){
		return ResponseEntity.ok().body(userServiceImp.findAll());
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@Valid @RequestBody UserLogin userlogin){
		Optional<User> usr = userServiceImp.findByEmail(userlogin.getEmail());
		if(usr.isPresent()) {
			User usrtmp = usr.get();
			LoginResponse loginResponse = new LoginResponse( usrtmp.getUsername(),usrtmp.getEmail());
			if(usrtmp.getPassword().equals(userlogin.getPassword())) {
				return ResponseEntity.ok().body(new MessageResponse("True","Đăng nhập thành công", loginResponse));
			}
			else {
				return ResponseEntity.badRequest().body(new MessageResponse("False","Email hoặc mật khẩu không chính xác",""));
			}
		}		
		return ResponseEntity.badRequest().body(new MessageResponse("False","Không tồn tại người dùng",""));
		
	}
	
	
	@PostMapping("/user/save")
	public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
		if(userServiceImp.existsByEmail(user.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("False","Email này đã được sử dụng",""));
		}
		else {
			return ResponseEntity.ok().body(new MessageResponse("True","Đăng ký thành công",userServiceImp.save(user)));
		}
	}
}
