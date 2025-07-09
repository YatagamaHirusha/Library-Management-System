FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/myapp.jar myapp.jar
ENTRYPOINT ["java", "-jar", "myapp.jar"]
