package org.iesbelen.saborenlared.repository;

import org.iesbelen.saborenlared.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.recipe.idRecipe = :idRecipe")
    Set<Comment> findCommentByRecipeId(@Param("idRecipe")Long idRecipe);

    @Query("SELECT c from Comment c WHERE c.user.id = :id")
    Comment findCommentByUserId(@Param("id")Long id);

}
