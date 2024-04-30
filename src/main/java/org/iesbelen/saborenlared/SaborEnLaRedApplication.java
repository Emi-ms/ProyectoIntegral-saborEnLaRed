package org.iesbelen.saborenlared;

import org.iesbelen.saborenlared.domain.*;
import org.iesbelen.saborenlared.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Set;

@SpringBootApplication
public class SaborEnLaRedApplication {

    public static void main(String[] args) {
        SpringApplication.run(SaborEnLaRedApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(

            UserRepository userRepository,
            CommentRepository commentRepository,
            RecipeRepository recipeRepository,
            RateRepository rateRepository,
            IngredientRepository ingredientRepository,
            CategoryRepository categoryRepository,
            RecipeIngredientRepository recipeIngredientRepository
    ) {
        return args -> {
//
//           User user1 = userRepository.save(new User(null,"Emi","Munoz","emi@emi.com","12345","admin",true, null ,null,null));
//           User user2 = userRepository.save(new User(null,"Emi2","Munoz2","emi@emi.com","12345","admin",true, null ,null,null));
//            Recipe recipe1 = recipeRepository.save(new Recipe(null,"receta1","descripcion1","foto",true,null,null,null,null,user1));
//            Comment comment1 = commentRepository.save(new Comment(null,"comentario 1",true,user1,recipe1) );
//            Rate rate1 = rateRepository.save(new Rate(null,5.0,user1,recipe1));
//            Ingredient ing1 = ingredientRepository.save(new Ingredient(null,"harina",true,null));
//            System.out.println("id receta " + recipe1.getIdRecipe() +" id ingrediente " + ing1.getIdIngredient() );
//
//            recipe1.setIngredients(Set.of(ing1));
//
//            RecipeIngredient recipeIngredient = new RecipeIngredient();
//            RecipeIngredientKey recipeIngredientKey = new RecipeIngredientKey();
//            recipeIngredientKey.setIdRecipe(recipe1.getIdRecipe());
//            recipeIngredientKey.setIdIngredient(ing1.getIdIngredient());
//            System.out.println(recipeIngredientKey.getIdRecipe() + " " + recipeIngredientKey.getIdIngredient());
//
//            recipeIngredient.setId(recipeIngredientKey);
//            recipeIngredient.setRecipe(recipe1);
//            recipeIngredient.setIngredient(ing1);
//            recipeIngredient.setQuantity(2.0);
//            recipeIngredient.setUnitMeasure("ml");
//            recipeIngredientRepository.save(recipeIngredient);



        };
    }
}
