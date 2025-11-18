package org.dainst.gazetteer.search;

import org.apache.hc.core5.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;

public class ElasticSearchClientProvider {

	@Value("${cluster.name}")
	private String clusterName;
	
	private RestHighLevelClient client;
	
	public RestHighLevelClient getClient() {
		
		if (client == null) client = createClient();
		
		return client;
	}
	
	private RestHighLevelClient createClient() {
		
		return new RestHighLevelClient(
			RestClient.builder(new HttpHost("http", "elasticsearch", 9200))
		);
	}
}
