
aws --endpoint-url=http://localhost:4566 secretsmanager --region us-east-1 delete-secret --secret-id local/credentials --force-delete-without-recovery

aws --endpoint-url=http://localhost:4566 secretsmanager --region us-east-1 create-secret --name local/credentials --secret-string "{\"database\":{\"username\":\"postgres\",\"password\":\"admin\",\"host\":\"localhost\",\"port\":5432,\"databaseName\":\"TMDT\"},\"s3\":{\"bucketName\":\"tmdt-bucket\",\"region\":\"us-east-1\"}}"

aws --endpoint-url=http://localhost:4566 secretsmanager --region us-east-1 get-secret-value --secret-id local/credentials
