export const EmailTemplates = {
  /**
   * OTP Verification Email
   */
  otpVerification: (params: { otp: string; type: string; email: string }) => {
    const { otp, type, email } = params;
    
    let subject = '';
    let title = '';
    let description = '';
    
    switch (type) {
      case 'sign-in':
        subject = 'Your Sign-In Verification Code';
        title = 'Sign In Verification';
        description = 'Use this code to sign in to your account:';
        break;
      case 'email-verification':
        subject = 'Verify Your Email Address';
        title = 'Email Verification';
        description = 'Use this code to verify your email address:';
        break;
      case 'password-reset':
        subject = 'Reset Your Password';
        title = 'Password Reset';
        description = 'Use this code to reset your password:';
        break;
      default:
        subject = 'Your Verification Code';
        title = 'Verification Required';
        description = 'Use this code to complete verification:';
    }

    return {
      subject,
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #f9fafb;
            border-radius: 8px;
            padding: 40px 30px;
            text-align: center;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 20px;
        }
        .header {
            font-size: 28px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 16px;
        }
        .otp-container {
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin: 30px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .otp-code {
            font-size: 48px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #2563eb;
            margin: 20px 0;
        }
        .info-box {
            background: #eff6ff;
            border-left: 4px solid #2563eb;
            padding: 16px;
            margin: 24px 0;
            text-align: left;
            border-radius: 0 8px 8px 0;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .expiry-note {
            color: #dc2626;
            font-weight: 500;
            margin-top: 16px;
        }
        .button {
            display: inline-block;
            background: #2563eb;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">StakeClone</div>
        
        <h1 class="header">${title}</h1>
        
        <p>Hello,</p>
        <p>${description}</p>
        
        <div class="otp-container">
            <div class="otp-code">${otp}</div>
            <p style="color: #6b7280; margin: 0;">
                Enter this code in your verification screen
            </p>
        </div>
        
        <div class="info-box">
            <strong>Important:</strong>
            <ul style="margin: 8px 0; padding-left: 20px;">
                <li>This code will expire in 10 minutes</li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't request this, please ignore this email</li>
            </ul>
        </div>
        
        <p class="expiry-note">
            ⏰ Expires in: 10 minutes
        </p>
        
        <p style="margin-top: 30px;">
            Having trouble? 
            <a href="mailto:support@stakeclone.com" style="color: #2563eb;">
                Contact Support
            </a>
        </p>
        
        <div class="footer">
            <p>
                This email was sent to <strong>${email}</strong><br>
                If this wasn't you, please secure your account immediately.
            </p>
            <p style="margin-top: 16px; font-size: 12px;">
                © ${new Date().getFullYear()} StakeClone. All rights reserved.<br>
                This is an automated message, please do not reply.
            </p>
        </div>
    </div>
</body>
</html>
      `,
      text: `
${subject}

Hello,

${description}

Your verification code: ${otp}

Enter this code in your verification screen.

Important:
• This code will expire in 10 minutes
• Do not share this code with anyone
• If you didn't request this, please ignore this email

⏰ Expires in: 10 minutes

Having trouble? Contact support: support@stakeclone.com

This email was sent to ${email}
If this wasn't you, please secure your account immediately.

© ${new Date().getFullYear()} StakeClone. All rights reserved.
This is an automated message, please do not reply.
      `
    };
  },

  /**
   * Simple OTP Email (Minimal)
   */
  simpleOtp: (params: { otp: string; type: string }) => {
    const { otp, type } = params;
    
    const subject = type === 'sign-in' 
      ? 'Your Sign-In Code'
      : type === 'email-verification'
      ? 'Verify Your Email'
      : 'Your Verification Code';

    return {
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>${subject}</h2>
          <p>Your verification code is:</p>
          <h1 style="font-size: 48px; letter-spacing: 10px; color: #2563eb;">${otp}</h1>
          <p>This code expires in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
      text: `
${subject}

Your verification code: ${otp}

This code expires in 10 minutes.

If you didn't request this, please ignore this email.
      `
    };
  }
};