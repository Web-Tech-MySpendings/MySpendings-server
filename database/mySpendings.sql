--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

-- Started on 2020-12-18 13:25:43 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 198 (class 1259 OID 24967)
-- Name: info; Type: TABLE; Schema: public; Owner: postgres
--
--
-- TOC entry 197 (class 1259 OID 24964)
-- Name: spendings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.spendings (
    uid integer NOT NULL,
    sid integer NOT NULL,
    value float NOT NULL,
    date date NOT NULL,
    type character varying(100),
    comment character varying(300)
);


--
-- TOC entry 196 (class 1259 OID 24961)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    uid integer NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(200) NOT NULL,
    name character varying(100) NOT NULL
);


