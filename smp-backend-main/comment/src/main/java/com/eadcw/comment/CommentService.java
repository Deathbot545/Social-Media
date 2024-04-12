package com.eadcw.comment;

import com.eadcw.comment.client.UserClient;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

  private final CommentRepository repo;
  private final UserClient userClient;

  public Comment postComment(String postId,Comment comment){
    comment.setPostid(postId);
    comment.setCommentDate(new SimpleDateFormat("dd.MM.yyyy HH:mm").format(new Date()));
    var res = repo.save(comment);
    return res;
  }

  public List<CommentResponse> getAllCommentsOfPost(String postId){
    Sort sort = Sort.by(Sort.Direction.DESC,"id");
    List<Comment> comments = repo.findByPostId(postId,sort);
    List<CommentResponse> commentResponses = new ArrayList<>();

    for(Comment comment:comments){
      User user = userClient.getUserOfTheComment(comment.getUserid());
      CommentResponse resComment = generateCommentResponse(comment,user);
      commentResponses.add(resComment);
    }
    return commentResponses;
  }

  public void deleteComment(String commentId){
    repo.deleteById(new ObjectId(commentId));
  }


  private CommentResponse generateCommentResponse(Comment comment,User user){
    return CommentResponse.builder()
            .commentId(String.valueOf(comment.getId()))
            .commentContent(comment.getContent())
            .commentDate(comment.getCommentDate())
            .postId(comment.getPostid())
            .userId(comment.getUserid())
            .userFirstname(user.getFirstname())
            .userLastname(user.getLastname())
            .userImgURL(user.getImageURL())
            .build();
  }

}
