package org.iesbelen.saborenlared.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.iesbelen.saborenlared.auth.UserRequest;
import org.iesbelen.saborenlared.auth.UserResponse;


import org.iesbelen.saborenlared.domain.Category;
import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.dto.UserDTO;
import org.iesbelen.saborenlared.service.UserService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "${cors.origin}")
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    @Value("${cors.origin}")
    private String corsOrigin;

    private final UserService userService;

    @GetMapping(value = "{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id)
    {
        UserDTO userDTO = userService.getUser(id);
        if (userDTO==null)
        {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping()
    public ResponseEntity<UserResponse> updateUser(@RequestBody UserRequest userRequest)
    {
        return ResponseEntity.ok(userService.updateUser(userRequest));
    }


    @GetMapping({"", "/"})
    public List<UserDTO> all() {
        log.info("Accediendo a todos los usuarios");
        return this.userService.all();
    }

    @GetMapping({"/users-actives"})
    public ResponseEntity<?> allActive(){
        log.info("Accediendo a todos los usuarios activos");
        return new ResponseEntity<>(userService.AllActiveUser(), HttpStatus.OK);
    }


    @GetMapping("/user/{id}")
    public User one(@PathVariable("id") Long id) {
        return this.userService.one(id);
    }

    @PostMapping({"", "/"})
    public User newUser(@RequestBody User user) {
        System.out.println(user);
        return this.userService.save(user);
    }

    @PutMapping("/{id}")
    public User replaceUSer(@PathVariable("id") Long id, @RequestBody User user) {
        return this.userService.replace(id, user);
    }

    @PutMapping("/logic-delete/{id}")
    public ResponseEntity<UserDTO> deactivateUser(@PathVariable Long id){
        User deactivateUser = userService.logicDelete(id);
        UserDTO userDTO = userService.getUser(deactivateUser.getId());
        return ResponseEntity.ok(userDTO);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        System.out.println("Borrando usuario con id: " + id);
        this.userService.delete(id);
    }
}
