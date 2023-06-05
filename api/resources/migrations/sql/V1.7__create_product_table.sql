CREATE TABLE public.product (
	id char(36) NOT NULL,
	"name" varchar NOT NULL,
	description varchar NULL,
	variation_template json NULL,
	status varchar NOT NULL,
	product_type_id char(36) NOT NULL,
	organization_id char(36) NOT NULL,
	CONSTRAINT product_pk PRIMARY KEY (id),
	CONSTRAINT product_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id),
	CONSTRAINT product_fk_1 FOREIGN KEY (product_type_id) REFERENCES public.product_type(id)
);
