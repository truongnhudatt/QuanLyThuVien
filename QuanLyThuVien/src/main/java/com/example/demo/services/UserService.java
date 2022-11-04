package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import com.example.demo.models.User;

public interface UserService {

	Optional<User> findByEmail(String email);

	Optional<User> findByUsername(String username);

	List<User> findAll();

	<S extends User> S save(S entity);
	
}
