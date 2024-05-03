package org.iesbelen.saborenlared.exeption;

public class UserNotFoundException extends RuntimeException{

        public UserNotFoundException(Long id) {
            super("Not found Empresa with id: " + id);
        }
}
