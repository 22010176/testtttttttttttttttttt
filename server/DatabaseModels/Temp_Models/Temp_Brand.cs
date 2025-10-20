using System.Text.Json.Serialization;

namespace DatabaseModels.Temp_Models;

public class Temp_Brand
{
  [JsonPropertyName("category_id")]
  public int Category_id { get; set; }

  [JsonPropertyName("category_name")]
  public string? Category_name { get; set; }
}