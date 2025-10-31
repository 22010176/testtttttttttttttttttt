cd ../../server

@REM Remove-Item -Recurse -Force -Path .\DatabaseModels\Migrations\
rmdir /s/q .\DatabaseModels\Migrations\
dotnet ef database drop --force --no-build --project .\DatabaseModels\ --startup-project .\TestServer\
dotnet ef migrations add Init --project .\DatabaseModels\ --startup-project .\TestServer\
dotnet ef database update --project .\DatabaseModels\ --startup-project .\TestServer\
dotnet ef migrations script -o ./init.sql --project .\DatabaseModels\ --startup-project .\TestServer\

cd ..\utilities\js\src
node saveData.js
node getData.js