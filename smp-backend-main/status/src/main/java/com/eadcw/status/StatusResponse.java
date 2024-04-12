package com.eadcw.status;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatusResponse {

  private String statusId;
  private String statusImgURL;
  private String statusTime;
  private String userFirstname;
  private String userImgURL;
}

