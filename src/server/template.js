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
    <div id="root">${html}</div>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <!-- Facebook Pixel Code -->
    <script type="text/javascript">
        var image= new Image(150,20);
        image.src = '/images/flowers.jpg';
        var image2= new Image(150,20);
        image2.src = '/images/reader.jpg';
    </script>
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '424767497941103');
      fbq('track', 'PageView');
    </script>

    <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=424767497941103&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Facebook Pixel Code -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-111896615-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-111896615-1');
    </script>
    <script async src="https://www.paypalobjects.com/api/checkout.js"></script>
    <script async src="https://js.stripe.com/v3/"></script>
    <script async src="/static/bundle.js"></script>
  </body>
</html>
`;
