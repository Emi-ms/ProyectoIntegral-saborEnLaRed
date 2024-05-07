package org.iesbelen.saborenlared.service.ServiceImpl;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.saborenlared.constantes.SaborEnLaRedConstantes;
import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.exeption.UserNotFoundException;
import org.iesbelen.saborenlared.repository.UserRepository;
import org.iesbelen.saborenlared.security.CustomerDatailsService;
import org.iesbelen.saborenlared.security.jwt.JwtUtil;
import org.iesbelen.saborenlared.service.UserService;
import org.iesbelen.saborenlared.util.ProyectUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CustomerDatailsService customerDatailsService;
    @Autowired
    private JwtUtil jwtUtil;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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
        return this.userRepository.findById(id).map(p -> (id.equals(user.getIdUser()) ?
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


    @Override
    public User saveUser(User user) throws Exception {
        User userLocal = userRepository.findByEmail(user.getEmail());
        if (userLocal != null) {
            System.out.println("El usuario ya existe");
            throw new Exception("El usuario ya está en la base de datos");
        } else {
            userLocal = userRepository.save(user);
        }
        return userLocal;
    }

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Registro interno de un usuario {}", requestMap);

        try {
            if (validateSignUpMap(requestMap)) {
                User user = userRepository.findByEmail(requestMap.get("email"));

                if (Objects.isNull(user)) {
                    userRepository.save(getUserFromMap(requestMap));
                    userRepository.flush();
                    log.info("Usuario registrado con éxito");
                    return ProyectUtils.getResponseEntity("Usuario registrado con éxito", HttpStatus.OK);
                } else {
                    log.info("El usuario con el email ya existe");
                    return ProyectUtils.getResponseEntity("El usuario con el email ya existe", HttpStatus.BAD_REQUEST);
                }
            } else {
                return ProyectUtils.getResponseEntity(SaborEnLaRedConstantes.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error("Error en signUp", e);
        }
        return ProyectUtils.getResponseEntity(SaborEnLaRedConstantes.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Dentro de login");


        try {
            System.out.println(requestMap.get("email") + " " + requestMap.get("password"));
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password"))
            );

            if (authentication.isAuthenticated()) {
                if (customerDatailsService.getUserDetail().isEnabled()) {
                    return new ResponseEntity<String>("{\"token\":\"" +
                            jwtUtil.generateToken(customerDatailsService.getUserDetail().getEmail(),
                                    customerDatailsService.getUserDetail().getRol()) + "\"}",
                            HttpStatus.OK);
                } else {
                    return new ResponseEntity<String>("{\"mensaje\":\"" + "Espere la aprobacion" + "\"}",
                            HttpStatus.BAD_REQUEST);
                }

            }
        } catch (Exception exception) {
            log.error("{ }", exception);
        }
        return new ResponseEntity<String>("{\"mensaje\":\"" + "Credenciales incorrectas" + "\"}",
                HttpStatus.BAD_REQUEST);
    }

    private boolean validateSignUpMap(Map<String, String> requestMap) {
        return requestMap.containsKey("userName") && requestMap.containsKey("userSurname") && requestMap.containsKey("email") && requestMap.containsKey("password");
    }

    private User getUserFromMap(Map<String, String> requestMap) {
        User user = new User();
        user.setUserName(requestMap.get("userName"));
        user.setUserSurname(requestMap.get("userSurname"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(requestMap.get("password"));
        user.setActive(true);
        user.setRol("NORMAL_USER");
        return user;
    }

}
