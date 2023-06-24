CREATE TABLE public.image (
	id char(36) NOT NULL,
	urn text NOT NULL,
	variation_combination varchar NULL,
	product_id char(36) NOT NULL,
	CONSTRAINT image_pk PRIMARY KEY (id),
	CONSTRAINT image_fk FOREIGN KEY (product_id) REFERENCES public.product(id)
);
