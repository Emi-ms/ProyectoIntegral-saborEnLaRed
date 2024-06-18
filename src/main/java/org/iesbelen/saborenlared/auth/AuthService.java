package org.iesbelen.saborenlared.auth;

import lombok.RequiredArgsConstructor;
import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.dto.UserDTO;
import org.iesbelen.saborenlared.exeption.EmailDuplicateException;
import org.iesbelen.saborenlared.jwt.JwtService;
import org.iesbelen.saborenlared.repository.UserRepository;
import org.iesbelen.saborenlared.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailDuplicateException("El email ya se encuentra registrado");
        }

        User user = User.builder()
                .userName(request.getUserName())
                .userSurname(request.getUserSurname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol("NORMAL_USER")
                .active(true)
                .build();

        userRepository.save(user);
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

    public ResponseEntity<?> login(LoginRequest request) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        if (!user.isActive()) {
            return new ResponseEntity<>("El usuario no esta activo", HttpStatus.NOT_IMPLEMENTED);
        }

        UserDTO userDTO = userService.getUser(user.getId());

        System.out.println(user);
        System.out.println(userDTO);
        String token = jwtService.getToken(user);

        return new ResponseEntity<>(new AuthResponse(token, userDTO), HttpStatus.OK);
    }


}
