package com.eadcw.feedpost;

import com.eadcw.feedpost.client.UserClient;
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
public class PostService {

  private final PostRepository repo;
  private final UserClient userClient;

  public List<PostResponse> getAllPosts(){
    Sort sort = Sort.by(Sort.Direction.DESC,"id");
    List<Post> posts = repo.findAll(sort);
    List<PostResponse> postResponses = new ArrayList<>();

    for(Post post:posts){
      User user = userClient.getUserOfThePost(post.getUserid());
      PostResponse  resPost = generatePostResponse(post,user);
      postResponses.add(resPost);
    }

    return postResponses;
  }

  public PostResponse getPostById(String id){
    Post post = repo.findById(new ObjectId(id)).orElse(Post.builder().build());
    User user = userClient.getUserOfThePost(post.getUserid());
    return generatePostResponse(post,user);
  }

 public Post createPost(Post post){
   post.setPostDate(new SimpleDateFormat("dd.MM.yyyy 'at' HH:mm").format(new Date()));
   return repo.save(post);
 }

 public void deletePost(String id){
    repo.deleteById(new ObjectId(id));
 }

 private PostResponse generatePostResponse(Post post,User user){
   return PostResponse.builder()
           .userFirstname(user.getFirstname())
           .userLastname(user.getLastname())
           .userImgURL(user.getImageURL())
           .postId(String.valueOf(post.getId()))
           .postText(post.getText())
           .postImgURL(post.getImgURL())
           .postDate(post.getPostDate())
           .build();
 }
}
