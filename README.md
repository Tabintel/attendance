# Attendance System with FACEIO

A modern, responsive web application for attendance tracking at a large-scale car manufacturing facility using facial authentication powered by FACEIO.

## Features

- **Facial Authentication**: Secure clock in/out using FACEIO JavaScript SDK
- **Kiosk View**: Simple, focused interface for employees to clock in/out
- **Manager Dashboard**: Real-time metrics, attendance records, and analytics
- **Employee Enrollment**: Admin interface for registering new employees
- **Data Visualization**: Charts showing attendance trends and performance
- **Responsive Design**: Optimized for kiosk displays, desktop, and mobile

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Authentication**: FACEIO SDK
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A FACEIO account and Public ID from [FACEIO Console](https://console.faceio.net)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure FACEIO:
   - Create a new application at [FACEIO Console](https://console.faceio.net)
   - Copy your Public ID
   - Update `.env.local` with your FACEIO Public ID:
```env
NEXT_PUBLIC_FACEIO_PUBLIC_ID=your-actual-public-id
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Application Structure

### Pages

- **`/`** - Kiosk View: Main interface for employee clock in/out
- **`/dashboard`** - Manager Dashboard: Attendance overview and analytics
- **`/admin/enroll`** - Enrollment: Register new employees

### Key Components

- **KioskView**: Facial authentication interface for clocking in/out
- **DashboardView**: Metrics cards, charts, and attendance table
- **EnrollmentForm**: Employee registration with FACEIO
- **Sidebar**: Navigation between different views

## FACEIO Integration

The application uses the FACEIO JavaScript SDK for facial recognition:

### Enrollment Flow
1. Admin enters employee ID and name
2. FACEIO widget captures facial features
3. Employee is assigned a unique Facial ID
4. Data is stored for future authentication

### Authentication Flow
1. Employee clicks Clock In/Out button
2. FACEIO authenticates the face
3. System logs the timestamp
4. Success/error message is displayed

### Error Handling
The application handles all FACEIO error codes including:
- Camera permission denied
- No face detected
- Multiple faces detected
- Unrecognized face
- Network errors

## Design Philosophy

The UI follows Anthropic's "Functional Elegance" aesthetic:

- **Color Palette**: Deep blue primary, vibrant green for success, red for errors
- **Typography**: Inter font for professional, readable text
- **Layout**: Minimalist with generous white space
- **Components**: Bento grid for dashboard metrics
- **Responsive**: Optimized for all screen sizes

## Mock Data

The application includes mock data for demonstration:
- 5 sample employees
- Today's attendance records
- Dashboard metrics
- Chart data for trends

Replace mock data with actual backend integration for production use.

## Configuration

### FACEIO Security Options

Configure these in the [FACEIO Console](https://console.faceio.net):
- PIN code requirements
- Domain restrictions
- Country restrictions
- Liveness detection
- Anti-spoofing measures

### Environment Variables

- `NEXT_PUBLIC_FACEIO_PUBLIC_ID`: Your FACEIO application public ID

## Project Structure
```
attendance/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── admin/enroll/      # Enrollment page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Kiosk page
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   ├── enrollment/        # Enrollment components
│   ├── kiosk/            # Kiosk components
│   ├── navigation/        # Navigation components
│   └── ui/               # shadcn UI components
├── lib/                   # Utilities and types
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   ├── formatters.ts     # Data formatting utilities
│   ├── mock-data.ts      # Mock data for demo
│   └── utils.ts          # General utilities
└── public/               # Static assets
```

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deployment Platforms

This Next.js app can be deployed to:
- [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
- Netlify
- AWS
- Any Node.js hosting platform

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Security Considerations

1. **FACEIO Configuration**: Enable all security features in FACEIO Console
2. **HTTPS**: Always use HTTPS in production
3. **Domain Restrictions**: Whitelist authorized domains in FACEIO Console
4. **Data Privacy**: Follow GDPR and privacy best practices
5. **PIN Codes**: Enforce PIN code requirements for additional security

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers with camera access

## Troubleshooting

### FACEIO Not Loading
- Check that Public ID is correct
- Ensure `<div id="faceio-modal"></div>` exists in layout
- Verify HTTPS is being used (required for camera access)

### Camera Access Denied
- Check browser permissions
- Ensure HTTPS is enabled
- Try different browser

### Authentication Failures
- Ensure good lighting conditions
- Position face clearly in frame
- Check for anti-spoofing alerts

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [FACEIO Documentation](https://faceio.net/integration-guide) - FACEIO integration guide
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) - re-usable components built with Radix UI and Tailwind

## Support

For FACEIO-specific issues:
- [FACEIO Documentation](https://faceio.net/integration-guide)
- [FACEIO Console](https://console.faceio.net)
- [FACEIO Support](https://faceio.net/support)

## License

This project is for demonstration purposes. Modify as needed for your use case.