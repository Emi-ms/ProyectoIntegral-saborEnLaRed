package org.iesbelen.saborenlared.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recipe_ingredient")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecipeIngredient {
    @EmbeddedId
    RecipeIngredientKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idRecipe")
    @JoinColumn(name = "id_recipe")

    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idIngredient")
    @JoinColumn(name = "id_ingredient")
    private  Ingredient ingredient;

//    private double quantity ;
//    private String unitMeasure ;
}
