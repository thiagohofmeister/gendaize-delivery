CREATE TABLE public."attribute" (
	id char(36) NULL,
	"label" varchar NULL,
	"type" varchar NULL,
	"values" json NULL,
  sub_type varchar NULL,
  sub_type_values json NULL,
	product_type_id char(36) NOT NULL,
	organization_id char(36) NOT NULL,
	CONSTRAINT attribute_pk PRIMARY KEY (id),
	CONSTRAINT attribute_fk FOREIGN KEY (product_type_id) REFERENCES public.product_type(id),
	CONSTRAINT attribute_fk_1 FOREIGN KEY (organization_id) REFERENCES public.organization(id)
);
