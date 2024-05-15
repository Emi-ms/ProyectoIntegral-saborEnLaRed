package org.iesbelen.saborenlared.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.iesbelen.saborenlared.auth.UserRequest;
import org.iesbelen.saborenlared.auth.UserResponse;
import org.iesbelen.saborenlared.domain.Comment;
import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.exeption.UserNotFoundException;
import org.iesbelen.saborenlared.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.iesbelen.saborenlared.dto.UserDTO;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CommentService commentService;

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {

        User user = User.builder()
                .idUser(userRequest.getId())
                .userName(userRequest.getUserName())
                .userSurname(userRequest.getUserSurname())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .rol(userRequest.getRol())
                .active(userRequest.isActive())
                .build();

        userRepository.updateUser(user.getIdUser(), user.getUsername(), user.getUserSurname(), user.getEmail(), user.getPassword());

        return new UserResponse("El usuario se actualizó correctamente");
    }

    public UserDTO getUser(Long id) {
        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
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

    public List<User> all() {
        return this.userRepository.findAll();
    }

    public User save(User user) {
        return this.userRepository.save(user);
    }

    public User one(Long id) {

        return this.userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

    }

    public User replace(Long id, User user) {
        return this.userRepository.findById(id).map(u -> (id.equals(user.getIdUser()) ?
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
}
