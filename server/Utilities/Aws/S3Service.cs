using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;

namespace Utilities.Aws;

public class S3Service
{
  private AmazonS3Client S3Client { get; set; }
  private readonly string _bucketName;
  private readonly AwsSettings param;

  public S3Service(AwsSettings settings, S3Config config)
  {
    var s3Config = new AmazonS3Config
    {
      RegionEndpoint = RegionEndpoint.GetBySystemName(config.Region)
    };

    if (!string.IsNullOrEmpty(settings.ServiceURL))
    {
      s3Config.ServiceURL = settings.ServiceURL;
      s3Config.ForcePathStyle = true;
    }
    S3Client = new AmazonS3Client(settings.AccessKey, settings.SecretKey, s3Config);
    _bucketName = config.BucketName;

    param = settings;
  }

  public async Task CreateBucket(string bucketName)
  {
    await S3Client.PutBucketAsync(new PutBucketRequest
    {
      BucketName = bucketName
    });
  }

  public async Task<string?> UploadFileAsync(IFormFile? file)
  {
    try
    {
      await CreateBucket(_bucketName!);
    }
    catch (Exception)
    {
      throw;
    }
    if (file == null) return null;
    var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);

    using var stream = file.OpenReadStream();
    var uploadRequest = new TransferUtilityUploadRequest
    {
      InputStream = stream,
      Key = fileName,
      BucketName = _bucketName,
      ContentType = file.ContentType,
      CannedACL = S3CannedACL.PublicRead // Optional: make file public
    };

    var fileTransferUtility = new TransferUtility(S3Client);
    await fileTransferUtility.UploadAsync(uploadRequest);

    return !string.IsNullOrEmpty(param.ServiceURL) ?
      $"{param.ServiceURL}/{_bucketName}/{fileName}" :
      $"https://{_bucketName}.s3.amazonaws.com/{fileName}";
  }

  public async Task<bool> DeleteFileAsync(string key)
  {
    try
    {
      var request = new DeleteObjectRequest
      {
        BucketName = _bucketName,
        Key = key
      };
      await S3Client.DeleteObjectAsync(request);
      return true;
    }
    catch (AmazonS3Exception ex)
    {
      Console.WriteLine($"[S3 ERROR] {ex.Message}");
      return false;
    }
  }

}

