package org.iesbelen.saborenlared.service;

import org.iesbelen.saborenlared.domain.*;
import org.iesbelen.saborenlared.exeption.CategoryNotFoundException;
import org.iesbelen.saborenlared.exeption.IngredientNotFoundException;
import org.iesbelen.saborenlared.exeption.UserNotFoundException;
import org.iesbelen.saborenlared.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final RecipeIngredientRepository recipeIngredientRespository;

    public RecipeService(RecipeRepository recipeRepository, UserRepository userRepository, CategoryRepository categoryRepository, IngredientRepository ingredientRepository, RecipeIngredientRepository recipeIngredientRespository) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.ingredientRepository = ingredientRepository;

        this.recipeIngredientRespository = recipeIngredientRespository;
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


}
