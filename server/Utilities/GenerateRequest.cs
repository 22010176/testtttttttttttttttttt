using System.Text;
using System.Text.Json;

namespace Utilities;

public static class GenerateRequest
{
  readonly static HttpClient _http = new();
  public static async Task<string> CreateRequest<T>(T data, string url, RequestMethod method)
  {
    var json = JsonSerializer.Serialize(data, options: new()
    {
      PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    });
    var content = new StringContent(json, Encoding.UTF8, "application/json");
    HttpResponseMessage? response = null;
    switch (method)
    {
      case RequestMethod.POST:
        response = await _http.PostAsync(url, content);
        break;
      case RequestMethod.PUT:
        response = await _http.PutAsync(url, content);
        break;
      case RequestMethod.GET:
      case RequestMethod.DELETE:
      default:
        // response = await _http.DeleteAsync(url);
        break;
    }

    if (response == null) return "\n";
    return await response.Content.ReadAsStringAsync();
  }
}

public enum RequestMethod
{
  GET,
  POST,
  PUT,
  DELETE
}