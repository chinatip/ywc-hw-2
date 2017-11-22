import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();

    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();

    return (
     <html>
       <Head>         
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
         <title>YWC</title>
         {styleTags}
       </Head>
       <body>
         <div id="root">
          {main}
         </div>
         <NextScript />
       </body>
     </html>
    );
  }
}