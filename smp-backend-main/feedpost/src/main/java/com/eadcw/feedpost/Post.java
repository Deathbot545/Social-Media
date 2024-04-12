package com.eadcw.feedpost;

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
@Document(collection = "posts")
public class Post {
  @JsonSerialize(using = ToStringSerializer.class)
  @MongoId(FieldType.OBJECT_ID)
  private ObjectId id;
  private String userid;
  private String text;
  private String imgURL;
  private String postDate;
}
