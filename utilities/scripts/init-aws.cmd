
aws --endpoint-url=http://localhost:4566 secretsmanager delete-secret --secret-id local/credentials --force-delete-without-recovery

aws --endpoint-url=http://localhost:4566 secretsmanager create-secret --name local/credentials --secret-string "{\"username\":\"postgres\",\"password\":\"admin\",\"host\":\"localhost\",\"port\":5432,\"dbname\":\"TMDT\",\"bucketName\":\"tmdt-bucket\"}"

aws --endpoint-url=http://localhost:4566 secretsmanager get-secret-value --secret-id local/credentials
