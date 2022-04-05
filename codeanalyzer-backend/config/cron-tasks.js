module.exports = {
    
    // Cron Job that sends email Report every day
    '55 16 * * *': async ({ strapi }) => {
      const users = [
        {
          email: "bharatwaaj@dal.ca",
          repos: 40,
          commits: 100,
          prs: 20,
          devs: 12,
        },
        {
          email: "ar899345@dal.ca",
          repos: 40,
          commits: 100,
          prs: 20,
          devs: 12,
        },
        {
          email: "kv286760@dal.ca",
          repos: 40,
          commits: 100,
          prs: 20,
          devs: 12,
        },
        {
          email: "ks317715@dal.ca",
          repos: 40,
          commits: 100,
          prs: 20,
          devs: 12,
        },
        {
          email: "qr620423@dal.ca",
          repos: 40,
          commits: 100,
          prs: 20,
          devs: 12,
        },
        {
          email: "sh244392@dal.ca",
          repos: 40,
          commits: 100,
          prs: 20,
          devs: 12,
        }
      ];
      try {
        const emailTemplate = {
          subject: "Daily Summary Report <%= user.email %>",
          text: `Daily Summary Report <%= user.email %>.`,
          html: `<!DOCTYPE html>

                    <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
                    <head>
                    <title></title>
                    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
                    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
                    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
                    <!--[if !mso]><!-->
                    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"/>
                    <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css"/>
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
                    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
                    <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css"/>
                    <!--<![endif]-->
                    <style>
                            * {
                                box-sizing: border-box;
                            }
                    
                            body {
                                margin: 0;
                                padding: 0;
                            }
                    
                            a[x-apple-data-detectors] {
                                color: inherit !important;
                                text-decoration: inherit !important;
                            }
                    
                            #MessageViewBody a {
                                color: inherit;
                                text-decoration: none;
                            }
                    
                            p {
                                line-height: inherit
                            }
                    
                            @media (max-width:660px) {
                                .icons-inner {
                                    text-align: center;
                                }
                    
                                .icons-inner td {
                                    margin: 0 auto;
                                }
                    
                                .row-content {
                                    width: 100% !important;
                                }
                    
                                .image_block img.big {
                                    width: auto !important;
                                }
                    
                                .column .border {
                                    display: none;
                                }
                    
                                table {
                                    table-layout: fixed !important;
                                }
                    
                                .stack .column {
                                    width: 100%;
                                    display: block;
                                }
                            }
                        </style>
                    </head>
                    <body style="background-color: #191d46; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #191d46;" width="100%">
                    <tbody>
                    <tr>
                    <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                    <tbody>
                    <tr>
                    <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
                    <tbody>
                    <tr>
                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                    <div class="spacer_block" style="height:50px;line-height:50px;font-size:1px;"> </div>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                    <tbody>
                    <tr>
                    <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
                    <tbody>
                    <tr>
                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                    <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                    <tr>
                    <td style="padding-left:5px;padding-right:5px;width:100%;">
                    <div align="center" style="line-height:10px"><a href="https://codeanalyzer.herokuapp.com" style="outline:none" tabindex="-1" target="_blank"><img alt="Your-Logo" src="https://i.ibb.co/4S5rYf8/argon-react-white.png" style="display: block; height: auto; border: 0; width: 128px; max-width: 100%;" title="Your-Logo" width="128"/></a></div>
                    </td>
                    </tr>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                    <tbody>
                    <tr>
                    <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
                    <tbody>
                    <tr>
                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                    <div class="spacer_block" style="height:40px;line-height:40px;font-size:1px;"> </div>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-position: top center;" width="100%">
                    <tbody>
                    <tr>
                    <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
                    <tbody>
                    <tr>
                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-left:10px;padding-right:10px;padding-top:10px;">
                    <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #ef867c; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:88px;"><span style="">20</span></span><strong><span style="font-size:88px;"><span style="">22</span></span></strong></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    <table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td>
                    <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #ffffff; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:42px;">Your Github Repository Daily Report</span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                    <tbody>
                    <tr>
                    <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
                    <tbody>
                    <tr>
                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                    <table border="0" cellpadding="10" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td>
                    <div style="font-family: sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #393d47; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="color:#ffffff;">Checkout your free daily repository details in the detailed summary report email.</span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                    <tbody>
                    <tr>
                    <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
                    <tbody>
                    <tr>
                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                    <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                    <tr>
                    <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:25px;padding-bottom:50px;">
                    <div align="center" style="line-height:10px"><a href="https://codeanalyzer.herokuapp.com" style="outline:none" tabindex="-1" target="_blank"><img alt="Graphic-image" class="big" src="https://i.ibb.co/ZXSP581/object-01.png" style="display: block; height: auto; border: 0; width: 640px; max-width: 100%;" title="Graphic-image" width="640"/></a></div>
                    </td>
                    </tr>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                    <tbody>
                    <tr>
                    <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-position: top center; color: #000000; width: 640px;" width="640">
                    <tbody>
                    <tr>
                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-left:10px;padding-right:10px;">
                    <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #ef867c; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:50px;">Hey there,</span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-bottom:30px;padding-left:10px;padding-right:10px;padding-top:10px;">
                    <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #ffffff; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:34px;">you had a great day.</span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                    <tbody>
                    <tr>
                    <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
                    <tbody>
                    <tr>
                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="25%">
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-left:20px;padding-right:20px;padding-top:5px;">
                    <div style="font-family: sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #ef867c; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:34px;"><strong><span style=""><%= user.repos %></span></strong></span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-left:20px;padding-right:20px;padding-bottom:35px;">
                    <div style="font-family: sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #e80046; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:17px;color:#ffffff;"><strong><span style="">REPOS</span></strong></span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    </td>
                    <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="25%">
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-left:20px;padding-right:20px;padding-top:5px;">
                    <div style="font-family: sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #ef867c; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:34px;"><strong><span style=""><%= user.devs %></span></strong></span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-left:20px;padding-right:20px;padding-bottom:35px;">
                    <div style="font-family: sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #e80046; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:17px;color:#ffffff;"><strong><span style="">DEVS</span></strong></span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    </td>
                    <td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="25%">
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-left:20px;padding-right:20px;padding-top:5px;">
                    <div style="font-family: sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #ef867c; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:34px;"><strong><span style=""><%= user.prs %></span></strong></span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-left:20px;padding-right:20px;padding-bottom:35px;">
                    <div style="font-family: sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #e80046; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:17px;color:#ffffff;"><strong><span style="">PR'S</span></strong></span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    </td>
                    <td class="column column-4" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="25%">
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-left:20px;padding-right:20px;padding-top:5px;">
                    <div style="font-family: sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #ef867c; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:34px;"><strong><span style=""><%= user.commits %></span></strong></span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-left:20px;padding-right:20px;padding-bottom:35px;">
                    <div style="font-family: sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #e80046; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:17px;color:#ffffff;"><strong><span style="">COMMITS</span></strong></span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                    <tbody>
                    <tr>
                    <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 640px;" width="640">
                    <tbody>
                    <tr>
                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-left:20px;padding-right:20px;padding-top:85px;">
                    <div style="font-family: 'Trebuchet MS', Tahoma, sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #ef867c; line-height: 1.2;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="font-size:38px;"><strong><span style="">Some highlights</span></strong></span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                    <tr>
                    <td style="padding-bottom:45px;padding-left:10px;padding-right:10px;padding-top:10px;">
                    <div style="font-family: sans-serif">
                    <div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #393d47; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
                    <p style="margin: 0; font-size: 14px; text-align: center;"><span style="color:#ffffff;">This week your commits grew from about 14% compared to last week. The number of tickets closed by a developer over a week has increased by 2%. There refactoring of files have been increased by 21% this week.</span></p>
                    </div>
                    </div>
                    </td>
                    </tr>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </body>
                    </html>`,
        };
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          await strapi.plugins["email"].services.email.sendTemplatedEmail(
            {
              to: user.email,
              from: user.email,
            },
            emailTemplate,
            {
              user: user,
            }
          );
        }
      } catch (err) {
        console.log("Daily summary report not sent", err);
      }
    },
  };