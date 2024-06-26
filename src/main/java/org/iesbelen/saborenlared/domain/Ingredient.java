package org.iesbelen.saborenlared.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ingredient")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ingredient")
    private Long idIngredient;
    private String ingredientName;
    private Boolean active;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "ingredient"
    )
    private Set<RecipeIngredient> recipeIngredients = new HashSet<>();
}
