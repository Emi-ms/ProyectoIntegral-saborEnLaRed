package org.iesbelen.saborenlared.service;

import lombok.AllArgsConstructor;
import org.iesbelen.saborenlared.domain.Ingredient;
import org.iesbelen.saborenlared.dto.IngredientDTO;
import org.iesbelen.saborenlared.exeption.IngredientNotFoundException;
import org.iesbelen.saborenlared.repository.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public IngredientDTO getIngredientDTO(Long id){
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(()-> new IngredientNotFoundException(id));
        if(ingredient != null){
            return IngredientDTO.builder()
                    .idIngredient(ingredient.getIdIngredient())
                    .ingredientName(ingredient.getIngredientName())
                    .build();
        }
        return null;
    }

    public List<Ingredient> all() {
        return this.ingredientRepository.findAll();
    }

    public List<IngredientDTO> AllActiveIngredient() {
        List<Ingredient> ingredients = ingredientRepository.findAll()
                .stream()
                .filter(Ingredient::getActive)
                .toList();
        return ingredients.stream().
                map(ingredient -> this.getIngredientDTO(ingredient.getIdIngredient()))
                .toList();
    }

    public Ingredient save(Ingredient ingredient) {
        ingredient.setActive(true);
        return this.ingredientRepository.save(ingredient);
    }

    public Ingredient one(Long id) {
        return this.ingredientRepository.findById(id)
                .orElseThrow(() -> new IngredientNotFoundException(id));
    }

    public Ingredient replace(Long id, Ingredient ingredient) {
        System.out.println(id +" en el servicio "+ ingredient.getIdIngredient());
        return this.ingredientRepository.findById(id).map(p -> (id.equals(ingredient.getIdIngredient()) ?
                        this.ingredientRepository.save(ingredient) : null))
                .orElseThrow(() -> new IngredientNotFoundException(id));
    }

    public void delete(Long id) {
        this.ingredientRepository.findById(id).map(ingredient -> {
                    this.ingredientRepository.delete(ingredient);
                    return ingredient;
                })
                .orElseThrow(() -> new IngredientNotFoundException(id));
    }

    public Ingredient logicDelete(Long id){
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(()-> new IngredientNotFoundException(id));
        ingredient.setActive(false);
        return ingredientRepository.save(ingredient);
    }
}
