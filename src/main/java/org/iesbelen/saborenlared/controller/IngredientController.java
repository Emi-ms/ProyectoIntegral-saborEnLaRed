package org.iesbelen.saborenlared.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.iesbelen.saborenlared.domain.Category;
import org.iesbelen.saborenlared.domain.Ingredient;
import org.iesbelen.saborenlared.service.CategoryService;
import org.iesbelen.saborenlared.service.IngredientService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "${cors.origin}")
@RequestMapping("/ingredients")
@RequiredArgsConstructor
public class IngredientController {
    @Value("${cors.origin}")
    private String corsOrigin;

    private final IngredientService ingredientService;

    @GetMapping({"","/"})
    public List<Ingredient> all() {
        log.info("Accediendo a todas las ingredientes");
        return this.ingredientService.all();
    }
    @PostMapping({"","/"})
    public Ingredient newIngredient(@RequestBody Ingredient ingredient) {
        return this.ingredientService.save(ingredient);
    }

    @GetMapping("/{id}")
    public Ingredient one(@PathVariable("id") Long id) {
        return this.ingredientService.one(id);
    }

    @PutMapping("/{id}")
    public Ingredient replaceIngredient(@PathVariable("id") Long id, @RequestBody Ingredient ingredient) {
        System.out.println(id + " en el controlador "+ ingredient.toString());

        return this.ingredientService.replace(id, ingredient);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteIngredient(@PathVariable("id") Long id) {
        this.ingredientService.delete(id);
    }
}
