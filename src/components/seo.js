/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <>
      <Helmet>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-156991006-3"
        ></script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
   gtag('config', 'UA-156991006-3');`}
        </script>
        <script>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2749501678628500'); 
            fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`
          <img
            height="1"
            width="1"
            alt="tracker"
            src="https://www.facebook.com/tr?id=2749501678628500&ev=PageView
            &noscript=1"
          />
          `}
        </noscript>
      </Helmet>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        titleTemplate={`%s | ${site.siteMetadata.title}`}
        meta={[
          {
            charset: `UTF-8`,
          },
          {
            name: `viewport`,
            content: `width=device-width, initial-scale=1.0`,
          },
          {
            name: `fb:page_id`,
            content: `314394185432326`,
          },
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:site_name`,
            content: site.siteMetadata.title,
          },
          {
            property: `og:url`,
            content: `https://uxph.org/`,
          },
          {
            property: `og:image`,
            content: `https://uxph.org/assets/images/og_cover_conf2020.jpg`,
          },
          {
            property: `og:image:secure_url`,
            content: `https://uxph.org/assets/images/og_cover_conf2020.jpg`,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary_large_image`,
          },
          {
            name: `twitter:image`,
            content: `https://uxph.org/assets/images/og_cover_conf2020.jpg`,
          },
          {
            name: `twitter:creator`,
            content: site.siteMetadata.author,
          },
          {
            name: `twitter:site`,
            content: site.siteMetadata.author,
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
          {
            developer: `Mike Jaren Yap`,
            site: `https://mjarenyap.github.io`,
          },
          {
            developer: `Tyrone Justin Sta. Maria`,
            site: `https://tyronegithub.github.io`,
          },
          {
            developer: `Gavin Raine Dizon`,
            site: `https://gavindizon.github.io`,
          },
        ].concat(meta)}
      />
    </>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
