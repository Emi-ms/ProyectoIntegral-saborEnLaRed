package org.iesbelen.saborenlared.repository;

import org.iesbelen.saborenlared.domain.RecipeIngredient;
import org.iesbelen.saborenlared.domain.RecipeIngredientKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, RecipeIngredientKey> {
}