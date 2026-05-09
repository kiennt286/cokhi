import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_NAME = "CNC Bắc Ninh";
const SITE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173";
const DEFAULT_IMAGE = `${SITE_URL}/herobg.png`;

const Seo = ({ title, description, path = "/", image, noIndex = false }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={canonical} />
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : null}
    </Helmet>
  );
};

export default Seo;
