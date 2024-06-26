package org.iesbelen.saborenlared.repository;

import org.iesbelen.saborenlared.domain.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface RateRepository extends JpaRepository<Rate,Long> {
    @Query("SELECT r FROM Rate r WHERE r.recipe.idRecipe = :idRecipe")
    Set<Rate> findRateByRecipeId(@Param("idRecipe")Long idRecipe);
}
