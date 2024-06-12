package org.iesbelen.saborenlared.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.iesbelen.saborenlared.domain.Recipe;
import org.iesbelen.saborenlared.dto.RecipeDTO;
import org.iesbelen.saborenlared.service.FileStorageService;
import org.iesbelen.saborenlared.service.RecipeService;
import org.iesbelen.saborenlared.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@CrossOrigin(origins = "${cors.origin}")
@RequestMapping("/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final UserService userService;
    private final FileStorageService fileStorageService;
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
    public ResponseEntity<RecipeDTO> newRecipe(@RequestPart("data") Recipe recipe, @RequestPart("file") MultipartFile file) {
        Recipe savedRecipe = this.recipeService.save(recipe,file);
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


    @GetMapping("/file/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename, HttpServletRequest request){
        Resource file = fileStorageService.loadResource(filename);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(file.getFile().getAbsolutePath());
        }catch (IOException ex){
            System.err.println("No se encontro el tipo del fichero");
        }
        if(contentType == null){
            contentType = "application/octet-stream";
        }


        return  ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(file);
    }

}
