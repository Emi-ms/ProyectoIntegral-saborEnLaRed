package org.iesbelen.saborenlared.exeption;

public class RateNotFoundException extends RuntimeException{
    public RateNotFoundException(Long id){
        super("Not found Rate with id: " + id);
    }
}
