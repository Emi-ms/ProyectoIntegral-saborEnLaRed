package org.iesbelen.saborenlared.domain;

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

    @ManyToOne
    @MapsId("idRecipe")
    @JoinColumn(name = "id_recipe")
    private Recipe recipe;

    @ManyToOne
    @MapsId("idIngredient")
    @JoinColumn(name = "id_ingredient")
    private  Ingredient ingredient;

    private double quantity;
    private String unitMeasure;
}
