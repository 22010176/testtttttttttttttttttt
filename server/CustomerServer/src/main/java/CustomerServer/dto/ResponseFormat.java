package CustomerServer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ResponseFormat<T> {
  public T data;
  public String message;
  public boolean success;

  public static <T> ResponseFormat<T> success(T data, String message) {
    return new ResponseFormat<>(data, message, true);
  }

  public static <T> ResponseFormat<T> success(T data) {
    return new ResponseFormat<>(data, "", true);
  }

  public static <T> ResponseFormat<T> success() {
    return new ResponseFormat<>(null, "", true);
  }

  public static <T> ResponseFormat<T> fail(T data, String message) {
    return new ResponseFormat<>(data, message, false);
  }

  public static <T> ResponseFormat<T> fail(T data) {
    return new ResponseFormat<>(data, "", false);
  }

  public static <T> ResponseFormat<T> fail() {
    return new ResponseFormat<>(null, "", false);
  }
}
