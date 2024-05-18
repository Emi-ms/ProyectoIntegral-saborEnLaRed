package org.iesbelen.saborenlared.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredientDTO {
    private Long idRecipeIngredient;
    private String ingredientName;
    private double quantity;
    private String unitMeasure;
}
