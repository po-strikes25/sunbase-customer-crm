package com.crm.crm_customer.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${spring.app.jwtSecret}")   // fetching from app.properties, in prod:- supply with env variables
    private String jwtSecret;   // secret used to sign tokens

    @Value("${spring.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String getJwtFromHeader(HttpServletRequest request) {    // to validate subsequent API calls
        String bearerToken = request.getHeader("Authorization");
        logger.debug("Authorization Header: {} ", bearerToken);

        if(bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String generateTokenFromUsername(UserDetails userDetails) {
        String username = userDetails.getUsername();
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key())
                .compact();
    }

    public String getUsernameFromJwtToken(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build().parseSignedClaims(token)
                .getPayload().getSubject();
    }

    public boolean validateJwtToken(String authToken){
        try {
            System.out.println("Starting with validation of JWT Token");
            Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(authToken);
            return true;
        } catch(MalformedJwtException exception) {
            logger.error("Invalid JWT Token: {} ", exception.getMessage());
        } catch (ExpiredJwtException exception) {
            logger.error("JWT Token is expired: {} ", exception.getMessage());
        } catch (UnsupportedJwtException exception) {
            logger.error("JWT Token is unsupported: {} ", exception.getMessage());
        } catch (IllegalArgumentException exception) {
            logger.error("JWT claims string is empty: {} ", exception.getMessage());
        }
        return false;
    }
}
