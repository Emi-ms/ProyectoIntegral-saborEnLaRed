package org.iesbelen.saborenlared.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.iesbelen.saborenlared.domain.Recipe;
import org.iesbelen.saborenlared.dto.RecipeDTO;
import org.iesbelen.saborenlared.service.RecipeService;
import org.iesbelen.saborenlared.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "${cors.origin}")
@RequestMapping("/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final UserService userService;
    @Value("${cors.origin}")
    private String corsOrigin;

    private final RecipeService recipeService;

    @GetMapping({"", "/"})
    public ResponseEntity<?> all() {
        log.info("Accediendo a todas las recetas");
        return new ResponseEntity<>(recipeService.all(), HttpStatus.OK);
    }

    @GetMapping({"/recipes-actives"})
    public ResponseEntity<?> allActive() {
        log.info("Accediendo a todas las recetas activas");
        return new ResponseEntity<>(recipeService.AllActiveRecipes(), HttpStatus.OK);
    }

    @PostMapping({"", "/"})
    public ResponseEntity<RecipeDTO> newRecipe(@RequestBody Recipe recipe) {
        Recipe savedRecipe = this.recipeService.save(recipe);
        RecipeDTO recipeDTO = recipeService.getRecipeDTO(savedRecipe.getIdRecipe());
        return ResponseEntity.ok(recipeDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDTO> getRecipeDTO(@PathVariable Long id) {
        RecipeDTO recipeDTO = recipeService.getRecipeDTO(id);
        if (recipeDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(recipeDTO);
    }

    @PutMapping("/logic-delete/{id}")
    public ResponseEntity<RecipeDTO> deactivateRecipe(@PathVariable Long id) {
        Recipe deactivatedRecipe = recipeService.logicDelete(id);
        RecipeDTO recipeDTO = recipeService.getRecipeDTO(deactivatedRecipe.getIdRecipe());
        return ResponseEntity.ok(recipeDTO);
    }

}
