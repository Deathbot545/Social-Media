package com.eadcw.status;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/status")
@RequiredArgsConstructor
public class StatusController {
  private final StatusService statusService;

  @GetMapping("/")
  public List<StatusResponse> getAllStatus(){
    return statusService.getAllStatus();
  }

  @PostMapping("/")
  public Status createStatus(@RequestBody Status status){
    return statusService.createStatus(status);
  }

  @DeleteMapping("/delete/{id}")
  public void deleteStatus(@PathVariable("id") String id){
    statusService.deleteStatus(id);
  }
}
