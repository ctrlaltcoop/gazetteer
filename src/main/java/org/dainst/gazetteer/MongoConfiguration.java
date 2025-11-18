package org.dainst.gazetteer;
import org.dainst.gazetteer.dao.PlaceRepository;
import org.dainst.gazetteer.dao.UserPasswordChangeRequestRepository;
import org.dainst.gazetteer.dao.UserRepository;
import org.dainst.gazetteer.helpers.AuthenticationSuccessHandler;
import org.dainst.gazetteer.helpers.MongoBasedIncrementingIdGenerator;
import org.dainst.gazetteer.helpers.SimpleMerger;
import org.dainst.gazetteer.helpers.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.WriteResultChecking;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.DelegatingFilterProxy;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;


@Configuration
@EnableMongoRepositories(basePackages = "org.dainst.gazetteer.dao")
@EnableWebSecurity
public class MongoConfiguration extends AbstractMongoConfiguration {

    // region mongo
    @Bean
    public MongoClient mongoClient() {
        return new MongoClient();
    }

    @Override
    protected String getDatabaseName() {
        return "gazetteer";
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient) {
        MongoTemplate mongoTemplate = new MongoTemplate(mongoClient, "gazetteer");
        mongoTemplate.setWriteResultChecking(WriteResultChecking.EXCEPTION);
        return mongoTemplate;
    }

    @Bean
    public MongoBasedIncrementingIdGenerator idGenerator(MongoTemplate mongoTemplate) {
        MongoBasedIncrementingIdGenerator mbiig = new MongoBasedIncrementingIdGenerator(mongoTemplate, "place_id_counter4", 1000000);
        mbiig.setBlockSize(1000);
        return mbiig;
    }

    @Bean
    public SimpleMerger merger(PlaceRepository placeRepository) {
        SimpleMerger merger = new SimpleMerger();
        merger.setPlaceRepository(placeRepository);
        return merger;
    }

    // endregion

    // region web security
    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler(
        UserRepository userRepository,
        UserPasswordChangeRequestRepository userPasswordChangeRequestRepository
    ) {
        AuthenticationSuccessHandler authenticationSuccessHandler = new AuthenticationSuccessHandler();
        authenticationSuccessHandler.setDefaultTargetUrl("/");
        authenticationSuccessHandler.setTargetUrlParameter("spring-security-redirect");
        authenticationSuccessHandler.setUserRepository(userRepository);
        authenticationSuccessHandler.setUserPasswordChangeRequestRepository(userPasswordChangeRequestRepository);
        return authenticationSuccessHandler;
    }
    @Bean
    public UserService userService(UserRepository userRepository) {
        UserService userService = new UserService();
        userService.setUserRepository(userRepository);
        return userService;
    }

    @Bean 
    public PasswordEncoder passwordEncoder() { 
        return new BCryptPasswordEncoder(); 
    }

    @Bean
    public SecurityFilterChain springSecurityFilterChain(
        HttpSecurity http,
        AuthenticationSuccessHandler authenticationSuccessHandler
    ) throws Exception {
        http.csrf(csrf ->
                csrf.disable()
            )
            .logout(logout ->
                 logout.logoutUrl("/logout")
                        .logoutSuccessUrl("/")
            )
            .formLogin(form ->
                    form.loginPage("/login")
                        .loginProcessingUrl("/j_spring_security_check")
                        .failureUrl("/loginfailed")
                        .successHandler(authenticationSuccessHandler)
            ).authorizeHttpRequests( httpRequest ->
                httpRequest
                    .requestMatchers("/user").hasRole("ROLE_USER")
                    .requestMatchers(HttpMethod.POST, "/doc/**").hasRole("ROLE_EDITOR")
                    .requestMatchers(HttpMethod.PUT, "/doc/**").hasRole("ROLE_EDITOR")
                    .requestMatchers(HttpMethod.DELETE, "/doc/**").hasRole("ROLE_EDITOR")
                    .requestMatchers(HttpMethod.POST, "/merge/**").hasRole("ROLE_EDITOR")
                    .requestMatchers(HttpMethod.POST, "/duplicate/**").hasRole("ROLE_EDITOR")
                    .requestMatchers(HttpMethod.POST, "/validation/**").hasRole("ROLE_EDITOR")
                    .requestMatchers("/admin/**").hasRole("ROLE_ADMIN")
                    .requestMatchers("/userManagement/**").hasRole("ROLE_ADMIN")
                    .requestMatchers("/recordGroupManagement/**").hasRole("ROLE_USER")
                    .requestMatchers("/recordGroupUserManagement/**").hasRole("ROLE_USER")
                    .requestMatchers("/editUser/**").hasRole("ROLE_USER")
                    .requestMatchers("/globalChangeHistory/**").hasRole("ROLE_EDITOR")
            )
            .addFilter(new DelegatingFilterProxy())
            // TODO move to DSL?!
            .httpBasic();
          
        return http.build();
    }

    // endregion
}
