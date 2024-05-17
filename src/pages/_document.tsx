import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <script src="https://cdn.pagesense.io/js/altbasetechnologies/30003f4f96344f49936a1afe85573113.js"></script>
      <script
        type="text/javascript"
        id="zsiqchat"
        dangerouslySetInnerHTML={{
          __html: `
            var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "siqa15d93a9e1271121be89480d03acd0430bbf8fee922cd06f763f07e4c72559f9", values:{},ready:function(){}};
            var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;
            s.src="https://salesiq.zohopublic.com/widget";
            var t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);
          `
        }}
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
