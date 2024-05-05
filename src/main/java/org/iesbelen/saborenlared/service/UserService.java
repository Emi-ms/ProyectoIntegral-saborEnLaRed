package org.iesbelen.saborenlared.service;

import org.iesbelen.saborenlared.domain.User;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface UserService {
    public User saveUser(User user) throws Exception;

    public ResponseEntity<String> signUp(Map<String,String> requestMap);

    ResponseEntity<String> login(Map<String,String> requestMap);
}
