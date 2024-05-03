package org.iesbelen.saborenlared.repository;

import org.iesbelen.saborenlared.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository  extends JpaRepository<User,Long> {
    public User findUserByEmail(String email);
}
