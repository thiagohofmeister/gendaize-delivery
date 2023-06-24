CREATE TABLE public.product_type (
	id char(36) NOT NULL,
	"label" varchar NOT NULL,
  organization_id char(36) NOT NULL,
	CONSTRAINT product_type_pk PRIMARY KEY (id),
  CONSTRAINT product_type_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id)
);
