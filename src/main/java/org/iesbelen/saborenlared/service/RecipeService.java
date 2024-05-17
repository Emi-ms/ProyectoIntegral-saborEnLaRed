package org.iesbelen.saborenlared.service;

import lombok.RequiredArgsConstructor;
import org.iesbelen.saborenlared.domain.*;
import org.iesbelen.saborenlared.dto.*;
import org.iesbelen.saborenlared.exeption.RecipeNotFoundException;
import org.iesbelen.saborenlared.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final CommentRepository commentRepository;
    private final RateRepository rateRepository;
    private final CategoryRepository categoryRepository;

    public RecipeDTO getRecipeDTO(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RecipeNotFoundException(id));

        if (recipe != null) {

            Set<RecipeIngredient> recipeIngredients = recipeIngredientRepository.findRecipeIngredientByRecipeId(recipe.getIdRecipe());
            List<RecipeIngredientDTO> recipeIngredientDTOS = recipeIngredients.stream()
                    .map(recipeIngredient -> RecipeIngredientDTO.builder()
                            .idRecipeIngredient(recipeIngredient.getIdRecipeIngredient())
                            .ingredientName(recipeIngredient.getIngredient().getIngredientName())
                            .quantity(recipeIngredient.getQuantity())
                            .unitMeasure(recipeIngredient.getUnitMeasure())
                            .build())
                    .toList();

            Set<Comment> comments = commentRepository.findCommentByRecipeId(recipe.getIdRecipe());
            List<CommentDTO> commentsDTOS = comments.stream()
                    .map(comment -> CommentDTO.builder()
                            .idComment(comment.getIdComment())
                            .commentText(comment.getCommentText())
                            .userName(comment.getUser().getUsername())
                            .build())
                    .toList();

            Set<Rate> rates = rateRepository.findRateByRecipeId(recipe.getIdRecipe());
            List<RateDTO> rateDTOS = rates.stream()
                    .map(rate -> RateDTO.builder()
                            .idRate(rate.getIdRate())
                            .rateValue(rate.getRateValue())
                            .userName(rate.getUser().getUsername())
                            .build())
                    .toList();

            Set<Long> categoriesIds =recipe.getCategories().stream()
                    .map(Category::getIdCategory)
                    .collect(Collectors.toSet());
            List<Category> categories = categoryRepository.findAllById(categoriesIds);
            List<CategoryDTO> categoryDTOS = categories.stream()
                    .map(category -> CategoryDTO.builder()
                            .idCategory(category.getIdCategory())
                            .categoryName(category.getCategoryName())
                            .build())
                    .toList();


            RecipeDTO recipeDTO = RecipeDTO.builder()
                    .idRecipe(recipe.getIdRecipe())
                    .recipeName(recipe.getRecipeName())
                    .description(recipe.getDescription())
                    .photo(recipe.getPhoto())
                    .active(recipe.getActive())
                    .recipeIngredients(recipeIngredientDTOS)
                    .comments(commentsDTOS)
                    .rates(rateDTOS)
                    .categories(categoryDTOS)
                    .build();
            return recipeDTO;
        }
        return null;
    }


    public List<Recipe> all() {
        return this.recipeRepository.findAll();
    }

    public Recipe save(Recipe recipe) {
//        User user = userRepository.findById(recipe.getUser().getIdUser())
//                .orElseThrow(() -> new UserNotFoundException(recipe.getUser().getIdUser()));
//
//        Recipe recipeSave = new Recipe();
//        recipeSave.setUser(user);
        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
            recipeIngredient.setRecipe(recipe);
        }

        return recipeRepository.save(recipe);
    }

    public Recipe one(Long id) {
        return recipeRepository.findById(id).
                orElseThrow(() -> new RecipeNotFoundException(id));
    }


}
