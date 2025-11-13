package org.dainst.gazetteer;
import org.dainst.gazetteer.dao.UserPasswordChangeRequestRepository;
import org.dainst.gazetteer.dao.UserRepository;
import org.dainst.gazetteer.domain.User;
import org.dainst.gazetteer.helpers.AuthenticationSuccessHandler;
import org.dainst.gazetteer.helpers.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.DelegatingFilterProxy;


@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {
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

    @Autowired
    UserService userService;
 
    @Autowired
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
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
}
