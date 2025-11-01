package CustomerServer.services;

import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;

import CustomerServer.config.S3Config;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
  private final S3Client s3Client;
  private final String bucketName;

  public S3Service(S3Client s3Client, S3Config s3Config) {
    this.s3Client = s3Client;
    this.bucketName = s3Config.getBucketName();

    try {
      s3Client.createBucket(CreateBucketRequest
          .builder()
          .bucket(bucketName)
          .build());
    } catch (Exception e) {
    }
  }

  public void uploadFile(String key, String content) {
    s3Client.putObject(PutObjectRequest.builder()
        .bucket(bucketName)
        .key(key)
        .build(),
        RequestBody.fromBytes(content.getBytes(StandardCharsets.UTF_8)));
  }

  public String readFile(String key) {
    var response = s3Client.getObjectAsBytes(GetObjectRequest.builder()
        .bucket(bucketName)
        .key(key)
        .build()).asByteArray();

    return new String(response, StandardCharsets.UTF_8);
  }

}
