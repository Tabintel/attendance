import { EnrollmentForm } from '@/components/enrollment/EnrollmentForm';

// Replace with your actual FACEIO Public ID from https://console.faceio.net
const FACEIO_PUBLIC_ID = process.env.NEXT_PUBLIC_FACEIO_PUBLIC_ID || 'your-faceio-public-id';

export default function EnrollPage() {
  return <EnrollmentForm faceioPublicId={FACEIO_PUBLIC_ID} />;
}