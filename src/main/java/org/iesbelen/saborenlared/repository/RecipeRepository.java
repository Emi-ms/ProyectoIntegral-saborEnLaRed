package org.iesbelen.saborenlared.repository;

import org.iesbelen.saborenlared.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe,Long> {
    @Query("SELECT r FROM Recipe r WHERE r.user.idUser = :userId")
    Set<Recipe> findRecipesByUserId(@Param("userId") Long userId);
}
