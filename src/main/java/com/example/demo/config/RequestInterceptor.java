package com.example.demo.config;

import java.util.Arrays;
import java.util.HashMap;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RequestInterceptor implements HandlerInterceptor {
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    log.debug("------------------------------------preHandle------------------------------------");

    HashMap<String, String> param = new HashMap<>();

    request.getParameterMap().forEach((t, u) -> { param.put(t, Arrays.toString(u)); });

    log.info("Method: {}, URI: {}, ContentType: {}, Parameter: {}", request.getMethod(), request.getRequestURI(), request.getContentType(), param);

    return HandlerInterceptor.super.preHandle(request, response, handler);
  }

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    log.debug("------------------------------------postHandle------------------------------------");

    HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    log.debug("------------------------------------afterCompletion------------------------------------");

    HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
  }

}
