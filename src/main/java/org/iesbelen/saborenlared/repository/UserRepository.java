package org.iesbelen.saborenlared.repository;

import org.iesbelen.saborenlared.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(@Param("email") String email);

    @Modifying()
    @Query("update User u set u.userName=:userName, u.userSurname=:userSurname, u.email=:email, u.password=:password, u.rol=:rol where u.id = :id")
    void updateUser(@Param(value = "id") Long id, @Param(value = "userName") String userName, @Param(value = "userSurname") String userSurname, @Param(value = "email") String email, @Param(value = "password") String password, @Param(value = "rol") String rol);
}

