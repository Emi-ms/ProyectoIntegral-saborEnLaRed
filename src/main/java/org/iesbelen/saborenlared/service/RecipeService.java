package org.iesbelen.saborenlared.service;

import lombok.RequiredArgsConstructor;
import org.iesbelen.saborenlared.domain.*;
import org.iesbelen.saborenlared.dto.*;
import org.iesbelen.saborenlared.exeption.RecipeNotFoundException;
import org.iesbelen.saborenlared.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeService {
    @Autowired
    public FileStorageService fileStorageService;

    private final RecipeRepository recipeRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final CommentRepository commentRepository;
    private final RateRepository rateRepository;
    private final CategoryRepository categoryRepository;

    public RecipeDTO getRecipeDTO(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RecipeNotFoundException(id));

        if (recipe != null) {

            List<RecipeIngredientDTO> recipeIngredientDTOS = mapToRecipeIngredientDTOs(recipe);
            List<CommentDTO> commentsDTOS = mapToCommentDTOs(recipe);
            List<RateDTO> rateDTOS = mapToRateDTOs(recipe);
            List<CategoryDTO> categoryDTOS = mapToCategoryDTOs(recipe);

            return RecipeDTO.builder()
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
        }
        return null;
    }

    public List<RecipeDTO> all() {
        List<Recipe> recipes = recipeRepository.findAll();
        return recipes.stream().
                map(recipe -> this.getRecipeDTO(recipe.getIdRecipe()))
                .toList();
    }

    public List<RecipeDTO> AllActiveRecipes() {
        List<Recipe> recipes = recipeRepository.findAll()
                .stream()
                .filter(Recipe::getActive)
                .toList();
        return recipes.stream().
                map(recipe -> this.getRecipeDTO(recipe.getIdRecipe()))
                .toList();
    }

    public Recipe save(Recipe recipe, MultipartFile file) {

        if(!file.isEmpty()){
            try {
                String imgName = fileStorageService.store(file);
                recipe.setPhoto(imgName);
            }catch (Exception e){
                e.printStackTrace();
                return null;
            }
        }

        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
            recipeIngredient.setRecipe(recipe);
        }

        return recipeRepository.save(recipe);
    }

    public Recipe one(Long id) {
        return recipeRepository.findById(id).
                orElseThrow(() -> new RecipeNotFoundException(id));
    }


    private List<CategoryDTO> mapToCategoryDTOs(Recipe recipe) {
        Set<Long> categoriesIds = recipe.getCategories().stream()
                .map(Category::getIdCategory)
                .collect(Collectors.toSet());
        List<Category> categories = categoryRepository.findAllById(categoriesIds);
        return categories.stream()
                .map(category -> CategoryDTO.builder()
                        .idCategory(category.getIdCategory())
                        .categoryName(category.getCategoryName())
                        .build())
                .toList();
    }

    private List<RecipeIngredientDTO> mapToRecipeIngredientDTOs(Recipe recipe) {
        Set<RecipeIngredient> recipeIngredients = recipeIngredientRepository.findRecipeIngredientByRecipeId(recipe.getIdRecipe());
        return recipeIngredients.stream()
                .map(recipeIngredient -> RecipeIngredientDTO.builder()
                        .idRecipeIngredient(recipeIngredient.getIdRecipeIngredient())
                        .ingredientName(recipeIngredient.getIngredient().getIngredientName())
                        .quantity(recipeIngredient.getQuantity())
                        .unitMeasure(recipeIngredient.getUnitMeasure())
                        .build())
                .toList();
    }

    private List<CommentDTO> mapToCommentDTOs(Recipe recipe) {
        Set<Comment> comments = commentRepository.findCommentByRecipeId(recipe.getIdRecipe());
        return comments.stream()
                .map(comment -> CommentDTO.builder()
                        .idComment(comment.getIdComment())
                        .commentText(comment.getCommentText())
                        .userName(comment.getUser().getUsername())
                        .build())
                .toList();
    }

    private List<RateDTO> mapToRateDTOs(Recipe recipe) {
        Set<Rate> rates = rateRepository.findRateByRecipeId(recipe.getIdRecipe());
        return rates.stream()
                .map(rate -> RateDTO.builder()
                        .idRate(rate.getIdRate())
                        .rateValue(rate.getRateValue())
                        .userName(rate.getUser().getUsername())
                        .build())
                .toList();
    }

    public Recipe logicDelete(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RecipeNotFoundException(id));
        recipe.setActive(false);
        return recipeRepository.save(recipe);
    }


}
