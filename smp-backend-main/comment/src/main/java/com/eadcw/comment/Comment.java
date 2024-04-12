package com.eadcw.comment;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "comments")
public class Comment {
  @JsonSerialize(using = ToStringSerializer.class)
  @MongoId(FieldType.OBJECT_ID)
  private ObjectId id;
  private String postid;
  private String userid;
  private String content;
  private String commentDate;
}

