const fs = require('fs')
const path = require('path')

const data = {
  database: {
    username: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    databaseName: 'TMDT',
  },
  s3: {
    bucketName: 'tmdt-bucket',
    region: 'us-east-1'
  }
}

const secretString = `"${JSON.stringify(data).replaceAll("\"", "\\\"")}"`
const script = `
aws --endpoint-url=http://localhost:4566 secretsmanager delete-secret --secret-id local/credentials --force-delete-without-recovery

aws --endpoint-url=http://localhost:4566 secretsmanager create-secret --name local/credentials --secret-string ${secretString}

aws --endpoint-url=http://localhost:4566 secretsmanager get-secret-value --secret-id local/credentials
`

fs.writeFileSync(path.join(__dirname, "..\\..\\scripts\\init-aws.cmd"), script)