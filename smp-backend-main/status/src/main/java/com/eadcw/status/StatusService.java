package com.eadcw.status;

import com.eadcw.status.client.UserClient;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatusService {
  private final StatusRepository repo;
  private final UserClient userClient;

  public Status createStatus(Status status){
    status.setStatusTime(new SimpleDateFormat("HH:mm").format(new Date()));
    return repo.save(status);
  }

  public List<StatusResponse> getAllStatus(){
    Sort sort = Sort.by(Sort.Direction.DESC,"id");
    List<Status> statusList = repo.findAll(sort);
    List<StatusResponse> statusResponses = new ArrayList<>();
    for(Status status:statusList){
      System.out.println(status.getUserid());
      User user = userClient.getUserOfTheStatus(status.getUserid());
      StatusResponse res = generateStatusResponse(status,user);
      statusResponses.add(res);
    }
    return statusResponses;
  }

  public void deleteStatus(String id){
    repo.deleteById(new ObjectId(id));
  }

  @Scheduled(fixedRate = 86400000)
  public void deleteStatusAfter24Hours(){
    long t = System.currentTimeMillis() - (24*60*60*1000);
    repo.deleteByCreatedAtBefore(new Date(t));
  }

  private StatusResponse generateStatusResponse(Status status,User user){
    return StatusResponse.builder()
            .statusId(String.valueOf(status.getId()))
            .statusImgURL(status.getImgURL())
            .statusTime(status.getStatusTime())
            .userFirstname(user.getFirstname())
            .userImgURL(user.getImageURL())
            .build();
  }
}


