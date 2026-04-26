// api-gateway-java/src/main/java/com/example/apigateway/ApiGatewayApplication.java
package com.example.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@RestController
public class ApiGatewayApplication {

    private final RestTemplate restTemplate = new RestTemplate();
    // URLs for other services. Docker Compose lets us use the service name.
    private final String goServiceUrl = "http://data-service-go:8081";
    private final String pythonServiceUrl = "http://trend-service-python:5000";

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @GetMapping("/api/data")
    public ResponseEntity<?> getCropData(@RequestParam String crop, @RequestParam String region) {
        // 1. Get historical data from the Go service
        String url = goServiceUrl + "/prices/" + crop + "/" + region;
        ResponseEntity<Object[]> pricesResponse = restTemplate.getForEntity(url, Object[].class);
        Object[] prices = pricesResponse.getBody();

        // 2. Get trend prediction from the Python service
        Map<String, Object[]> requestBody = new HashMap<>();
        requestBody.put("prices", prices);
        Object trend = restTemplate.postForObject(pythonServiceUrl + "/predict", requestBody, Object.class);

        // 3. Combine results and send back to the frontend
        Map<String, Object> finalResponse = new HashMap<>();
        finalResponse.put("historical", prices);
        finalResponse.put("trend", trend);

        return ResponseEntity.ok(finalResponse);
    }

    // This Bean is to allow our React app (on port 3000) to talk to this server (on port 8080)
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
