package org.iesbelen.saborenlared.controller.advices;


import org.iesbelen.saborenlared.exeption.RateNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class RateNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(RateNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String categoryNotFoundHandler(RateNotFoundException rateNotFoundException) {
        return rateNotFoundException.getMessage();
    }
}
