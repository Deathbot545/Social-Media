package com.eadcw.comment;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, ObjectId> {

  @Query("{postid:?0}")
  List<Comment> findByPostId(String id,Sort sort);
}
