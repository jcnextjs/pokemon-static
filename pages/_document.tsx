import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

class AppDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: <>{initialProps.styles}</>,
        };
    }

    render(): JSX.Element {
        return (
            <Html lang="es">
                <Head>{CssBaseline.flush()}</Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default AppDocument;
