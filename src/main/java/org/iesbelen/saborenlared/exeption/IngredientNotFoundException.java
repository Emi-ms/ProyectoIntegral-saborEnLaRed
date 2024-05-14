package org.iesbelen.saborenlared.exeption;

public class IngredientNotFoundException extends RuntimeException{
    public IngredientNotFoundException(Long id) {
        super("Not found Ingredient with id: " + id);
    }
}
