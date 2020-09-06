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
"use strict";
!function() {
  var t = window.driftt = window.drift = window.driftt || [];
  if (!t.init) {
    if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
    t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ], 
    t.factory = function(e) {
      return function() {
        var n = Array.prototype.slice.call(arguments);
        return n.unshift(e), t.push(n), t;
      };
    }, t.methods.forEach(function(e) {
      t[e] = t.factory(e);
    }), t.load = function(t) {
      var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
      o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
      var i = document.getElementsByTagName("script")[0];
      i.parentNode.insertBefore(o, i);
    };
  }
}();
drift.SNIPPET_VERSION = '0.3.1';
drift.load('m6viw39wy699');
`}
        </script>
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
        link={[
          {
            rel: "stylesheet",
            type: "text/css",
            href: "https://css.tito.io/v1.1",
          },
        ]}
        script={[
          {
            src: "https://js.tito.io/v1",
            async: true,
          },
        ]}
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
