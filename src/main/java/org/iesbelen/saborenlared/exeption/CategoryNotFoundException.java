package org.iesbelen.saborenlared.exeption;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(Long id) {
        super("Not found Category with id: " + id);
    }
}
