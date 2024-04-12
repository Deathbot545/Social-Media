package com.eadcw.user;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;

@Data
@Builder
@Document(collection = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
  @JsonSerialize(using = ToStringSerializer.class)
  @MongoId(FieldType.OBJECT_ID)
  private ObjectId id;
  private String firstname;
  private String lastname;
  private String email;
  private String password;
  private String imageURL;
  private boolean active;
  private String joinedDate;
}
