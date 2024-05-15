package org.iesbelen.saborenlared.service;

import org.iesbelen.saborenlared.domain.Comment;
import org.iesbelen.saborenlared.domain.Recipe;
import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.exeption.CommentNotFoundException;
import org.iesbelen.saborenlared.exeption.RecipeNotFoundException;
import org.iesbelen.saborenlared.exeption.UserNotFoundException;
import org.iesbelen.saborenlared.repository.CommentRepository;
import org.iesbelen.saborenlared.repository.RecipeRepository;
import org.iesbelen.saborenlared.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, RecipeRepository recipeRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
    }

    public List<Comment> all() {
        return this.commentRepository.findAll();
    }

    public Comment save(Comment comment) {
        User user = userRepository.findById(comment.getUser().getIdUser())
                        .orElseThrow(() -> new UserNotFoundException(comment.getUser().getIdUser()));
        System.out.println(user.toString());
        Recipe recipe = recipeRepository.findById(comment.getRecipe().getIdRecipe())
                        .orElseThrow(()-> new RecipeNotFoundException(comment.getRecipe().getIdRecipe()));
        System.out.println(recipe.toString());

        comment.setActive(true);
        comment.setUser(user);
        comment.setRecipe(recipe);
        return this.commentRepository.save(comment);
    }

    public Comment one(Long id) {
        return this.commentRepository.findById(id)
                .orElseThrow(() -> new CommentNotFoundException(id));
    }

    public Comment replace(Long id, Comment comment) {
        System.out.println(id +" en el servicio "+ comment.getIdComment());
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
