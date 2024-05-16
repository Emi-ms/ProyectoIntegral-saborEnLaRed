package org.iesbelen.saborenlared.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.iesbelen.saborenlared.domain.Comment;
import org.iesbelen.saborenlared.domain.Recipe;
import org.iesbelen.saborenlared.service.RecipeService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "${cors.origin}")
@RequestMapping("/recipes")
@RequiredArgsConstructor
public class RecipeController {
    @Value("${cors.origin}")
    private String corsOrigin;

    private final RecipeService recipeService;

    @GetMapping({"","/"})
    public ResponseEntity<?> all() {
        log.info("Accediendo a todas las recetas");
        return new ResponseEntity<>(recipeService.all(), HttpStatus.OK);
    }

    @PostMapping({"","/"})
    public Recipe newRecipe(@RequestBody Recipe recipe) {
        System.out.println(recipe);
        return this.recipeService.save(recipe);
    }
}
