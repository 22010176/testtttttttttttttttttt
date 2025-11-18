package CustomerServer.services;

import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;

import CustomerServer.dto.aws.AwsSecret;
import CustomerServer.dto.aws.S3Config;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
  private final S3Client s3Client;
  private final S3Config s3Config;

  public S3Service(S3Client s3Client, AwsSecret aws) {
    this.s3Client = s3Client;
    this.s3Config = aws.getS3();

    try {
      s3Client.createBucket(CreateBucketRequest
          .builder()
          .bucket(s3Config.getBucketName())
          .build());
    } catch (Exception e) {
    }
  }

  public void uploadFile(String key, String content) {

    // s3Client.putObject(PutObjectRequest.builder()
    // .bucket(s3Config.getBucketName())
    // .key(key)
    // .build(),
    // RequestBody.fromBytes(content.getBytes(StandardCharsets.UTF_8)));
  }

  public String readFile(String key) {
    // var response = s3Client.getObjectAsBytes(GetObjectRequest.builder()
    // .bucket(s3Config.getBucketName())
    // .key(key)
    // .build()).asByteArray();

    // return new String(response, StandardCharsets.UTF_8);
    return "";
  }

}
