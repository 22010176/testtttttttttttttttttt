@echo off

set "project_path=%cd%\..\.."
cd %project_path%
set "project_path=%cd%"
echo %project_path%

cd "%project_path%\server"
rmdir /s/q .\DatabaseModels\Migrations\
dotnet ef database drop --force --no-build --project .\DatabaseModels\ --startup-project .\TestServer\
dotnet ef migrations add Init --project .\DatabaseModels\ --startup-project .\TestServer\
dotnet ef database update --project .\DatabaseModels\ --startup-project .\TestServer\
dotnet ef migrations script -o ./init.sql --project .\DatabaseModels\ --startup-project .\TestServer\

cd "%project_path%\utilities\js\src"
node getData.js
node saveData.js

set PGPASSWORD=admin
pg_dump -U postgres TMDT --column-inserts -f "%project_path%\server\init.sql"