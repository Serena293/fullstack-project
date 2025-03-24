package com.capstone.plan_app.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration-time}")
    private long EXPIRATION_TIME;



    public String generateToken(UserDetails userDetails, Long userId) {
        String username = userDetails.getUsername();
        byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY); // Decodifica la chiave

        String token = Jwts.builder()
                .setSubject(username)
                .claim("username", username)
                .claim("userId", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, decodedKey)
                .compact();

        return token;
    }

    public String extractUsername(String token) {
        String username = extractClaim(token, claims -> claims.get("username").toString());
        logger.debug("Estratto username dal token: {}", username);
        return username;
    }

    public boolean validateToken(String token, String username) {
        boolean isValid = username.equals(extractUsername(token)) && !isTokenExpired(token);
        logger.debug("Validazione token: {}, valido: {}", token, isValid);
        return isValid;
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
