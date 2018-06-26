export default (html) => `
<!doctype html>
<html lang="bs">
  <head>
    <title>zdravlje.nu</title>
    <meta charset="UTF-8">
    <meta name="description" content="Privatno savjetovanje za zdrav život" />
    <meta name="keywords" content="sreća, zdravlje, uspješan, uspješna, stretna, sretan, osjećam, osećam, nasikiran, nezaposlen, nestretna, nestretan, meditacija, psihološko savjetovanje, nesanica, nervozan, nervozna, mirna, miran online">
    <meta name="google" content="notranslate" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png">
    <link rel="shortcut icon" href="favicon2.ico" />
    <link rel="stylesheet" href="/css/styles.css" />
  </head>
  <body>
    <div id="root"><div>${html}</div></div>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
    <script type="text/javascript">
        var image= new Image(150,20);
        image.src = '/images/flowers.jpg';
        var image2= new Image(150,20);
        image2.src = '/images/reader.jpg';
    </script>
    <script async src="/static/bundle.js"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-111896615-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-111896615-1');
    </script>
  </body>
</html>
`;
