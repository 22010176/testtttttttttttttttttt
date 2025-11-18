const fs = require('fs')
const path = require('path')

function exportAwsSecret(src, name) {
  const data = require(src)
  const secretString = `"${JSON.stringify(data).replaceAll("\"", "\\\"")}"`
  // const secret_name = prod ? "prod/credentials" : "local/credentials"
  const script = `
  aws --endpoint-url=http://localhost:4566 secretsmanager --region us-east-1 delete-secret --secret-id ${name} --force-delete-without-recovery
  
  aws --endpoint-url=http://localhost:4566 secretsmanager --region us-east-1 create-secret --name ${name} --secret-string ${secretString}
  
  aws --endpoint-url=http://localhost:4566 secretsmanager --region us-east-1 get-secret-value --secret-id ${name}
  `

  fs.writeFileSync(path.join(__dirname, `..\\..\\scripts\\init-aws-${name}.cmd`), script)

}

exportAwsSecret('../data/aws_secret.prod.json', 'prod')
exportAwsSecret('../data/aws_secret.json', 'dev')