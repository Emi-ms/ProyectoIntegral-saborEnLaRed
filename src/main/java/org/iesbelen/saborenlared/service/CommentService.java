package org.iesbelen.saborenlared.service;

import lombok.AllArgsConstructor;
import org.iesbelen.saborenlared.domain.Comment;
import org.iesbelen.saborenlared.exeption.CommentNotFoundException;
import org.iesbelen.saborenlared.repository.CommentRepository;
import org.iesbelen.saborenlared.repository.RecipeRepository;
import org.iesbelen.saborenlared.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public List<Comment> all() {
        return this.commentRepository.findAll();
    }

    public Comment save(Comment comment) {
        comment.setActive(true);
        return this.commentRepository.save(comment);
    }

    public Comment one(Long id) {
        return this.commentRepository.findById(id)
                .orElseThrow(() -> new CommentNotFoundException(id));
    }

    public Comment replace(Long id, Comment comment) {
        System.out.println(id + " en el servicio " + comment.getIdComment());
        return this.commentRepository.findById(id).map(p -> (id.equals(comment.getIdComment()) ?
                        this.commentRepository.save(comment) : null))
                .orElseThrow(() -> new CommentNotFoundException(id));
    }

    public void delete(Long id) {
        this.commentRepository.findById(id).map(comment -> {
                    this.commentRepository.delete(comment);
                    return comment;
                })
                .orElseThrow(() -> new CommentNotFoundException(id));
    }
}
