package com.eadcw.feedpost;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class FeedpostApplication {

	public static void main(String[] args) {
		SpringApplication.run(FeedpostApplication.class, args);
	}

}
