
```sql
CREATE TABLE flats (
                       id SERIAL PRIMARY KEY,
                       title VARCHAR(255),
                       address VARCHAR(255),
                       placement_date TIMESTAMP,
                       published_by VARCHAR(255),
                       map JSONB,  -- Embedded flat location data (GeoJSON)
                       category JSONB,  -- Flexible data structure for category
                       room_count INT,
                       days_in_live INT,
                       added_at TIMESTAMP,
                       created_at TIMESTAMP,
                       ad_number INT,
                       regionAlias VARCHAR(255),
                       city VARCHAR(255),
                       district VARCHAR(255),
                       house_type VARCHAR(255),
                       residential_complex VARCHAR(255),
                       residential_complex_class VARCHAR(255),
                       residential_complex_id INT,
                       construction_year INT,
                       floor INT,
                       total_floors INT,
                       area DOUBLE PRECISION,
                       condition VARCHAR(255),
                       cost DOUBLE PRECISION,
                       bathroom_count INT,
                       balcony BOOLEAN,
                       parking BOOLEAN,
                       furnished BOOLEAN,
                       floor_covering VARCHAR(255),
                       ceilings VARCHAR(255),
                       security VARCHAR(255),
                       former_dormitory BOOLEAN,
                       description TEXT,
                       scraped_at TIMESTAMP,
                       current_flat DOUBLE PRECISION,
                       similar_flats_area DOUBLE PRECISION,
                       similar_flats_city DOUBLE PRECISION,
                       similar_flats_area_difference DOUBLE PRECISION
);

```


```
CREATE INDEX idx_flats_map ON flats USING gin(map);
CREATE INDEX idx_residential_complex ON flats(residential_complex);
CREATE INDEX idx_residential_complex ON flats(residential_complex);
```
