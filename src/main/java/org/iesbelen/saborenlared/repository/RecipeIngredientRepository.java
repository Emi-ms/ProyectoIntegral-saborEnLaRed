package org.iesbelen.saborenlared.repository;

import org.iesbelen.saborenlared.domain.RecipeIngredient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient,Long> {

@Query("SELECT r FROM RecipeIngredient r WHERE r.recipe.idRecipe = :idRecipe")
    Set<RecipeIngredient> findRecipeIngredientByRecipeId(@Param("idRecipe")Long idRecipe);
}
