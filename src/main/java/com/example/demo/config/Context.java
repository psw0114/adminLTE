package com.example.demo.config;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Context {
  public static HttpServletRequest getRequest() {
    return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
  }

  public static String getRequestURI() {
    return Context.getRequest().getRequestURI();
  }

  public static String getQeuryString() {
    String qeuryString = Context.getRequest().getQueryString();

    if (qeuryString != null) {
       qeuryString = STR."?\{qeuryString}";
    } else {
      qeuryString = "";
    }

    return qeuryString;
  }

  public static String getCookie(String name) {
    String res = null;
    Cookie[] cookies = Context.getRequest().getCookies();

    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals(name)) {
          res = cookie.getValue();

          break;
        }
      };
    }

    return res;
  }

  public static void setErrorMsg(String errorMsg) {
    Context.getRequest().setAttribute("errorMsg", errorMsg);
  }

  public static String getErrorMsg() {
    return (String) Context.getRequest().getAttribute("errorMsg");
  }

  public static HttpServletResponse getResponse() {
    return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();
  }

  public static void addCookie(Cookie cookie) {
    Context.getResponse().addCookie(cookie);
  }

}
