import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationException, ValidationFilter } from './shared/validation.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('NestJS App')
        .setDescription('Example NestJS App')
        .setVersion('0.1')
        .addTag('tasks')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);


    app.useGlobalFilters(new ValidationFilter());
    app.useGlobalPipes(new ValidationPipe({
        skipMissingProperties: false,
        exceptionFactory: (errors: ValidationError[]) => {
            const errMsg = {};
            errors.forEach(err => {
                errMsg[err.property] = [...Object.values(err.constraints)];
            });
            return new ValidationException(errMsg);
        }
    }));

    await app.listen(3000);
}
bootstrap();
