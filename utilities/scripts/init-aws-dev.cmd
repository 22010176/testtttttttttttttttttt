
  aws --endpoint-url=http://localhost:4566 secretsmanager --region us-east-1 delete-secret --secret-id dev --force-delete-without-recovery
  
  aws --endpoint-url=http://localhost:4566 secretsmanager --region us-east-1 create-secret --name dev --secret-string "{\"database\":{\"username\":\"postgres\",\"password\":\"admin\",\"host\":\"localhost\",\"port\":5432,\"databaseName\":\"TMDT\"},\"s3\":{\"bucketName\":\"tmdt-bucket\",\"region\":\"us-east-1\"},\"VNPAY\":{\"TmnCode\":\"\",\"HashSecret\":\"\",\"Url\":\"https://sandbox.vnpayment.vn/paymentv2/vpcpay.html\",\"ReturnUrl\":\"\"},\"MailSettings\":{\"SmtpServer\":\"smtp.gmail.com\",\"Port\":587,\"SenderName\":\"ThuongMaiDienTu\",\"SenderEmail\":\"dnam45910@gmail.com\",\"Username\":\"dnam45910@gmail.com\",\"Password\":\"\"},\"Jwt\":{\"Key\":\"your_super_secret_key_123456\",\"Issuer\":\"yourapp\",\"Audience\":\"yourapp_users\"}}"
  
  aws --endpoint-url=http://localhost:4566 secretsmanager --region us-east-1 get-secret-value --secret-id dev
  