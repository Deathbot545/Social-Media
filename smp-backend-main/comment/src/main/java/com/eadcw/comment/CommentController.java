package com.eadcw.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

  private final CommentService commentService;
  @GetMapping(value="/post/{postId}")
  public List<CommentResponse> getAllCommentsOfPost(@PathVariable("postId") String postId){
    return commentService.getAllCommentsOfPost(postId);
  }

  @PostMapping(value="/post/{postId}")
  public Comment postComment(@PathVariable("postId") String postId, @RequestBody Comment comment){
   return commentService.postComment(postId,comment);
  }

  @DeleteMapping(value="/delete/{commentId}")
  public void deleteComment(@PathVariable("commentId") String commentId){
    commentService.deleteComment(commentId);
  }
}
