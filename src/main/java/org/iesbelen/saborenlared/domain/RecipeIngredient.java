package org.iesbelen.saborenlared.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "recipe_ingredient")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
//@IdClass(RecipeIngredientKey.class)
public class RecipeIngredient {
//    @EmbeddedId
//    RecipeIngredientKey id;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_recipe_ingredient")
    private Long idRecipeIngredient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_recipe")
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_ingredient")
    private Ingredient ingredient;

    private double quantity;
    private String unitMeasure;


}
