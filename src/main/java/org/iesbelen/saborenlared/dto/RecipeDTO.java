package org.iesbelen.saborenlared.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDTO {
    private Long idRecipe;
    private String recipeName;
    private String description;
    private String photo;
    private Boolean active;
    private List<RecipeIngredientDTO> recipeIngredients;
    private List<CommentDTO> comments;
    private List<RateDTO> rates;
    private List<CategoryDTO> categories;
}
