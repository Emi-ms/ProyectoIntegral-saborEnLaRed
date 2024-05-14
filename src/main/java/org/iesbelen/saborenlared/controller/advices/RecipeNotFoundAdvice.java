package org.iesbelen.saborenlared.controller.advices;

import org.iesbelen.saborenlared.exeption.RecipeNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class RecipeNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(RecipeNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String recipeNotFoundHandler(RecipeNotFoundException recipeNotFoundException) {
        return recipeNotFoundException.getMessage();
    }
}
