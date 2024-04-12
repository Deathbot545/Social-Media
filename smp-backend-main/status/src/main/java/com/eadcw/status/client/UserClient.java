package com.eadcw.status.client;

import com.eadcw.status.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service",url="http://localhost:8070/api/v1/users")
public interface UserClient {
  @GetMapping("/{id}")
  User getUserOfTheStatus(@PathVariable("id") String id);
}
