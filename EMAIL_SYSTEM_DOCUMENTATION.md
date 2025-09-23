# Email System Documentation - Peace Tutor Academy

## Overview
The Peace Tutor Academy website now includes a comprehensive email management system integrated with Firestore database. This system handles newsletter subscriptions, contact form confirmations, and automated email notifications.

## Features Implemented

### 1. Newsletter Subscription System
- **Component**: `src/Components/Newsletter.jsx`
- **Database Collection**: `newsletter`
- **Features**:
  - Email validation and duplicate checking
  - Automatic welcome email sending
  - Subscription status tracking (active/unsubscribed)
  - Source tracking (website, admin, etc.)

### 2. Email Management Dashboard
- **Component**: `src/Components/EmailManagement.jsx`
- **Access**: Admin Dashboard → Email Management tab
- **Features**:
  - View all newsletter subscriptions
  - View contact messages
  - Export email lists
  - Unsubscribe users
  - Delete messages
  - Send custom emails

### 3. Email Templates System
- **Component**: `src/Components/EmailTemplates.jsx`
- **Features**:
  - Pre-built email templates
  - Custom email composition
  - Placeholder support ([Name], [Subject], etc.)
  - Email queuing system

### 4. Automated Email Notifications
- **Utility**: `src/utils/emailNotifications.js`
- **Triggers**:
  - Newsletter subscription → Welcome email
  - Tutor application → Confirmation email
  - Hire request → Confirmation email
  - Contact form → Thank you email

## Database Collections

### 1. `newsletter`
```javascript
{
  email: "user@example.com",
  subscribedAt: timestamp,
  status: "active" | "unsubscribed",
  source: "website" | "admin" | "import",
  unsubscribedAt: timestamp (optional)
}
```

### 2. `emailQueue`
```javascript
{
  to: "recipient@example.com" | "all-subscribers",
  subject: "Email Subject",
  message: "Email content" (optional),
  template: "template_name" (optional),
  data: { name: "John", subject: "Math" }, // Template variables
  type: "newsletter" | "welcome" | "confirmation",
  status: "pending" | "sent" | "failed",
  createdAt: timestamp,
  sentAt: timestamp (optional),
  attempts: number
}
```

### 3. `contactMessages` (Enhanced)
```javascript
{
  name: "User Name",
  email: "user@example.com",
  message: "Message content",
  timestamp: timestamp,
  status: "new" | "read" | "replied" (optional)
}
```

## Email Templates Available

### 1. Newsletter Welcome
- **Type**: `newsletter_welcome`
- **Trigger**: New newsletter subscription
- **Content**: Welcome message with platform overview

### 2. Tutor Application Received
- **Type**: `application_received`
- **Trigger**: Tutor application submission
- **Content**: Confirmation and next steps

### 3. Hire Request Received
- **Type**: `hire_request_received`
- **Trigger**: Student hire request submission
- **Content**: Confirmation and matching process info

### 4. Contact Message Received
- **Type**: `contact_received`
- **Trigger**: Contact form submission
- **Content**: Thank you message and response timeline

### 5. Custom Newsletter
- **Type**: `newsletter_bulk`
- **Trigger**: Admin sends newsletter
- **Content**: Custom content with updates and offers

## Admin Features

### Email Management Dashboard
1. **Newsletter Subscriptions Tab**:
   - View all subscribers
   - See subscription status
   - Export email list
   - Unsubscribe users

2. **Contact Messages Tab**:
   - View all contact form submissions
   - Delete messages
   - Track message timestamps

3. **Send Email Tab**:
   - Choose email type
   - Use pre-built templates
   - Send to individual or all subscribers
   - Custom email composition

### Email Export Feature
- Export active subscriber emails as text file
- Filename format: `newsletter-emails-YYYY-MM-DD.txt`
- One email per line for easy import to email services

## Integration Points

### Form Submissions
All form submissions now trigger email notifications:

1. **Hire Request Form** (`src/Pages/Hire.jsx`):
   ```javascript
   await sendHireRequestConfirmation(email, name);
   ```

2. **Tutor Application Form** (`src/Pages/Apply.jsx`):
   ```javascript
   await sendTutorApplicationConfirmation(email, name);
   ```

3. **Contact Form** (`src/Pages/Contact.jsx`):
   ```javascript
   await sendContactConfirmation(email, name);
   ```

4. **Newsletter Subscription** (`src/Components/Newsletter.jsx`):
   ```javascript
   await sendNewsletterWelcome(email);
   ```

## Email Queue System

### How It Works
1. **Email Creation**: When an email needs to be sent, it's added to the `emailQueue` collection
2. **Status Tracking**: Each email has a status (pending, sent, failed)
3. **Retry Logic**: Failed emails can be retried (attempts counter)
4. **Bulk Processing**: Newsletter emails to all subscribers are handled efficiently

### Email Processing (Future Implementation)
The email queue is designed to work with:
- Firebase Functions for server-side processing
- Third-party email services (SendGrid, Mailgun, etc.)
- SMTP servers
- Email marketing platforms

## Security Considerations

### Data Protection
- Email addresses are stored in lowercase
- Duplicate subscription prevention
- Unsubscribe functionality
- Data export capabilities for GDPR compliance

### Access Control
- Email management restricted to authenticated admins
- Firestore security rules protect email data
- Input validation on all email forms

## Usage Examples

### Send Welcome Email
```javascript
import { sendNewsletterWelcome } from '../utils/emailNotifications';

// After successful newsletter subscription
await sendNewsletterWelcome('user@example.com');
```

### Send Bulk Newsletter
```javascript
import { sendBulkNewsletter } from '../utils/emailNotifications';

// Send newsletter to all subscribers
await sendBulkNewsletter(
  'Monthly Updates - Peace Tutor Academy',
  'Here are our latest updates...'
);
```

### Export Subscriber Emails
```javascript
// In EmailManagement component
const exportEmails = () => {
  const activeEmails = newsletters.filter(sub => sub.status === 'active');
  const emailList = activeEmails.map(sub => sub.email).join('\n');
  // Download as text file
};
```

## Future Enhancements

### Planned Features
1. **Email Analytics**: Track open rates, click rates
2. **Email Scheduling**: Schedule emails for future sending
3. **Email Segmentation**: Send targeted emails to specific groups
4. **Email Templates Editor**: Visual email template builder
5. **Automated Sequences**: Multi-step email campaigns
6. **Integration with Email Services**: Direct integration with SendGrid, Mailchimp, etc.

### Technical Improvements
1. **Server-Side Processing**: Move email sending to Firebase Functions
2. **Email Validation**: Enhanced email validation and verification
3. **Bounce Handling**: Handle bounced emails and invalid addresses
4. **Unsubscribe Links**: Automatic unsubscribe link generation
5. **Email Personalization**: Advanced template variables and personalization

## Troubleshooting

### Common Issues
1. **Emails Not Sending**: Check Firestore rules and email queue collection
2. **Duplicate Subscriptions**: Ensure email validation is working
3. **Template Errors**: Verify template structure and placeholder syntax
4. **Permission Errors**: Check admin authentication and Firestore permissions

### Monitoring
- Check `emailQueue` collection for pending/failed emails
- Monitor newsletter subscription growth
- Track contact form submissions
- Review email template usage

## Conclusion
The email system provides a solid foundation for customer communication and engagement. It's designed to be scalable, maintainable, and user-friendly while ensuring data security and compliance with email marketing best practices.