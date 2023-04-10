package hu.muscles.desktop.requestsender;

import hu.muscles.desktop.models.LoginModel;
import org.apache.hc.client5.http.classic.HttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClientBuilder;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

public class RequestSender {

    public RequestSender() {
    }

    public String sendRequest(RestTemplate restTemplate, LoginModel loginModel, HttpMethod httpMethod, String url) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(loginModel.getLoginData().getTokens().getAccessToken());
            HttpEntity<String> requestEntity = new HttpEntity<>(null, headers);
            restTemplate = new RestTemplate();
            restTemplate = getPATCHRestTemplate(restTemplate, httpMethod);
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, httpMethod, requestEntity, String.class);
            return responseEntity.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    public RestTemplate getPATCHRestTemplate(RestTemplate restTemplate, HttpMethod httpMethod) {
        if (httpMethod == HttpMethod.PATCH) {
            HttpClient httpClient = HttpClientBuilder.create().build();
            HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory(httpClient);
            restTemplate = new RestTemplate(factory);
        }
        return restTemplate;
    }

    public InputStream sendGet(String urlString, LoginModel loginModel) throws IOException {
        URL url = new URL(urlString);
        URLConnection connection = url.openConnection();
        String authToken = loginModel.getLoginData().getTokens().getAccessToken();
        connection.setRequestProperty("Authorization", "Bearer " + authToken);
        connection.setConnectTimeout(20000);
        connection.connect();
        return connection.getInputStream();
    }
}