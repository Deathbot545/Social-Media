package com.eadcw.feedpost;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.DeclareError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

  private final PostService postService;
  @GetMapping("/")
  public List<PostResponse> getAllPosts(){
    return postService.getAllPosts();
  }

  @GetMapping("/{id}")
  public PostResponse getPostById(@PathVariable("id") String id){
    return postService.getPostById(id);
  }

  @PostMapping("/")
  public Post createPost(@RequestBody Post post) {

    return postService.createPost(post);
  }

  @DeleteMapping("/delete/{id}")
  public void deletePost(@PathVariable("id") String id){
    postService.deletePost(id);
  }
}
