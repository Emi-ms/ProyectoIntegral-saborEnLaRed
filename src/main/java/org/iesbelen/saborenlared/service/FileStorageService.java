package org.iesbelen.saborenlared.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${media.location}")
    private String mediaLocation;


    private Path rootLocation;

    @PostConstruct
    public void init() throws IOException {
        rootLocation = Paths.get(mediaLocation);
        Files.createDirectories(rootLocation);
    }

    public String store(MultipartFile file) throws Exception {
        try{
            if(file.isEmpty()){
                throw new RuntimeException("fichero vacio");
            }
            String originalFilename = Objects.requireNonNull(file.getOriginalFilename());
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String filename = originalFilename + UUID.randomUUID().toString() + extension;
            Path destinationFile = rootLocation.resolve(Paths.get(filename))
                    .normalize().toAbsolutePath();
            try (InputStream inputStream = file.getInputStream()){
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }
            return filename;
        }catch (IOException ex){
            throw new RuntimeException("fallo en almacenar fichero", ex);
        }

    }

    public boolean delete(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            if (Files.exists(file)) {
                Files.delete(file);
                return true;
            } else {
                return false;
            }
        } catch (IOException e) {
            return false;
        }
    }

    public Resource loadResource(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new Exception();
            }
        } catch (Exception e) {
            System.err.println("Error IO");
        }
        return null;
    }

}
