const HtmlResponeRegister = ({
    CLIENT_URL,
    token
    }) => {
    return  `
        <!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="UTF-8">
            <title>Recipe App - Account Activation</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
                color: #333;
                }

                .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                }

                h1 {
                font-size: 36px;
                text-align: center;
                margin-bottom: 20px;
                }

                p {
                font-size: 18px;
                margin-bottom: 20px;
                }

                a {
                color: #fff;
                text-decoration: none;
                background-color: #008CBA;
                padding: 10px 20px;
                border-radius: 5px;
                display: inline-block;
                }
            </style>
            </head>
            <body>
            <div class="container">
                <h1>Welcome to Recipe App</h1>
                <p>You have successfully registered an account with our app.</p>
                <p>Please click on the below link to activate your account:</p>
                <p><a href="${CLIENT_URL}/user/activate/${token}">Activate Account</a></p>
                <p><b>Note:</b> The above activation link expires in 30 minutes.</p>
                <p>Thank you for choosing our app.</p>
            </div>
            </body>
        </html>
        `;

}

const HtmlResponeSuccessfullyRegister = () => {
    const output = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Registration Success</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f8f8f8;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }
          h1 {
            font-size: 36px;
            text-align: center;
            margin-bottom: 20px;
          }
          p {
            font-size: 18px;
            margin-bottom: 20px;
          }
          a {
            color: #fff;
            text-decoration: none;
            background-color: #008CBA;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Registration Success</h1>
          <p>You are successfully registered in our App.</p>
          <p>Please open the App to login.</p>
        </div>
      </body>
    </html>
  `
          return output

}

const HtmlResponeErrorRegister = (error) => {
    const output = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Registration Success</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f8f8f8;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }
          h1 {
            font-size: 36px;
            text-align: center;
            margin-bottom: 20px;
          }
          p {
            font-size: 18px;
            margin-bottom: 20px;
          }
          a {
            color: #fff;
            text-decoration: none;
            background-color: #008CBA;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Oh No!! Have Error To Register</h1>
          <p>Have Error when you Register. ${error}.</p>
          <p>Please check and register again.</p>
        </div>
      </body>
    </html>
  `
          return output

}

const HtmlResponeForgotPass = ({
    newPass
    }) => {
    return  `
        <!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="UTF-8">
            <title>Recipe App - Account Activation</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
                color: #333;
                }

                .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                }

                h1 {
                font-size: 36px;
                text-align: center;
                margin-bottom: 20px;
                }

                p {
                font-size: 18px;
                margin-bottom: 20px;
                }

                a {
                color: #fff;
                text-decoration: none;
                background-color: #008CBA;
                padding: 10px 20px;
                border-radius: 5px;
                display: inline-block;
                }
            </style>
            </head>
            <body>
            <div class="container">
                <h1>Welcome to Recipe App</h1>
                <p>You have reset password.</p>
                <p>Your new password is ${newPass}</p>
                <p>Thank you for choosing our app.</p>
            </div>
            </body>
        </html>
        `;

}

export default {
    HtmlResponeRegister,
    HtmlResponeSuccessfullyRegister,
    HtmlResponeErrorRegister,
    HtmlResponeForgotPass
}