package org.iesbelen.saborenlared.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.iesbelen.saborenlared.domain.Recipe;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String userName;
    private String userSurname;
    private String email;
    private String password;
    private String rol;
    private boolean active;
    private List<RecipeDTO> recipes;
}
