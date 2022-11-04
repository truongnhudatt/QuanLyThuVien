package com.example.demo.services;

import java.nio.file.Path;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.Image;

public interface IStorageService {
	public String storeFile(MultipartFile file);
    public Stream<Path> loadAll(); //load all file inside a folder
    public byte[] readFileContent(String fileName);
    public void deleteAllFiles();
    public void deleteFileByName(String fileName);
}
