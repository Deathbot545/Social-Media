package com.eadcw.feedpost;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostResponse {
  private String postId;
  private String userFirstname;
  private String userLastname;
  private String userImgURL;
  private String postText;
  private String postImgURL;
  private String postDate;
}
