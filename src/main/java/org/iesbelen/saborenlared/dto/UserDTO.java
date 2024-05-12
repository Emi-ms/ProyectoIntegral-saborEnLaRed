package org.iesbelen.saborenlared.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
