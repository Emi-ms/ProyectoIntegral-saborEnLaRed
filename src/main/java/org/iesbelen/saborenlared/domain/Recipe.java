package org.iesbelen.saborenlared.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Set;


@Entity
@Table(name = "recipe")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recipe")
    private Long idRecipe;
    private String recipeName;
    private String description;
    private String photo;
    private Boolean active;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "recipe", cascade = CascadeType.ALL)

    private Set<RecipeIngredient> recipeIngredients;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "recipe_ingredient",
            joinColumns = @JoinColumn(name = "id_recipe", referencedColumnName = "id_recipe"),
            inverseJoinColumns = @JoinColumn(name = "id_ingredient", referencedColumnName = "id_ingredient")
    )
    private Set<Ingredient> ingredients;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "recipe_category",
            joinColumns = @JoinColumn(name = "id_recipe", referencedColumnName = "id_recipe"),
            inverseJoinColumns = @JoinColumn(name = "id_category", referencedColumnName = "id_category")
    )
    private Set<Category> categories;

    @OneToMany(
            mappedBy = "recipe",
            fetch = FetchType.LAZY
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Comment> comments;

    @OneToMany(
            mappedBy = "recipe",
            fetch = FetchType.LAZY
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Rate> rates;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", nullable = false, foreignKey = @ForeignKey(name = "FK_RECIPE_USER"))
    private User user;

}
