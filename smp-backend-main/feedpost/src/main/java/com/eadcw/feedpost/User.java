package com.eadcw.feedpost;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
  private String firstname;
  private String lastname;
  private String imageURL;
}
