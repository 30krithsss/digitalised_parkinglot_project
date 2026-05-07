const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send slot booking confirmation
const sendBookingConfirmation = async (to, data) => {
  try {
    await transporter.sendMail({
      from: `"Smart Park 🅿" <${process.env.EMAIL_USER}>`,
      to,
      subject: '✅ Parking Slot Booked Successfully!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000814; color: #ffffff; border-radius: 20px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0072ff, #00c6ff); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: #fff;">🅿 SMART PARK</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8);">Parking Confirmation</p>
          </div>

          <!-- Body -->
          <div style="padding: 30px;">
            <h2 style="color: #00e5ff; margin-bottom: 20px;">✅ Booking Confirmed!</h2>
            
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Slot Number</td>
                  <td style="padding: 10px 0; color: #fff; font-weight: 700; text-align: right;">${data.slotNumber}</td>
                </tr>
                <tr style="border-top: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Zone</td>
                  <td style="padding: 10px 0; color: #fff; font-weight: 700; text-align: right;">${data.zone}</td>
                </tr>
                <tr style="border-top: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">License Plate</td>
                  <td style="padding: 10px 0; color: #00e5ff; font-weight: 700; text-align: right;">${data.licensePlate}</td>
                </tr>
                <tr style="border-top: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Entry Time</td>
                  <td style="padding: 10px 0; color: #fff; font-weight: 700; text-align: right;">${data.entryTime}</td>
                </tr>
              </table>
            </div>

            <div style="background: rgba(0,198,255,0.1); border: 1px solid rgba(0,198,255,0.2); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
              <p style="margin: 0; color: rgba(255,255,255,0.6); font-size: 13px;">💳 Pricing</p>
              <p style="margin: 8px 0 0; color: #fff; font-size: 13px;">1 Hour — ₹20 &nbsp;|&nbsp; 2 Hours — ₹30 &nbsp;|&nbsp; 3 Hours — ₹40</p>
            </div>

            <p style="color: rgba(255,255,255,0.5); font-size: 13px; line-height: 1.6;">
              Your smart lock has been activated. Please pay before exiting via UPI: <strong style="color: #00e5ff;">smartpark@ybl</strong>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: rgba(255,255,255,0.03); padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 12px;">Smart Park AI System · Automated Parking Management</p>
          </div>
        </div>
      `,
    });
    console.log('✅ Booking email sent to:', to);
    return true;
  } catch (err) {
    console.log('❌ Email error:', err.message);
    return false;
  }
};

// Send payment confirmation
const sendPaymentConfirmation = async (to, data) => {
  try {
    await transporter.sendMail({
      from: `"Smart Park 🅿" <${process.env.EMAIL_USER}>`,
      to,
      subject: '💳 Payment Confirmed — Thank You!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000814; color: #ffffff; border-radius: 20px; overflow: hidden;">
          
          <div style="background: linear-gradient(135deg, #00b09b, #00c6ff); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: #fff;">🅿 SMART PARK</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8);">Payment Receipt</p>
          </div>

          <div style="padding: 30px;">
            <h2 style="color: #00ff88; margin-bottom: 20px;">💳 Payment Successful!</h2>
            
            <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Slot Number</td>
                  <td style="padding: 10px 0; color: #fff; font-weight: 700; text-align: right;">${data.slotNumber}</td>
                </tr>
                <tr style="border-top: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">License Plate</td>
                  <td style="padding: 10px 0; color: #00e5ff; font-weight: 700; text-align: right;">${data.licensePlate}</td>
                </tr>
                <tr style="border-top: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Duration</td>
                  <td style="padding: 10px 0; color: #fff; font-weight: 700; text-align: right;">${data.hours} Hour(s)</td>
                </tr>
                <tr style="border-top: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Amount Paid</td>
                  <td style="padding: 10px 0; color: #00ff88; font-weight: 900; font-size: 20px; text-align: right;">₹${data.amount}</td>
                </tr>
              </table>
            </div>

            <p style="color: rgba(255,255,255,0.5); font-size: 13px;">
              Thank you for using Smart Park! Your slot has been released. Drive safely! 🚗
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.03); padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="margin: 0; color: rgba(255,255,255,0.3); font-size: 12px;">Smart Park AI System · Automated Parking Management</p>
          </div>
        </div>
      `,
    });
    console.log('✅ Payment email sent to:', to);
    return true;
  } catch (err) {
    console.log('❌ Email error:', err.message);
    return false;
  }
};

module.exports = { sendBookingConfirmation, sendPaymentConfirmation };