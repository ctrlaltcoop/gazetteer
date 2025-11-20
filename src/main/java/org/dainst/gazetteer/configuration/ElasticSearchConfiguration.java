package org.dainst.gazetteer.configuration;

import org.dainst.gazetteer.search.ElasticSearchClientProvider;
import org.dainst.gazetteer.search.ElasticSearchIndexer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class ElasticSearchConfiguration {

    @Bean
    public ElasticSearchIndexer elasticSearchIndexer() {
        return new ElasticSearchIndexer();
    }

    @Bean
    public ElasticSearchClientProvider elasticSearchClientProvider() {
        return new ElasticSearchClientProvider();
    }
}
