package org.iesbelen.saborenlared.exeption;

public class RecipeNotFoundException extends RuntimeException{
    public RecipeNotFoundException(Long id){
        super("Not found Recipe with id " + id);
    }
}
