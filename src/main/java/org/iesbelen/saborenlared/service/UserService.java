package org.iesbelen.saborenlared.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.iesbelen.saborenlared.auth.UserRequest;
import org.iesbelen.saborenlared.auth.UserResponse;
import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.iesbelen.saborenlared.dto.UserDTO;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {

        User user = User.builder()
                .idUser(userRequest.getId())
                .userName(userRequest.getUserName())
                .userSurname(userRequest.getUserSurname())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode( userRequest.getPassword()))
                .rol(userRequest.getRol())
                .active(userRequest.isActive())
                .build();

        userRepository.updateUser(user.getIdUser(), user.getUsername(), user.getUserSurname(), user.getEmail(),user.getPassword());

        return new UserResponse("El usuario se actualizó correctamente");
    }

    public UserDTO getUser(Long id) {
        User user= userRepository.findById(id).orElse(null);

        if (user!=null)
        {
            UserDTO userDTO = UserDTO.builder()
                    .id(user.getIdUser())
                    .userName(user.getUsername())
                    .userSurname(user.getUserSurname())
                    .email(user.getEmail())
                    .password(user.getPassword())
                    .rol(user.getRol())
                    .active(user.isActive())
                    .build();
            return userDTO;
        }
        return null;
    }
}
