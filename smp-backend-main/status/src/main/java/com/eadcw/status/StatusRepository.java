package com.eadcw.status;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface StatusRepository extends MongoRepository<Status, ObjectId> {
  void deleteByCreatedAtBefore(Date date);
}

