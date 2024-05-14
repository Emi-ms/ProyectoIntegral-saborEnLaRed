package org.iesbelen.saborenlared.controller.advices;

import org.iesbelen.saborenlared.exeption.IngredientNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class IngredientNotFounfAdvice {
    @ResponseBody
    @ExceptionHandler(IngredientNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String ingredientNotFoundHandler(IngredientNotFoundException ingredientNotFoundException){
        return ingredientNotFoundException.getMessage();
    }
}
