package org.iesbelen.saborenlared.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class RecipeIngredientKey implements Serializable {
    @Column(name = "id_recipe")
    private Long idRecipe;
    @Column(name = "id_ingredient")
    private Long idIngredient;
}
