package org.iesbelen.saborenlared.service;

import org.iesbelen.saborenlared.domain.*;
import org.iesbelen.saborenlared.exeption.UserNotFoundException;
import org.iesbelen.saborenlared.repository.CategoryRepository;
import org.iesbelen.saborenlared.repository.IngredientRepository;
import org.iesbelen.saborenlared.repository.RecipeRepository;
import org.iesbelen.saborenlared.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final IngredientRepository ingredientRepository;

    public RecipeService(RecipeRepository recipeRepository, UserRepository userRepository, CategoryRepository categoryRepository, IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public List<Recipe> all(){
        return  this.recipeRepository.findAll();
    }


    public Recipe save(Recipe recipe){
        User user = userRepository.findById(recipe.getUser().getIdUser())
                .orElseThrow(()->new UserNotFoundException(recipe.getUser().getIdUser()));

        Set<Long> ingredientsIds = recipe.getIngredients().stream()
                .map(Ingredient::getIdIngredient)
                .collect(Collectors.toSet());
        List<Ingredient> ingredientsList =  ingredientRepository.findAllById(ingredientsIds);
        Set<Ingredient> ingredientSet = new HashSet<>(ingredientsList);

        Set<Long> categoriesIds = recipe.getCategories().stream()
                .map(Category::getIdCategory)
                .collect(Collectors.toSet());
        List<Category> categoryList = categoryRepository.findAllById(categoriesIds);
        Set<Category> categorySet = new HashSet<>(categoryList);



        recipe.setUser(user);
        recipe.setIngredients(ingredientSet);
        recipe.setCategories(categorySet);

        return recipeRepository.save(recipe);

    }


}
