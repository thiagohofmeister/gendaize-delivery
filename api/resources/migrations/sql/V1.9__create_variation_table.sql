CREATE TABLE public.variation (
	id char(36) NOT NULL,
	code varchar NULL,
	price_list int NOT NULL,
	price_sale int NOT NULL,
	status varchar NOT NULL,
	product_id char(36) NOT NULL,
	CONSTRAINT variation_pk PRIMARY KEY (id),
	CONSTRAINT variation_fk FOREIGN KEY (product_id) REFERENCES public.product(id)
);
