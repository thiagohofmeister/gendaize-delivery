CREATE TABLE public.variation_attribute (
	id char(36) NOT NULL,
	variation_id char(36) NOT NULL,
	attribute_id char(36) NOT NULL,
	value varchar NOT NULL,
	CONSTRAINT variation_attribute_pk PRIMARY KEY (id),
	CONSTRAINT variation_attribute_fk FOREIGN KEY (attribute_id) REFERENCES public."attribute"(id),
	CONSTRAINT variation_attribute_fk_1 FOREIGN KEY (variation_id) REFERENCES public.variation(id)
);
