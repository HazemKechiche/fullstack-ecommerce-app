package com.example.ourstoretn.repositories;

import com.example.ourstoretn.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepo extends JpaRepository<User,Long> {
    public User findUserByEmail(String Email);
}
