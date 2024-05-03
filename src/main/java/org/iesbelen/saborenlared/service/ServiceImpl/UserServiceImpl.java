package org.iesbelen.saborenlared.service.ServiceImpl;

import org.iesbelen.saborenlared.domain.User;
import org.iesbelen.saborenlared.exeption.UserNotFoundException;
import org.iesbelen.saborenlared.repository.UserRepository;
import org.iesbelen.saborenlared.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

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
        User userLocal = userRepository.findUserByEmail(user.getEmail());
        if (userLocal != null) {
            System.out.println("El usuario ya existe");
            throw new Exception("El usuario ya está en la base de datos");
        } else {
            userLocal = userRepository.save(user);
        }
        return userLocal;
    }


}
