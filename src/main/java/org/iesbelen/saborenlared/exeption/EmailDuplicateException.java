package org.iesbelen.saborenlared.exeption;

public class EmailDuplicateException extends  RuntimeException{
    public EmailDuplicateException(String message){
        super(message);
    }
}
