package org.iesbelen.saborenlared.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.service.ServiceImpl.UserServiceImpl;
import org.iesbelen.saborenlared.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping({"","/"})
    public List<User> all() {
        log.info("Accediendo a todas las empresas");
        return this.userService.all();
    }

    @PostMapping({"","/"})
    public User newUser(@RequestBody User user) {
        System.out.println(user.toString());
        user.setActive(true);
        user.setRol("NORMAL_USER");
        return this.userService.save(user);
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