package org.dainst.gazetteer;

import org.jspecify.annotations.Nullable;
import org.springframework.http.MediaType;
import org.springframework.util.MimeType;

import java.nio.charset.Charset;
import java.util.Map;

public class GazetteerMediaType extends MediaType {

    public static final MediaType APPLICATION_GEOJSON = new MediaType("application", "vnd.geo+json");
    public static final String APPLICATION_GEOJSON_VALUE = "application/vnd.geo+json";

    public static final MediaType APPLICATION_KML = new MediaType("application", "vnd.google-earth.kml+xml");
    public static final String APPLICATION_KML_VALUE = "application/vnd.google-earth.kml+xml";

    public static final MediaType APPLICATION_JAVASCRIPT = new MediaType("application","javascript");
    public static final String APPLICATION_JAVASCRIPT_VALUE = "application/javascript";

    public static final MediaType APPLICATION_RDF = new MediaType("application","rdf+xml");
    public static final String APPLICATION_RDF_VALUE = "application/rdf+xml";

    public GazetteerMediaType(String type) {
        super(type);
    }

    public GazetteerMediaType(String type, String subtype) {
        super(type, subtype);
    }

    public GazetteerMediaType(String type, String subtype, Charset charset) {
        super(type, subtype, charset);
    }

    public GazetteerMediaType(String type, String subtype, double qualityValue) {
        super(type, subtype, qualityValue);
    }

    public GazetteerMediaType(MediaType other, Charset charset) {
        super(other, charset);
    }

    public GazetteerMediaType(MediaType other, @Nullable Map<String, String> parameters) {
        super(other, parameters);
    }

    public GazetteerMediaType(String type, String subtype, @Nullable Map<String, String> parameters) {
        super(type, subtype, parameters);
    }

    public GazetteerMediaType(MimeType mimeType) {
        super(mimeType);
    }
}