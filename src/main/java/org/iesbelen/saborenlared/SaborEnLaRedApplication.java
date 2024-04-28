package org.iesbelen.saborenlared;

import org.iesbelen.saborenlared.domain.Comment;
import org.iesbelen.saborenlared.domain.Recipe;
import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.repository.CommentRepository;
import org.iesbelen.saborenlared.repository.RecipeRepository;
import org.iesbelen.saborenlared.repository.UserRepository;
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

//    @Bean
//    CommandLineRunner commandLineRunner(
//
//            UserRepository userRepository,
//            CommentRepository commentRepository,
//            RecipeRepository recipeRepository
//    ) {
//        return args -> {
//
//            User user1 = userRepository.save(new User(null,"Emi","Munoz","emi@emi.com","12345","admin",true, null));
//            Recipe recipe1 = recipeRepository.save(new Recipe(null,"receta1","descripcion1","foto",true,null,null,null));
//            Comment comment1 = commentRepository.save(new Comment(null,"comentario 1",true,user1,recipe1) );
//
//        };
//    }
}
