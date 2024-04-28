package org.iesbelen.saborenlared.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.context.annotation.EnableMBeanExport;

import java.util.List;
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

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "recipe_ingredient",
            joinColumns = @JoinColumn(name = "id_recipe", referencedColumnName = "id_recipe"),
            inverseJoinColumns = @JoinColumn(name = "id_ingredient", referencedColumnName = "id_ingredient")
    )
    private Set<Ingredient> ingredients;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "recipe_category",
            joinColumns = @JoinColumn(name = "id_recipe", referencedColumnName = "id_recipe"),
            inverseJoinColumns = @JoinColumn(name = "id_category", referencedColumnName = "id_category")
    )
    private Set<Category> categories;

    @OneToMany(
            mappedBy = "recipe",
            fetch = FetchType.EAGER
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Comment> comments;

    @OneToMany(
            mappedBy = "recipe",
            fetch = FetchType.EAGER
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Rate> rates;

}
