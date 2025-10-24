using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Utilities;

public static class JsonSeeder
{
  public static async Task SeedFromJSON<T1, T2>(DbContext context, string filePath, Func<T1, T2> mapper)
  where T1 : class
  where T2 : class
  {
    if (!File.Exists(filePath))
    {
      Console.WriteLine($"⚠️ File not found: {filePath}");
      return;
    }

    if (context.Set<T1>().Any())
    {
      Console.WriteLine($"✅ {typeof(T1).Name} already seeded.");
      return;
    }
    string json = await File.ReadAllTextAsync(filePath);
    var data = JsonSerializer.Deserialize<List<T1>>(json);

    if (data == null || data.Count == 0)
    {
      Console.WriteLine($"⚠️ No data found in {filePath}");
      return;
    }

    await context.Set<T2>().AddRangeAsync(data.Select(i => mapper(i)));
    await context.SaveChangesAsync();
    Console.WriteLine($"🌱 Seeded {data.Count} records for {typeof(T1).Name} from {Path.GetFileName(filePath)}");
  }

  public static async Task SeedFromJSON<T>(DbContext context, string filePath)
  where T : class
  {
    if (!File.Exists(filePath))
    {
      Console.WriteLine($"⚠️ File not found: {filePath}");
      return;
    }

    if (context.Set<T>().Any())
    {
      Console.WriteLine($"✅ {typeof(T).Name} already seeded.");
      return;
    }
    string json = await File.ReadAllTextAsync(filePath);
    Console.WriteLine(json);
    var data = JsonSerializer.Deserialize<List<T>>(json);

    if (data == null || data.Count == 0)
    {
      Console.WriteLine($"⚠️ No data found in {filePath}");
      return;
    }

    await context.Set<T>().AddRangeAsync(data);
    await context.SaveChangesAsync();
    Console.WriteLine($"🌱 Seeded {data.Count} records for {typeof(T).Name} from {Path.GetFileName(filePath)}");
  }
}