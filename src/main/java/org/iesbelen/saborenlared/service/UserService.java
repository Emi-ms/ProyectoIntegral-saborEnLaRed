package org.iesbelen.saborenlared.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.iesbelen.saborenlared.auth.UserRequest;
import org.iesbelen.saborenlared.auth.UserResponse;
import org.iesbelen.saborenlared.domain.Recipe;
import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.dto.RecipeDTO;
import org.iesbelen.saborenlared.dto.RecipeIngredientDTO;
import org.iesbelen.saborenlared.exeption.UserNotFoundException;
import org.iesbelen.saborenlared.repository.RecipeIngredientRepository;
import org.iesbelen.saborenlared.repository.RecipeRepository;
import org.iesbelen.saborenlared.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.iesbelen.saborenlared.dto.UserDTO;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CommentService commentService;
    private final RecipeRepository recipeRepository;
    private final RecipeIngredientRepository recipeIngredientRespository;

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {

        User user = User.builder()
                .id(userRequest.getId())
                .userName(userRequest.getUserName())
                .userSurname(userRequest.getUserSurname())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .rol(userRequest.getRol())
                .active(userRequest.isActive())
                .build();

        userRepository.updateUser(user.getId(), user.getUsername(), user.getUserSurname(), user.getEmail(), user.getPassword());

        return new UserResponse("El usuario se actualizó correctamente");
    }

    public UserDTO getUser(Long id) {
        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            Set<Recipe> recipes = recipeRepository.findRecipesByUserId(user.getId());
            List<RecipeDTO> recipeDTOS = recipes.stream()
                    .map(recipe -> {
                        List<RecipeIngredientDTO> recipeIngredients = recipeIngredientRespository.findRecipeIngredientByRecipeId(recipe.getIdRecipe()).stream()
                                .map(recipeIngredient -> RecipeIngredientDTO.builder()
                                        .idRecipeIngredient(recipeIngredient.getIdRecipeIngredient())
                                        .ingredientName(recipeIngredient.getIngredient().getIngredientName())
                                        .quantity(recipeIngredient.getQuantity())
                                        .unitMeasure(recipeIngredient.getUnitMeasure())
                                        .build())
                                .collect(Collectors.toList());

                        return RecipeDTO.builder()
                                .idRecipe(recipe.getIdRecipe())
                                .recipeName(recipe.getRecipeName())
                                .description(recipe.getDescription())
                                .photo(recipe.getPhoto())
                                .active(recipe.getActive())
                                .recipeIngredients(recipeIngredients)
                                .build();
                    })
                    .collect(Collectors.toList());


            return UserDTO.builder()
                    .id(user.getId())
                    .userName(user.getUsername())
                    .userSurname(user.getUserSurname())
                    .email(user.getEmail())
                    .password(user.getPassword())
                    .rol(user.getRol())
                    .active(user.isActive())
                    .recipes(recipeDTOS)
                    .build();
        }
        return null;
    }

    public List<UserDTO> all() {
        List<User> users = this.userRepository.findAll();
        List<UserDTO> userDTOS = users.stream()
                .map(user -> getUser(user.getId())
                ).toList();
        return userDTOS;
    }

    public List<UserDTO> AllActiveUser(){
        List<User> users = this.userRepository.findAll().
                stream().filter(User::isActive)
                .toList();
        return users.stream().
                map(user -> this.getUser(user.getId()))
                .toList();
    }


    public User save(User user) {
        return this.userRepository.save(user);
    }

    public User one(Long id) {

        return this.userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

    }

    public User replace(Long id, User user) {
        return this.userRepository.findById(id).map(u -> (id.equals(user.getId()) ?
                        this.userRepository.save(user) : null))
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public void delete(Long id) {
        this.userRepository.findById(id).map(user -> {
                    this.userRepository.delete(user);
                    return user;
                })
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public User logicDelete(Long id){
        User user = userRepository.findById(id).
                orElseThrow(()->new UserNotFoundException(id));
        user.setActive(false);
        return userRepository.save(user);
    }
}
