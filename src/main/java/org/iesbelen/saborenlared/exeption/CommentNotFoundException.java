package org.iesbelen.saborenlared.exeption;

public class CommentNotFoundException extends RuntimeException {
    public CommentNotFoundException(Long id){
        super("Not found Comment with id: " + id);
    }
}
