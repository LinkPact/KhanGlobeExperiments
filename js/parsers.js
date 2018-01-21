/**
 * Created by jakob on 2018-01-21.
 */

var load_name_value_map_csv = function(path, name_field, value_field) {

    var name_value_map = {};
    d3.csv(path, function(error, data) {
        data.forEach(function(entry) {
            var name = entry[name_field];
            var value = entry[value_field];
            name_value_map[name] = value;
        });
    });
    return name_value_map;
};

var load_name_values_map_csv = function(path, name_field, values_field) {
    var language_countries_map = {};
    d3.csv(path, function(error, language_data) {
        language_data.forEach(function(country) {
            var country_language = country[name_field];
            var country_name = country[values_field];

            if (language_countries_map[country_language] == undefined) {
                language_countries_map[country_language] = [];
            }
            language_countries_map[country_language].push(country_name);
        });
    });
    return language_countries_map;
};

var load_country_coverage_map_csv = function(path, language_field, translation_field, language_countries_map) {

    var country_name_val_map = {};
    d3.tsv(path, function(error, country_val) {

        country_val.forEach(function (entry) {
            var language = entry[language_field];
            var language_coverage = entry[translation_field];

            var language_countries = language_countries_map[language];

            if (language_countries != undefined) {
                for (var i = 0; i <= language_countries.length; i++) {
                    var country = language_countries[i];

                    country_name_val_map[country] = language_coverage;
                }
            }
            else {
                console.log(language, " not found!");
            }
        });
    });
    return country_name_val_map;
};


