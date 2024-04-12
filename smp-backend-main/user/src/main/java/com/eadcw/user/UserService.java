package com.eadcw.user;

import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository repo;

  public List<User> getAllUsers(){
    return repo.findAll();
  }
  public User getUserById(String id) {

    return repo.findById(new ObjectId(id)).orElse(User.builder().build());
  }

  public User getUserByEmail(String email){
    return repo.findByEmail(email).orElse(User.builder().build());
  }

  public User updateUser(User user){
    return repo.save(user);
  }
  public User registerUser( User user){
    user.setJoinedDate(new SimpleDateFormat("dd.MM.yyyy").format(new Date()));
    user.setActive(false);
    return repo.save(user);
  }
}
