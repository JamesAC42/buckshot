CREATE TABLE users
(
    id uuid NOT NULL,
    username character varying(20) COLLATE pg_catalog."default" NOT NULL,
    password character varying(72) COLLATE pg_catalog."default" NOT NULL,
    date_created timestamp with time zone NOT NULL,
    premium boolean NOT NULL,
    remaining_generations smallint NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE feedback
(
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    comment text COLLATE pg_catalog."default" NOT NULL,
    date_created timestamp with time zone NOT NULL,
    CONSTRAINT feedback_pkey PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE job_input
(
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    title character varying(100) COLLATE pg_catalog."default" NOT NULL,
    personal_info text COLLATE pg_catalog."default" NOT NULL,
    job_info text COLLATE pg_catalog."default" NOT NULL,
    required_sections character varying(400) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT job_input_pkey PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE job_output
(
    job uuid NOT NULL,
    id smallint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 32767 CACHE 1 ),
    output text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT job_output_pkey PRIMARY KEY (job, id),
    CONSTRAINT job FOREIGN KEY (job)
        REFERENCES public.job_input (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE settings
(
    user_id uuid NOT NULL,
    tone smallint NOT NULL,
    copy_personal_info boolean NOT NULL,
    model smallint NOT NULL,
    " generate_mode" smallint NOT NULL,
    CONSTRAINT settings_pkey PRIMARY KEY (user_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);