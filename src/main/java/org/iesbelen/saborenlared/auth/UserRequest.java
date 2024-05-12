package org.iesbelen.saborenlared.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private Long id;
    private String userName;
    private String userSurname;
    private String email;
    private String password;
    private String rol;
    private boolean active;
}