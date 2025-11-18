package org.dainst.gazetteer;
import org.dainst.gazetteer.dao.PlaceRepository;
import org.dainst.gazetteer.helpers.MongoBasedIncrementingIdGenerator;
import org.dainst.gazetteer.helpers.SimpleMerger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.WriteResultChecking;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import com.mongodb.MongoClient;


@Configuration
@EnableMongoRepositories(basePackages = "org.dainst.gazetteer.dao")
@EnableWebSecurity
public class MongoConfiguration extends AbstractMongoConfiguration {

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
}
