using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Formats.Png;
using System.Text;
using System.Threading.Tasks;

namespace TestServer.Utilities;

public class RandomGenerator
{
  private static readonly Random random = new();
  readonly static string chars =
  "abcdefghijklmnopqrstuvwxyz"
  + "abcdefghijklmnopqrstuvwxyz".ToUpper()
  + "0123456789";

  public static string GenerateRandomEmail()
  {
    string[] domains = ["example.com", "test.org", "mail.net", "domain.io", "random.co"];
    string username = GenerateRandomString(8, 15); // Generate username between 8 and 15 characters
    string domain = domains[random.Next(domains.Length)];

    return $"{username}@{domain}";
  }

  public static string GenerateRandomPhoneNumber()
  {
    // Generate a random 3-digit area code (e.g., 200-999)
    int areaCode = random.Next(200, 1000);

    // Generate a random 3-digit central office code (e.g., 200-999)
    int centralOfficeCode = random.Next(200, 1000);

    // Generate a random 4-digit line number (e.g., 0000-9999)
    int lineNumber = random.Next(0, 10000);

    // Format the phone number
    return $"({areaCode}) {centralOfficeCode}-{lineNumber:D4}";
  }

  public static string GenerateRandomString(int minLength, int maxLength)
  {
    int length = random.Next(minLength, maxLength + 1);
    StringBuilder sb = new();

    for (int i = 0; i < length; i++)
    {
      sb.Append(chars[random.Next(chars.Length)]);
    }

    return sb.ToString();
  }

  public static async Task<MemoryStream> GenerateRandomImageStream(int width, int height)
  {
    var memoryStream = new MemoryStream();

    using (var image = new Image<Rgba32>(width, height))
    {
      // Thread-safe Random per thread
      var threadRandom = new ThreadLocal<Random>(() => new Random(Guid.NewGuid().GetHashCode()));

      await Parallel.ForAsync(0, height, async (y, c) =>
      {
        var rand = threadRandom.Value;

        for (int x = 0; x < width; x++)
        {
          image[x, y] = new Rgba32((byte)rand!.Next(256), (byte)rand!.Next(256), (byte)rand!.Next(256));
        }
      });

      image.Save(memoryStream, new PngEncoder());
    }

    memoryStream.Position = 0;
    return memoryStream;
  }

  public static DateTime RandomUtcDate(DateTime start, DateTime end)
  {
    if (start > end) throw new ArgumentException("start must be earlier than end");

    var rand = new Random();
    var range = end - start; // TimeSpan
    var randomTicks = (long)(rand.NextDouble() * range.Ticks);

    return start.AddTicks(randomTicks).ToUniversalTime();
  }
}
