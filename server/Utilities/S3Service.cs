using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;

namespace Utilities;

public class S3Service
{
  private AmazonS3Client S3Client { get; set; }
  private readonly string _bucketName;
  private readonly S3ServiceParam param;

  public S3Service(S3ServiceParam s3ServiceParam)
  {
    var region = RegionEndpoint.GetBySystemName(s3ServiceParam.RegionEndpoint);
    var s3Config = new AmazonS3Config { RegionEndpoint = region };
    if (s3ServiceParam.UseLocalStack)
    {
      s3Config.ServiceURL = s3ServiceParam.ServiceURL;
      s3Config.ForcePathStyle = true;
    }
    S3Client = new AmazonS3Client(s3ServiceParam.AccessKey, s3ServiceParam.SecretKey, s3Config);
    _bucketName = s3ServiceParam.BucketName;

    param = s3ServiceParam;
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
    catch (System.Exception)
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

    return param.UseLocalStack ?
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

public struct S3ServiceParam
{
  public string RegionEndpoint { get; set; }
  public string AccessKey { get; set; }
  public string SecretKey { get; set; }
  public string BucketName { get; set; }
  public bool UseLocalStack { get; set; }
  public string ServiceURL { get; set; }
}