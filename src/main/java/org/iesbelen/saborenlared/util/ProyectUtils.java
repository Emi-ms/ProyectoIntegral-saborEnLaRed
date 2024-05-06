package org.iesbelen.saborenlared.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ProyectUtils {
    private ProyectUtils(){}

    public static ResponseEntity<String> getResponseEntity(String message, HttpStatus httpStatus){
        return new ResponseEntity<String>("{\"message\":\"" + message + "\"}", httpStatus);
    }
}
