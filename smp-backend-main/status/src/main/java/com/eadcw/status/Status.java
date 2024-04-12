package com.eadcw.status;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Date;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "status")
public class Status {
  @JsonSerialize(using = ToStringSerializer.class)
  @MongoId(FieldType.OBJECT_ID)
  private ObjectId id;
  private String userid;
  private String imgURL;
  private String statusTime;
  @CreatedDate
  private Date createdAt;
}
