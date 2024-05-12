package org.iesbelen.saborenlared.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.iesbelen.saborenlared.auth.UserRequest;
import org.iesbelen.saborenlared.auth.UserResponse;


import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.dto.UserDTO;
import org.iesbelen.saborenlared.service.UserService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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



//    @Value("${cors.origin}")
//    private String corsOrigin;




//    @GetMapping({"", "/"})
//    public List<User> all() {
//        log.info("Accediendo a todas los usuarios");
//        return this.userService.all();
//    }
//
//
//    @GetMapping("/{id}")
//    public User one(@PathVariable("id") Long id) {
//        return this.userService.one(id);
//    }
//
//    @PutMapping("/{id}")
//    public User replaceUSer(@PathVariable("id") Long id, @RequestBody User user) {
//        return this.userService.replace(id, user);
//    }
//
//    @ResponseBody
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    @DeleteMapping("/{id}")
//    public void deleteUser(@PathVariable("id") Long id) {
//        System.out.println("Borrando usuario con id: " + id);
//        this.userService.delete(id);
//    }
}
