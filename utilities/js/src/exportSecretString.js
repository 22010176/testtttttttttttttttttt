const fs = require('fs')
const path = require('path')

const data = require('../data/aws_secret.json')

const secretString = `"${JSON.stringify(data).replaceAll("\"", "\\\"")}"`
const script = `
aws --endpoint-url=http://localhost:4566 secretsmanager --region us-east-1 delete-secret --secret-id local/credentials --force-delete-without-recovery

aws --endpoint-url=http://localhost:4566 secretsmanager --region us-east-1 create-secret --name local/credentials --secret-string ${secretString}

aws --endpoint-url=http://localhost:4566 secretsmanager --region us-east-1 get-secret-value --secret-id local/credentials
`

fs.writeFileSync(path.join(__dirname, "..\\..\\scripts\\init-aws.cmd"), script)