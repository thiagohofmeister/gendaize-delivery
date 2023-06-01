-- -----------------------------------------------------
-- Table `organization`
-- -----------------------------------------------------
CREATE TABLE public.organization (
	id char(36) NOT NULL,
	"name" varchar NOT NULL,
	document_name varchar NULL,
	document_type varchar NOT NULL,
	document_number varchar NOT NULL,
	email varchar NULL,
	phone varchar NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT organization_pk PRIMARY KEY (id)
);


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE public."user" (
	id char(36) NOT NULL,
	"name" varchar NOT NULL,
	document_number varchar NOT NULL,
	email varchar NOT NULL,
	"password" varchar NOT NULL,
	status varchar NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT user_pk PRIMARY KEY (id)
);


-- -----------------------------------------------------
-- Table `user_organization`
-- -----------------------------------------------------
CREATE TABLE public.user_organization (
	id char(36) NOT NULL,
	user_id char(36) NOT NULL,
	organization_id char(36) NOT NULL,
	role_type varchar NOT NULL,
	status varchar NOT NULL,
	CONSTRAINT user_organization_pk PRIMARY KEY (id),
	CONSTRAINT user_organization_un UNIQUE (user_id,organization_id,role_type),
	CONSTRAINT user_organization_fk FOREIGN KEY (user_id) REFERENCES public."user"(id),
	CONSTRAINT user_organization_fk_1 FOREIGN KEY (organization_id) REFERENCES public.organization(id)
);


-- -----------------------------------------------------
-- Table `customer`
-- -----------------------------------------------------
CREATE TABLE public.customer (
	id char(36) NOT NULL,
	"name" varchar NOT NULL,
	phone varchar NOT NULL,
	email varchar NULL,
	"password" varchar NULL,
	organization_id char(36) NOT NULL,
	CONSTRAINT customer_pk PRIMARY KEY (id),
	CONSTRAINT customer_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id),
  CONSTRAINT customer_un UNIQUE (email,organization_id,phone)
);


-- -----------------------------------------------------
-- Table `authentication`
-- -----------------------------------------------------
CREATE TABLE public.authentication (
	id char(36) NOT NULL,
	"token" text NOT NULL,
	device varchar NOT NULL,
	status varchar NOT NULL,
	user_organization_id char(36) NULL,
  customer_id char(36) NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT authentication_pk PRIMARY KEY (id),
	CONSTRAINT authentication_fk FOREIGN KEY (user_organization_id) REFERENCES public.user_organization(id),
  CONSTRAINT authentication_fk2 FOREIGN KEY (customer_id) REFERENCES public.customer(id)
);


-- -----------------------------------------------------
-- Table `product_type`
-- -----------------------------------------------------
CREATE TABLE public.product_type (
	id char(36) NOT NULL,
	"label" varchar NOT NULL,
  organization_id char(36) NOT NULL,
	CONSTRAINT product_type_pk PRIMARY KEY (id),
  CONSTRAINT product_type_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id)
);


-- -----------------------------------------------------
-- Table `attribute`
-- -----------------------------------------------------
CREATE TABLE public."attribute" (
	id char(36) NULL,
	"label" varchar NULL,
	"type" varchar NULL,
	"values" json NULL,
	product_type_id char(36) NOT NULL,
	organization_id char(36) NOT NULL,
	CONSTRAINT attribute_pk PRIMARY KEY (id),
	CONSTRAINT attribute_fk FOREIGN KEY (product_type_id) REFERENCES public.product_type(id),
	CONSTRAINT attribute_fk_1 FOREIGN KEY (organization_id) REFERENCES public.organization(id)
);


-- -----------------------------------------------------
-- Table `product`
-- -----------------------------------------------------
CREATE TABLE public.product (
	id char(36) NOT NULL,
	"name" varchar NOT NULL,
	description varchar NULL,
	variation_template varchar NULL,
	status varchar NOT NULL,
	product_type_id char(36) NOT NULL,
	organization_id char(36) NOT NULL,
	CONSTRAINT product_pk PRIMARY KEY (id),
	CONSTRAINT product_fk FOREIGN KEY (organization_id) REFERENCES public.organization(id),
	CONSTRAINT product_fk_1 FOREIGN KEY (product_type) REFERENCES public.product_type(id)
);


-- -----------------------------------------------------
-- Table `variation`
-- -----------------------------------------------------
CREATE TABLE public.variation (
	id char(36) NOT NULL,
	code varchar NULL,
	price_list int NOT NULL,
	price_sale int NOT NULL,
	variation_combination varchar NULL,
	status varchar NOT NULL,
	product_id char(36) NOT NULL,
	CONSTRAINT variation_pk PRIMARY KEY (id),
	CONSTRAINT variation_fk FOREIGN KEY (product_id) REFERENCES public.product(id),
  CONSTRAINT variation_un UNIQUE (product_id,variation_combination)
);


-- -----------------------------------------------------
-- Table `image`
-- -----------------------------------------------------
CREATE TABLE public.image (
	id char(36) NOT NULL,
	urn text NOT NULL,
	variation_combination varchar NULL,
	product_id char(36) NOT NULL,
	CONSTRAINT image_pk PRIMARY KEY (id),
	CONSTRAINT image_fk FOREIGN KEY (product_id) REFERENCES public.product(id)
);
