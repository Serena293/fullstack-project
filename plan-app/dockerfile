# Build stage
FROM eclipse-temurin:17-jdk-jammy as builder
WORKDIR /workspace
COPY . .
# Skip tests and ensure wrapper is executable
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=builder /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]