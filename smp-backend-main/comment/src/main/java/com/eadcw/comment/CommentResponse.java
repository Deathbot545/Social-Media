package com.eadcw.comment;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponse {
  private String commentId;
  private String commentContent;
  private String commentDate;
  private String postId;
  private String userId;
  private String userFirstname;
  private String userLastname;
  private String userImgURL;
}

