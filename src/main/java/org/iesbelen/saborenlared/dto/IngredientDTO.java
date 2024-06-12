package org.iesbelen.saborenlared.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public class IngredientDTO {
        private Long idIngredient;
        private String ingredientName;
    }

