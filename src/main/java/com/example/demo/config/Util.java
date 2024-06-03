package com.example.demo.config;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

@Component
public class Util {
  public Boolean isEmpty(Object obj) {
    Boolean result = (obj == null);

    if (!result) {
      if (obj instanceof String) {
        result = ((String) obj).isBlank();
      }
    }

    return result;
  }

  public static class DateUtil {
    private String format;

    public DateUtil (String format) {
      this.format = format;
    }

    public LocalDateTime getLocalDateTime(String date, OffsetTime offsetTime) {
      try {
        return LocalDate.parse(date, DateTimeFormatter.ofPattern(this.format))
                        .atTime(offsetTime)
                        .toLocalDateTime();
      } catch (NullPointerException e) {
        return null;
      }
    }

    public LocalDateTime getLocalDateTime(String date, LocalDate localDate) {
      try {
        return LocalTime.parse(date, DateTimeFormatter.ofPattern(this.format)).atDate(localDate);
      } catch (NullPointerException e) {
        return null;
      }
    }

    public LocalDateTime getLocalDateTime(String date) {
      try {
        return LocalDateTime.parse(date, DateTimeFormatter.ofPattern(this.format));
      } catch (NullPointerException e) {
        return null;
      }
    }

  }

}
