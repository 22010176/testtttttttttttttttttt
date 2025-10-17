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
  private T data;
  private String message;
  private boolean success;

  public static <T> ResponseFormat<T> success(T data, String message) {
    return new ResponseFormat<>(data, message, true);
  }

  public static <T> ResponseFormat<T> fail(String message) {
    return new ResponseFormat<>(null, message, false);
  }
}
