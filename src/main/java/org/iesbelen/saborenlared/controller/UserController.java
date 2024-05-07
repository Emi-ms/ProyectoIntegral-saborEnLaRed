package org.iesbelen.saborenlared.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.saborenlared.constantes.SaborEnLaRedConstantes;
import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.security.CustomerDatailsService;
import org.iesbelen.saborenlared.service.ServiceImpl.UserServiceImpl;
import org.iesbelen.saborenlared.util.ProyectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

//    @Value("${cors.origin}")
//    private String corsOrigin;

    private final UserServiceImpl userService;

    @Autowired
    private CustomerDatailsService customerDatailsService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registrarUsuario(@RequestBody(required = true) Map<String, String> requestMap) {
        System.out.println(requestMap.toString());
        try {

            return userService.signUp(requestMap);
        } catch (Exception e) {
            e.printStackTrace();

        }
        return ProyectUtils.getResponseEntity(SaborEnLaRedConstantes.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUsuario(@RequestBody(required = true) Map<String, String> requestMap) {
        System.out.println(requestMap.toString());
        try {

            return userService.login(requestMap);
        } catch (Exception e) {
            e.printStackTrace();

        }
        return ProyectUtils.getResponseEntity(SaborEnLaRedConstantes.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal) {

        return (User) this.customerDatailsService.loadUserByUsername(principal.getName());
    }


    @GetMapping({"", "/"})
    public List<User> all() {
        log.info("Accediendo a todas los usuarios");
        return this.userService.all();
    }


    @GetMapping("/{id}")
    public User one(@PathVariable("id") Long id) {
        return this.userService.one(id);
    }

    @PutMapping("/{id}")
    public User replaceUSer(@PathVariable("id") Long id, @RequestBody User user) {
        return this.userService.replace(id, user);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        System.out.println("Borrando usuario con id: " + id);
        this.userService.delete(id);
    }
}
