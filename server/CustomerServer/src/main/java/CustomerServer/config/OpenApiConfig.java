package CustomerServer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme.In;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;

@Configuration
@SecurityScheme(name = OpenApiConfig.securityScheme, type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT")
public class OpenApiConfig {
  public static final String securityScheme = "bearerAuth";

  @Bean
  OpenAPI customOpenAPI() {
    return new OpenAPI()
        .info(new Info()
            .title("My API")
            .description("Spring Boot API with JWT Authorization")
            .version("v1.0"))
        .addSecurityItem(new SecurityRequirement().addList(securityScheme))
        .components(new Components().addSecuritySchemes(securityScheme,
            new io.swagger.v3.oas.models.security.SecurityScheme()
                .type(Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .in(In.HEADER)
                .name("Authorization")));
  }
}
