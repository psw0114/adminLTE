package com.example.demo.config;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class ThUtil {
  public HttpServletRequest getRequest() {
    return Context.getRequest();
  }

  public String getRequestURI() {
    return Context.getRequestURI();
  }

  public String getQueryString() {
    return Context.getQeuryString();
  }


  public String getCookie(String name) {
    return Context.getCookie(name);
  }

  public HttpServletResponse getResponse() {
    return Context.getResponse();
  }

  public String format(LocalDateTime dateTime, String pattern) {
    return dateTime.format(DateTimeFormatter.ofPattern(pattern));
  }

}
