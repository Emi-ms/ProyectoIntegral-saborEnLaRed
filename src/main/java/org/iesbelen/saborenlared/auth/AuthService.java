package org.iesbelen.saborenlared.auth;

import lombok.RequiredArgsConstructor;
import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.exeption.EmailDuplicateException;
import org.iesbelen.saborenlared.jwt.JwtService;
import org.iesbelen.saborenlared.repository.UserRepository;
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
    private  final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {

        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new EmailDuplicateException("El email ya se encuentra registrado");
        }

        User user = User.builder()
                .userName(request.getUserName())
                .userSurname(request.getUserSurname())
                .email(request.getEmail())
                .password(passwordEncoder.encode( request.getPassword()))
                .rol("NORMAL_USER")
                .active(true)
                .build();

        userRepository.save(user);
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        System.out.println(user);
        String token = jwtService.getToken(user);

        return new AuthResponse(token,user);
    }


}