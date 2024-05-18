package org.iesbelen.saborenlared.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.iesbelen.saborenlared.domain.Category;
import org.iesbelen.saborenlared.service.CategoryService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "${cors.origin}")
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    @Value("${cors.origin}")
    private String corsOrigin;

    private final CategoryService categoryService;

    @GetMapping({"", "/"})
    public List<Category> all() {
        log.info("Accediendo a todas las categorías");
        return this.categoryService.all();
    }

    @PostMapping({"", "/"})
    public Category newCategory(@RequestBody Category category) {
        return this.categoryService.save(category);
    }

    @GetMapping("/{id}")
    public Category one(@PathVariable("id") Long id) {
        return this.categoryService.one(id);
    }

    @PutMapping("/{id}")
    public Category replaceCategory(@PathVariable("id") Long id, @RequestBody Category category) {
        System.out.println(id + " en el controlador " + category.toString());

        return this.categoryService.replace(id, category);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable("id") Long id) {
        this.categoryService.delete(id);
    }
}
